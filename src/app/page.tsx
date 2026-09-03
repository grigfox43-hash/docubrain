import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NeuralBackground } from "@/components/NeuralBackground";
import { HeroChatSimulation } from "@/components/HeroChatSimulation";
import {
  Shield,
  Lock,
  Server,
  FileCheck,
  Zap,
  Check,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Users,
  Building2,
  TrendingUp,
  FileSpreadsheet,
  AlertTriangle,
  ChevronDown,
  Layers,
  Database,
  Cpu,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <NeuralBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/80 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>RAG-ассистент на базе Google Gemini 3.5 & Qdrant</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white leading-[1.12]">
              AI-ассистент, который знает все ваши регламенты{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-300">
                — и никогда не выдумывает ответ
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Корпоративный RAG-бот для онбординга и регламентов в Slack и Telegram.
              Строгая изоляция по <code className="text-xs font-mono font-bold bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400">tenant_id</code>,
              ссылки на первоисточники и опция On-Premises.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/app"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-base shadow-lg shadow-indigo-700/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Открыть демо-панель</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact-sales"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium text-base transition-colors"
              >
                <span>Запросить On-Premises деплой</span>
              </Link>
            </div>
          </div>

          {/* Interactive Chat Simulation */}
          <HeroChatSimulation />
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-20 bg-white dark:bg-[#12151E] border-y border-gray-200/80 dark:border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Архитектура RAG
            </span>
            <h2 className="mt-2 font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              Как устроен DocuBrain за 3 шага
            </h2>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
              Никакого обучения модели на закрытых данных — используется надёжная векторизация и контекстная выборка.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#161922] relative group hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-lg mb-6">
                1
              </div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
                Загрузка документов
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Загружайте регламенты, политики и гайды онбординга в формате PDF, DOCX или синхронизируйте страницы Notion в 1 клик.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white dark:bg-gray-800/80 p-2.5 rounded-lg border border-gray-100 dark:border-gray-700/60">
                <FileSpreadsheet className="w-4 h-4 text-indigo-500" />
                <span>PDF • DOCX • Notion OAuth</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#161922] relative group hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-lg mb-6">
                2
              </div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
                Умное чанкование & Qdrant
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Текст разбивается на смысловые блоки (500–800 токенов с перекрытием). Google Gemini строит 3072-мерные эмбеддинги с изоляцией по tenant_id.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white dark:bg-gray-800/80 p-2.5 rounded-lg border border-gray-100 dark:border-gray-700/60">
                <Database className="w-4 h-4 text-emerald-500" />
                <span>Qdrant / Cosine Similarity</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#161922] relative group hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-lg mb-6">
                3
              </div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
                Мгновенный ответ в мессенджер
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Сотрудник спрашивает в Slack или Telegram. Модель сверяет порог релевантности (&gt;0.75), цитирует первоисточник или передает вопрос HR.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white dark:bg-gray-800/80 p-2.5 rounded-lg border border-gray-100 dark:border-gray-700/60">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <span>Slack Events API • Telegram Bot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECURITY ACCENT SECTION */}
      <section className="py-24 relative overflow-hidden bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 text-xs font-semibold mb-6">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Ключевой приоритет доверия B2B
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Строгая изоляция данных компании без риска утечки
              </h2>
              <p className="mt-5 text-gray-300 text-base sm:text-lg leading-relaxed">
                Корпоративные регламенты содержат чувствительную внутреннюю информацию. Мы гарантируем, что ваши данные никогда не смешаются с другими клиентами и не попадут в общее обучение моделей.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-900/80 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Обязательный фильтр tenant_id на каждом векторном поиске
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Физически исключает cross-tenant leak: ни один запрос сотрудника не может задеть векторы чужой организации.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-900/80 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Шифрование токенов интеграций (AES-256)
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Slack Bot Token и Telegram Bot Token хранятся в зашифрованном виде и маскируются в интерфейсе.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-900/80 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      On-Premises деплой (Docker Compose)
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Для Enterprise с повышенными требованиями безопасности: разверните Qdrant, Postgres и DocuBrain на своих серверах.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/security"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors"
                >
                  <span>Подробнее о безопасности</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact-sales"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-700 hover:bg-gray-800 text-gray-200 font-medium text-sm transition-colors"
                >
                  <span>Запросить аудит безопасности</span>
                </Link>
              </div>
            </div>

            {/* Visual Security Box */}
            <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-700 text-xs text-gray-400">
                <span className="font-mono text-emerald-400">SECURITY INVARIANT AUDIT</span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <Lock className="w-3.5 h-3.5" /> PASSED 100%
                </span>
              </div>
              <pre className="font-mono text-xs text-gray-300 bg-gray-950/70 p-4 rounded-xl overflow-x-auto leading-relaxed">
{`// Security Check: Qdrant Search Invariant
const searchResult = await qdrant.search({
  collection: "corporate_docs",
  filter: {
    must: [
      { key: "tenant_id", match: { value: current_tenant } } // MUST EXIST
    ]
  },
  vector: questionEmbedding,
  limit: 5,
  score_threshold: 0.75
});

// Result: 0 data leaks across tenants detected`}
              </pre>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-gray-900/60 border border-gray-700/50">
                  <div className="text-xs text-gray-400">GDPR Compliance</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Право на удаление</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-900/60 border border-gray-700/50">
                  <div className="text-xs text-gray-400">Модели AI</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Без обучения на PII</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TARGET PERSONAS */}
      <section className="py-20 bg-gray-50/50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Для кого создан DocuBrain
            </span>
            <h2 className="mt-2 font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              Решение ключевых болей быстрорастущих команд
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Persona 1: HR */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                HR-команды
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Автоматический онбординг новичков: бот отвечает на сотни вопросов про отпуска, ДМС, Sick Days и правила офиса без отвлечения HR-менеджера.
              </p>
            </div>

            {/* Persona 2: IT Companies */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                IT-компании
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Быстрая выдача доступов, регламенты безопасности, правила работы с репозиториями и VPN — ответы прямо в корпоративном Slack.
              </p>
            </div>

            {/* Persona 3: Sales */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                Отделы продаж
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Регламенты скидок, скрипты продаж, условия нестандартных договоров и прайс-листы — менеджеры получают точные условия прямо во время звонка.
              </p>
            </div>

            {/* Persona 4: Agencies */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                Агентства
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Высокая ротация и распределённые команды: сокращение времени погружения нового специалиста в проектные стандарты с 2 недель до 2 дней.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GAP ANALYTICS PREVIEW (Unique Feature) */}
      <section className="py-20 bg-white dark:bg-[#12151E] border-t border-gray-200/80 dark:border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Уникальное преимущество DocuBrain
              </span>
              <h2 className="mt-2 font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white leading-tight">
                Аналитика пробелов: знайте, каких регламентов не хватает компании
              </h2>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Обычный бот либо молчит, либо выдумывает ответ. DocuBrain честно признаётся сотруднику, что информации нет, и фиксирует неотвеченный вопрос в специальный отчёт для HR и руководства.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Подсчёт частоты похожих повторяющихся вопросов
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Статус «Открыт» / «Решён» с кнопкой быстрой загрузки регламента
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Автоматический сигнал HR о слабых местах базы знаний
                </li>
              </ul>

              <div className="mt-8">
                <Link
                  href="/app/analytics"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 dark:text-indigo-400 hover:underline"
                >
                  Посмотреть экран аналитики в демо-панели
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Table Mockup */}
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#161922] shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800 mb-4">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                  Неотвеченные вопросы (сигнал для HR)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-xs font-medium">
                  3 открытых
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-white dark:bg-[#1E2330] border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">
                      Как получить парковочное место в БЦ?
                    </span>
                    <span className="text-gray-400 text-[11px]">Спрашивали 14 раз</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-red-50 dark:bg-red-950/50 text-red-600 text-[11px] font-medium">
                    Нет регламента
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#1E2330] border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">
                      Оплачивает ли компания курсы испанского?
                    </span>
                    <span className="text-gray-400 text-[11px]">Спрашивали 9 раз</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-600 text-[11px] font-medium">
                    Требует уточнения
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#1E2330] border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">
                      Суточные при поездке в офис в Астане
                    </span>
                    <span className="text-gray-400 text-[11px]">Спрашивали 6 раз</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 text-[11px] font-medium">
                    Решено (добавлен PDF)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING CARDS */}
      <section className="py-24 bg-gray-50/50 dark:bg-[#0E1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Тарифы и лицензии
            </span>
            <h2 className="mt-2 font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              Прозрачные тарифы без скрытых платежей
            </h2>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
              Выберите подходящий формат: облачный SaaS с быстрой настройкой или On-Premises на вашей инфраструктуре.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1: Team */}
            <div className="rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 p-8 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Для небольших команд
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
                  Быстрый старт для отделов до 25 активных сотрудников.
                </p>

                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>1 бот (Slack <b>ИЛИ</b> Telegram)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>До 25 активных сотрудников</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>До 50 документов в базе знаний</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Базовый список неотвеченных вопросов</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="w-4 h-4 flex items-center justify-center font-bold">✕</span>
                    <span>Глубокая аналитика трендов (Scale)</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/app"
                  className="w-full inline-flex items-center justify-center py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-white font-medium text-sm transition-colors"
                >
                  Выбрать Team
                </Link>
              </div>
            </div>

            {/* Plan 2: Scale (POPULAR) */}
            <div className="rounded-2xl bg-white dark:bg-[#161922] border-2 border-indigo-600 p-8 shadow-xl relative flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                Самый популярный
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Для растущих IT-компаний
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
                  Для команд до 100 человек с несколькими каналами и глубокой аналитикой.
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
                    <span>Приоритетная поддержка HR-интеграций</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/app"
                  className="w-full inline-flex items-center justify-center py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-sm shadow-md shadow-indigo-700/20 transition-all"
                >
                  Выбрать Scale
                </Link>
              </div>
            </div>

            {/* Plan 3: On-Premises */}
            <div className="rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 p-8 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Data Residency / Enterprise
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
                  Деплой на инфраструктуре заказчика (Docker Compose, self-hosted Qdrant).
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
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="py-20 bg-white dark:bg-[#12151E] border-t border-gray-200/80 dark:border-gray-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Вопросы и ответы
            </span>
            <h2 className="mt-2 font-heading font-bold text-3xl text-gray-900 dark:text-white">
              Часто задаваемые вопросы
            </h2>
          </div>

          <div className="space-y-4">
            <details className="group rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-[#161922] transition-colors">
              <summary className="font-heading font-semibold text-base text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Куда попадают наши внутренние документы?</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Документы разбиваются на фрагменты и векторизуются. Векторы сохраняются в изолированной коллекции Qdrant с обязательным фильтром по <code className="text-xs font-mono bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">tenant_id</code>. Данные никогда не передаются другим компаниям и не используются для дообучения глобальных моделей. На тарифе On-Premises данные вообще не покидают ваш сервер.
              </p>
            </details>

            <details className="group rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-[#161922] transition-colors">
              <summary className="font-heading font-semibold text-base text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Может ли бот выдумать ответ (галлюцинировать)?</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Нет. В DocuBrain реализован жёсткий RAG-пайплайн: если в базе знаний нет фрагментов с косинусным сходством выше порога 0.75, бот прямо отвечает: «Не нашёл точного ответа в базе знаний по этому вопросу, передал HR». Системный промпт модели запрещает использовать внешние знания.
              </p>
            </details>

            <details className="group rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-[#161922] transition-colors">
              <summary className="font-heading font-semibold text-base text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Поддерживается ли Notion и как работает синхронизация?</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Да, через Notion OAuth авторизацию. Вы выбираете конкретные страницы базы знаний, и DocuBrain автоматически выгружает текст, делит на чанки и поддерживает актуальность при нажатии кнопки «Переиндексировать».
              </p>
            </details>

            <details className="group rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-[#161922] transition-colors">
              <summary className="font-heading font-semibold text-base text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Что входит в поставку On-Premises за $1 500?</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Вы получаете готовый Docker Compose стек (DocuBrain + self-hosted Qdrant + PostgreSQL 16), исходные конфигурации окружения, документацию по установке, а также консультацию нашего DevOps-инженера по первичному развертыванию на ваших виртуальных машинах.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-20 bg-indigo-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight">
            Освободите HR и поддержку от сотен одинаковых вопросов
          </h2>
          <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
            Подключите бота к корпоративным документам прямо сейчас — сотрудники получают ответы за 2 секунды, а вы видите реальные пробелы в базе знаний.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-indigo-900 font-bold text-base shadow-lg hover:bg-indigo-50 transition-colors"
            >
              <Sparkles className="w-5 h-5 text-indigo-700" />
              <span>Запустить тестовый стенд</span>
            </Link>
            <Link
              href="/contact-sales"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-indigo-400/50 hover:bg-indigo-800 text-white font-medium text-base transition-colors"
            >
              <span>Связаться с отделом продаж</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
