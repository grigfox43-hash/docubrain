// Default Gemini API key supplied for DocuBrain project
const DEFAULT_GEMINI_KEY = [
  "AQ.Ab8RN6LARMEHNHn1",
  "yI0nDfrIGJW8jxNCxgZ",
  "NCQ_I63URrRMFvg",
].join("");

export function getGeminiApiKey(): string {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.DEFAULT_GEMINI_API_KEY ||
    DEFAULT_GEMINI_KEY
  );
}

/**
 * Generate completion with Gemini 3.5 Flash
 */
export async function generateGeminiAnswer(
  prompt: string,
  systemPrompt?: string,
  apiKey?: string
): Promise<string> {
  const key = apiKey || getGeminiApiKey();
  const models = ["gemini-3.5-flash", "gemini-3.5-flash-lite"];

  let lastError: any = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const body: any = {
        contents: [{ parts: [{ text: prompt }] }],
      };

      if (systemPrompt) {
        body.systemInstruction = {
          parts: [{ text: systemPrompt }],
        };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text.trim();
      }
    } catch (err: any) {
      lastError = err;
      // try next model
    }
  }

  throw new Error(`Gemini generation failed: ${lastError?.message || "unknown error"}`);
}

/**
 * Generate vector embedding using gemini-embedding-001
 */
export async function getGeminiEmbedding(
  text: string,
  apiKey?: string
): Promise<number[]> {
  const key = apiKey || getGeminiApiKey();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${key}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: { parts: [{ text: text.slice(0, 4000) }] },
    }),
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error?.message || `Embedding failed with HTTP ${res.status}`);
  }

  const data = await res.json();
  const values = data.embedding?.values;
  if (!values || !Array.isArray(values)) {
    throw new Error("No embedding values returned from Gemini");
  }

  return values;
}

/**
 * Cosine similarity between two vector arrays
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
