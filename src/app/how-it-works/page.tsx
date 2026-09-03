import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  FileText,
  Scissors,
  Binary,
  Database,
  Search,
  Bot,
  MessageSquare,
  ArrowDown,
  CheckCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Техническая спецификация
          </span>
          <h1 className="mt-2 font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white tracking-tight">
            Как работает Retrieval-Augmented Generation (RAG)
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Пошаговый разбор пайплайна: от загрузки внутреннего PDF до точного ответа сотруднику в Slack и Telegram за 1.8 секунды.
          </p>
        </div>

        {/* Interactive Step-by-Step Architecture Pipeline */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Step 1: Chunking */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
                01
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                    Парсинг документов и семантическое чанкование
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    500–800 токенов
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Когда администратор загружает PDF/DOCX или синхронизирует Notion, DocuBrain извлекает сырой текст и разбивает его на фрагменты (chunks) с нахлёстом (overlap ~100 токенов). Это сохраняет контекст на границах абзацев и предотвращает потерю смысла.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-[#1E2330] border border-gray-200 dark:border-gray-800 font-mono text-xs text-gray-700 dark:text-gray-300">
                  <code>[Chunk #04]: &quot;Регламент отпусков... Отпускные выплачиваются за 3 календарных дня...&quot; (240 слов, overlap 35 слов)</code>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-gray-400">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Step 2: Vectorization */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
                02
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                    Векторизация через Gemini Embedding 001 и запись в Qdrant
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    dim: 3072
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Каждый фрагмент текста преобразуется в плотный вектор чисел, отражающий его глубинный смысл. Вектор сохраняется в Qdrant вместе с метаданными: <code className="text-xs font-mono">tenant_id</code>, <code className="text-xs font-mono">document_id</code>, <code className="text-xs font-mono">chunk_text</code>, <code className="text-xs font-mono">source_url</code>.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-gray-400">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Step 3: Question Retrieval & Threshold */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
                03
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                    Поиск ближайших векторов и порог релевантности (0.75)
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                    Top-K (K=4)
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Вопрос сотрудника векторизуется за 80 миллисекунд. Выполняется косинусный поиск ближайших фрагментов с обязательным фильтром организации.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                    <strong>Score &gt;= 0.75:</strong> Фрагменты передаются в Gemini 3.5 с жестким запретом на внешние знания.
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                    <strong>Score &lt; 0.75:</strong> Бот честно сообщает, что регламента нет, и фиксирует пробел в базе знаний для HR.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-gray-400">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Step 4: Strict Generation */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
                04
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                    Генерация ответа со ссылкой на первоисточник
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    Gemini 3.5 Flash
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Сотрудник получает лаконичный ответ прямо в Slack или Telegram с указанием конкретного регламента и раздела, откуда взяты данные.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-sm shadow-md shadow-indigo-700/25 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Протестировать RAG в панели</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
