import Link from "next/link";
import { BrainCircuit, ShieldCheck, Github, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0B0D13] border-t border-gray-200 dark:border-gray-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-700 text-white flex items-center justify-center shadow-md">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-gray-900 dark:text-white">
                DocuBrain
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              Корпоративный RAG-ассистент по внутренним регламентам в Slack и Telegram.
              Строгая изоляция по tenant_id, исключение "галлюцинаций" LLM и On-Premises
              деплой для IT и Enterprise.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero Data-Leak Guarantee
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-medium">
                Gemini 3.5 Powered
              </span>
            </div>
          </div>

          {/* Col 2: Продукт */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Продукт
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Как работает RAG
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Изоляция данных
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Тарифы и лимиты
                </Link>
              </li>
              <li>
                <Link href="/app" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Интерактивный стенд
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Интеграции */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Интеграции
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/app/bots" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Slack App Manifest
                </Link>
              </li>
              <li>
                <Link href="/app/bots" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Telegram Bot API
                </Link>
              </li>
              <li>
                <Link href="/app/knowledge-base" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Синхронизация Notion
                </Link>
              </li>
              <li>
                <Link href="/contact-sales" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  On-Premises Docker
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Безопасность и право */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Юридическая инфо
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/security" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  GDPR & Комплаенс
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Условия обслуживания
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/contact-sales" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Отдел безопасности
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} DocuBrain Inc. Все права защищены. Multi-tenant Enterprise RAG.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Все системы работают штатно (Qdrant + Gemini 3.5)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
