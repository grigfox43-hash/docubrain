import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Тарифные планы
          </span>
          <h1 className="mt-2 font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white tracking-tight">
            Простая и честная модель подписки
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Подходит как для небольших HR-отделов, так и для Enterprise-корпораций с жесткими требованиями безопасности.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Team */}
          <div className="rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Для небольших отделов
              </span>
              <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mt-1">
                Team
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-4xl text-gray-900 dark:text-white">
                  $99
                </span>
                <span className="text-sm text-gray-500">/ месяц</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                До 25 активных сотрудников в компании.
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>1 бот (Slack <b>ИЛИ</b> Telegram)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>До 50 документов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Базовый список неотвеченных вопросов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Интеграция с Notion (до 10 страниц)</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/app"
                className="w-full inline-flex items-center justify-center py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-white font-medium text-sm transition-colors"
              >
                Начать на Team
              </Link>
            </div>
          </div>

          {/* Scale */}
          <div className="rounded-2xl bg-white dark:bg-[#161922] border-2 border-indigo-600 p-8 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              Популярный выбор
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Для быстрорастущих команд
              </span>
              <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mt-1">
                Scale
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-4xl text-gray-900 dark:text-white">
                  $249
                </span>
                <span className="text-sm text-gray-500">/ месяц</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                До 100 сотрудников, глубокая аналитика и оба мессенджера.
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2 font-medium text-indigo-900 dark:text-indigo-300">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Slack <b>И</b> Telegram одновременно</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>До 100 активных сотрудников</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Без строгого лимита документов (fair use)</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-indigo-900 dark:text-indigo-300">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Глубокая аналитика пробелов (Insights)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Приоритетная техподдержка в Slack-чате</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/app"
                className="w-full inline-flex items-center justify-center py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-sm shadow-md shadow-indigo-700/20 transition-all"
              >
                Подключить Scale
              </Link>
            </div>
          </div>

          {/* On-Premises */}
          <div className="rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Enterprise & Data Residency
              </span>
              <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mt-1">
                On-Premises
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-4xl text-gray-900 dark:text-white">
                  $1 500
                </span>
                <span className="text-sm text-gray-500">разово</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Полный контроль на ваших собственных серверах.
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Без лимита сотрудников и документов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Данные не покидают серверы компании</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Docker Compose: Qdrant + Postgres + DocuBrain</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Помощь инженера при установке</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Оплата по счёту / безналичный расчёт</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/contact-sales?topic=on_premises"
                className="w-full inline-flex items-center justify-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors"
              >
                Запросить деплой On-Premises
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-6 text-center">
            Детальная матрица возможностей
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922]">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="py-4 px-6">Функциональность</th>
                  <th className="py-4 px-6 text-center">Team ($99)</th>
                  <th className="py-4 px-6 text-center text-indigo-600 dark:text-indigo-400">Scale ($249)</th>
                  <th className="py-4 px-6 text-center text-emerald-600 dark:text-emerald-400">On-Premises ($1 500)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-600 dark:text-gray-400">
                <tr>
                  <td className="py-3.5 px-6 font-medium text-gray-900 dark:text-white">Активные сотрудники</td>
                  <td className="py-3.5 px-6 text-center">до 25</td>
                  <td className="py-3.5 px-6 text-center font-semibold text-gray-900 dark:text-white">до 100</td>
                  <td className="py-3.5 px-6 text-center">Без ограничений</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-gray-900 dark:text-white">Лимит документов</td>
                  <td className="py-3.5 px-6 text-center">50 документов</td>
                  <td className="py-3.5 px-6 text-center font-semibold text-gray-900 dark:text-white">Fair-use (неограниченно)</td>
                  <td className="py-3.5 px-6 text-center">Без ограничений</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-gray-900 dark:text-white">Каналы интеграций</td>
                  <td className="py-3.5 px-6 text-center">Slack ИЛИ Telegram</td>
                  <td className="py-3.5 px-6 text-center font-semibold text-indigo-600 dark:text-indigo-400">Slack И Telegram оба</td>
                  <td className="py-3.5 px-6 text-center">Любые + Custom API</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-gray-900 dark:text-white">Аналитика пробелов базы знаний</td>
                  <td className="py-3.5 px-6 text-center">Базовый список</td>
                  <td className="py-3.5 px-6 text-center font-semibold text-indigo-600 dark:text-indigo-400">Глубокие тренды & графики</td>
                  <td className="py-3.5 px-6 text-center">Полный доступ к БД</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-gray-900 dark:text-white">Место хранения векторов</td>
                  <td className="py-3.5 px-6 text-center">Изолированный Qdrant Cloud</td>
                  <td className="py-3.5 px-6 text-center">Изолированный Qdrant Cloud</td>
                  <td className="py-3.5 px-6 text-center font-semibold text-emerald-600 dark:text-emerald-400">Ваш сервер (Local Qdrant)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
