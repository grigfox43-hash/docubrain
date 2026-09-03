import { db } from "../store/db";
import {
  getGeminiEmbedding,
  generateGeminiAnswer,
  cosineSimilarity,
  getGeminiApiKey,
} from "./gemini";
import { RAGQueryResult, ChannelType } from "../types";

const RELEVANCE_THRESHOLD = 0.52; // Threshold for cosine similarity with gemini-embedding-001

export interface QueryRAGOptions {
  tenantId: string;
  question: string;
  channelType?: ChannelType;
  apiKey?: string;
}

export async function processRAGQuery({
  tenantId,
  question,
  channelType = "web_playground",
  apiKey,
}: QueryRAGOptions): Promise<RAGQueryResult> {
  const tenant = db.getTenant(tenantId);
  const companyName = tenant?.name || "Компания";

  // 1. Fetch chunks strictly belonging to current tenant
  const tenantChunks = db.getTenantChunks(tenantId);
  const documents = db.getDocuments(tenantId);
  const docMap = new Map(documents.map((d) => [d.id, d.title]));

  if (tenantChunks.length === 0) {
    db.recordUnansweredQuestion(tenantId, question);
    db.addQueryLog({
      tenant_id: tenantId,
      channel_type: channelType,
      question_text: question,
      answer_text: "В базе знаний компании пока нет загруженных документов. Обратитесь к администратору.",
      matched_document_ids: [],
      relevance_score: 0,
      was_answered: false,
    });

    return {
      answer: "В базе знаний компании пока нет загруженных документов. Обратитесь к администратору.",
      was_answered: false,
      relevance_score: 0,
      matched_chunks: [],
    };
  }

  let scoredChunks: Array<{
    chunkId: string;
    documentId: string;
    text: string;
    score: number;
    docTitle: string;
  }> = [];

  try {
    // 2. Compute question embedding with Gemini
    const queryEmbedding = await getGeminiEmbedding(question, apiKey);

    // Compute similarity for each chunk
    for (const chunk of tenantChunks) {
      let chunkEmb = chunk.embedding;

      // Lazy compute chunk embedding if not cached yet
      if (!chunkEmb || chunkEmb.length === 0) {
        try {
          chunkEmb = await getGeminiEmbedding(chunk.chunk_text, apiKey);
          db.setChunkEmbedding(tenantId, chunk.id, chunkEmb);
        } catch {
          // fallback if quota or error
        }
      }

      let sim = 0;
      if (chunkEmb && chunkEmb.length > 0) {
        sim = cosineSimilarity(queryEmbedding, chunkEmb);
      } else {
        // Simple lexical overlap heuristic fallback
        sim = computeTextOverlapScore(question, chunk.chunk_text);
      }

      scoredChunks.push({
        chunkId: chunk.id,
        documentId: chunk.document_id,
        text: chunk.chunk_text,
        score: sim,
        docTitle: docMap.get(chunk.document_id) || "Документ",
      });
    }
  } catch (err) {
    // If embedding API failed or offline, use lexical overlap ranking
    scoredChunks = tenantChunks.map((chunk) => ({
      chunkId: chunk.id,
      documentId: chunk.document_id,
      text: chunk.chunk_text,
      score: computeTextOverlapScore(question, chunk.chunk_text),
      docTitle: docMap.get(chunk.document_id) || "Документ",
    }));
  }

  // Sort top-K chunks
  scoredChunks.sort((a, b) => b.score - a.score);
  const topChunks = scoredChunks.slice(0, 4);
  const maxScore = topChunks[0]?.score || 0;

  // 3. Check relevance threshold
  if (maxScore < RELEVANCE_THRESHOLD) {
    // Spec 1.3: Log to unanswered_questions and return polite fallback
    db.recordUnansweredQuestion(tenantId, question);

    const fallbackAnswer =
      "Не нашёл точного ответа в базе знаний по этому вопросу. Рекомендую уточнить у HR/руководителя.";

    db.addQueryLog({
      tenant_id: tenantId,
      channel_type: channelType,
      question_text: question,
      answer_text: fallbackAnswer,
      matched_document_ids: [],
      relevance_score: Number(maxScore.toFixed(3)),
      was_answered: false,
    });

    return {
      answer: fallbackAnswer,
      was_answered: false,
      relevance_score: Number(maxScore.toFixed(3)),
      matched_chunks: topChunks.map((c) => ({
        chunk_text: c.text,
        document_title: c.docTitle,
        document_id: c.documentId,
        score: Number(c.score.toFixed(3)),
      })),
    };
  }

  // 4. Relevant chunks found: assemble prompt according to Section 1.4
  const contextText = topChunks
    .map((c, i) => `[Источник ${i + 1}: ${c.docTitle}]\n${c.text}`)
    .join("\n\n---\n\n");

  const systemPrompt = `Ты — корпоративный ассистент компании ${companyName}. Отвечай на вопросы сотрудников
СТРОГО на основе предоставленных фрагментов внутренних документов ниже.

Правила:
1. Если ответ есть в предоставленных фрагментах — дай точный, короткий ответ на русском (или языке вопроса),
   сославшись на документ/раздел, если это уместно.
2. Если предоставленных фрагментов недостаточно, чтобы уверенно ответить — честно скажи:
   "Не нашёл точного ответа в базе знаний по этому вопросу. Рекомендую уточнить у HR/руководителя."
   НЕ придумывай информацию, которой нет в контексте.
3. Не используй внешние знания, не относящиеся к предоставленному контексту.
4. Будь кратким и деловым — сотрудники ценят время.`;

  const userPrompt = `Контекст (фрагменты внутренних документов):
${contextText}

Вопрос сотрудника: ${question}`;

  let finalAnswer = "";
  try {
    finalAnswer = await generateGeminiAnswer(userPrompt, systemPrompt, apiKey);
  } catch (err: any) {
    finalAnswer = `Не удалось получить ответ от AI-модели: ${err.message}. Пожалуйста, повторите запрос.`;
  }

  const matchedDocIds = Array.from(new Set(topChunks.map((c) => c.documentId)));

  db.addQueryLog({
    tenant_id: tenantId,
    channel_type: channelType,
    question_text: question,
    answer_text: finalAnswer,
    matched_document_ids: matchedDocIds,
    relevance_score: Number(maxScore.toFixed(3)),
    was_answered: true,
  });

  return {
    answer: finalAnswer,
    was_answered: true,
    relevance_score: Number(maxScore.toFixed(3)),
    matched_chunks: topChunks.map((c) => ({
      chunk_text: c.text,
      document_title: c.docTitle,
      document_id: c.documentId,
      score: Number(c.score.toFixed(3)),
    })),
  };
}

/**
 * Fast keyword overlap score (0 to 1) for local search and fallback
 */
function computeTextOverlapScore(query: string, text: string): number {
  const queryTokens = query
    .toLowerCase()
    .replace(/[^a-zA-Z0-9а-яА-ЯёЁ\s]/g, "")
    .split(/\s+/)
    .filter((t) => t.length > 2);

  if (queryTokens.length === 0) return 0;

  const target = text.toLowerCase();
  let matches = 0;

  for (const token of queryTokens) {
    if (target.includes(token)) {
      matches += 1;
    }
  }

  return Math.min(1, matches / queryTokens.length);
}
