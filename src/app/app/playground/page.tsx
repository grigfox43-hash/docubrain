"use client";

import { useState } from "react";
import {
  Send,
  Sparkles,
  Bot,
  User,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Layers,
  HelpCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface QueryLogItem {
  question: string;
  answer: string;
  score: number;
  was_answered: boolean;
  chunks: Array<{
    chunk_text: string;
    document_title: string;
    score: number;
  }>;
}

export default function PlaygroundPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryLogItem | null>(null);

  const sampleQuestions = [
    "Сколько дней отпуска положено и как подать заявление?",
    "Что делать, если заболел на один день? Нужна ли справка от врача?",
    "Какой бюджет выделяется на обучение и профильные курсы?",
    "Какая модель рабочего ноутбука выдается при выходе?",
    "Как оформить пропуск на подземную парковку в БЦ? (Проверка отсутствия регламента)",
  ];

  const handleAsk = async (queryText?: string) => {
    const q = queryText || question;
    if (!q.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q.trim(),
          tenant_id: "tenant-demo-acme",
          channel_type: "web_playground",
        }),
      });

      const data = await res.json();
      setResult({
        question: q,
        answer: data.answer,
        score: data.relevance_score,
        was_answered: data.was_answered,
        chunks: data.matched_chunks || [],
      });
    } catch (err: any) {
      alert("Ошибка запроса: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight">
            RAG Тест & Песочница
          </h1>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            Google Gemini Active
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Проверьте точность ответов ассистента в реальном времени. Наблюдайте извлечённые фрагменты и оценку косинусного сходства.
        </p>
      </div>

      {/* Suggested Quick Questions */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-xs space-y-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
          Быстрые тестовые вопросы из загруженных регламентов:
        </span>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((sq, i) => (
            <button
              key={i}
              onClick={() => {
                setQuestion(sq);
                handleAsk(sq);
              }}
              className="text-xs px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/80 hover:border-indigo-500 text-gray-700 dark:text-gray-300 transition-colors text-left"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Введите любой вопрос про правила, отпуска, технику или доступы..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            onClick={() => handleAsk()}
            disabled={loading || !question.trim()}
            className="px-5 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white font-semibold text-sm shadow-sm flex items-center gap-2 transition-all shrink-0"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Тестировать</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Result Details */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Main Answer Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-600" />
                <span className="font-heading font-bold text-sm text-gray-900 dark:text-white">
                  Ответ корпоративного ассистента DocuBrain
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    result.was_answered
                      ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400"
                      : "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {result.was_answered ? "Ответ найден (RAG)" : "Вопрос зафиксирован в Gaps"}
                </span>
                <span className="text-xs font-mono text-gray-500">
                  Similarity Score: {result.score}
                </span>
              </div>
            </div>

            <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line bg-gray-50/50 dark:bg-[#12151D] p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              {result.answer}
            </div>

            {!result.was_answered && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <strong>Система предотвращения галлюцинаций сработала:</strong> косинусное сходство ниже порога 0.75. Вопрос автоматически передан в <a href="/app/analytics" className="underline font-semibold">раздел Неотвеченных вопросов</a> для внимания HR-службы.
                </div>
              </div>
            )}
          </div>

          {/* Retrieved Chunks Inspector */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Семантически найденные фрагменты (Top-K Chunks из базы знаний)</span>
            </h3>

            {result.chunks.length === 0 ? (
              <div className="text-xs text-gray-500">
                Нет совпадений с фрагментами текущей организации.
              </div>
            ) : (
              <div className="space-y-3">
                {result.chunks.map((chunk, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/60 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 font-semibold font-mono">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        {chunk.document_title}
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Score: {chunk.score}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-mono text-[11px] leading-relaxed">
                      {chunk.chunk_text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
