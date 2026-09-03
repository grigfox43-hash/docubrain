import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Lock, Database, FileCheck, Server, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Data-Leak Guarantee</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white tracking-tight">
            Безопасность и изоляция корпоративных данных
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Внутренние регламенты, NDA и коммерческие политики требуют бескомпромиссной защиты. Узнайте, как DocuBrain защищает данные вашей компании.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-5">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
              Мультитенантная изоляция (tenant_id)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Каждый векторный фрагмент в Qdrant сохраняется с обязательным атрибутом <code className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">metadata.tenant_id</code>. Все входящие поисковые запросы на уровне API жестко ограничиваются текущей организацией. Утечка данных между клиентами исключена алгоритмически.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 flex items-center justify-center mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
              Шифрование токенов и данных
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Токены интеграций (Slack Bot Token, Telegram Bot Token) шифруются с использованием AES-256 перед записью в базу данных. В интерфейсе панели администратора токены всегда маскируются (например, <code className="text-xs font-mono">xoxb-918...9a41</code>).
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 flex items-center justify-center mb-5">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
              Без обучения на ваших данных
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Мы используем Enterprise API провайдеров (Google Gemini & OpenAI), в соответствии с которыми входящие промпты и документы не используются для обучения базовых моделей искусственного интеллекта.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-5">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3">
              On-Premises контур
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Для банков, FinTech и компаний с требованиями регуляторов к суверенитету данных доступна изолированная установка: self-hosted Qdrant + PostgreSQL в Docker Compose внутри вашего защищённого VPN периметра.
            </p>
          </div>
        </div>

        {/* Detailed Security Checklist */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#161922] border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
          <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-6">
            Чеклист соответствия стандартам безопасности
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm text-gray-900 dark:text-white block">
                  Право на забвение (GDPR Right to Erasure)
                </strong>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  При удалении документа из базы знаний все связанные векторные фрагменты мгновенно стираются из векторной базы данных. При удалении аккаунта компании удаляются все записи каскадно (CASCADE).
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm text-gray-900 dark:text-white block">
                  Защита от Prompt Injection
                </strong>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Входящие вопросы сотрудников экранируются и не имеют прямого доступа к исполнению системных инструкций. Системный промпт жестко фиксирует роль корпоративного ассистента.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm text-gray-900 dark:text-white block">
                  Журналирование и аудит (Audit Logs)
                </strong>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Все обращения к базе знаний фиксируются в журнале запросов (время, канал, оценка релевантности и факт предоставления ответа).
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-500">
              Нужно подписать NDA или заполнить опросник безопасности вашей IT-службы?
            </span>
            <a
              href="mailto:security@docubrain.io"
              className="px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold shrink-0"
            >
              security@docubrain.io
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
