import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileCheck, ShieldAlert, Scale, AlertCircle, Building2, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0d12]">
      <Navbar />

      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Условия обслуживания • B2B SaaS Enterprise Agreement</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
            Условия использования платформы DocuBrain
          </h1>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Редакция действует с {new Date().toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" })} • Документ регулирует коммерческое использование сервиса
          </p>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 space-y-8 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              1. Предмет соглашения и статус сервиса
            </h2>
            <p>
              Настоящие Условия использования («Условия») регулируют доступ и использование корпоративной платформы <strong>DocuBrain</strong> («Сервис»), предназначенной для юридических лиц и индивидуальных предпринимателей (B2B).
            </p>
            <p>
              Регистрируя аккаунт, подключая корпоративные боты или загружая документы, вы подтверждаете, что обладаете полномочиями действовать от имени вашей организации и безоговорочно принимаете настоящие Условия.
            </p>
          </section>

          {/* Section 2: 437 GK RF & 38-FZ Notice */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              2. Непубличный характер информации (ст. 437 ГК РФ и 38-ФЗ «О рекламе»)
            </h2>
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 text-xs text-amber-950 dark:text-amber-200 space-y-2">
              <p className="font-semibold">
                Справочно-информационный характер материалов:
              </p>
              <p>
                Любые описания возможностей, технические спецификации, демонстрационные сценарии и калькуляторы, размещенные на сайте <code>docubrain.io</code>, носят исключительно <strong>справочно-информационный характер</strong> и ни при каких условиях не являются публичной офертой, определяемой положениями части 2 Статьи 437 Гражданского кодекса Российской Федерации.
              </p>
              <p>
                Конкретные условия обслуживания, SLA (Service Level Agreement), лимиты запросов и порядок оплаты определяются индивидуальным коммерческим договором или утвержденным счетом-офертой.
              </p>
            </div>
          </section>

          {/* Section 3: Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              3. Интеллектуальная собственность и права на данные
            </h2>
            <p>
              Мы строго придерживаемся принципа уважения корпоративной тайны и авторских прав:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <li><strong>Данные клиента:</strong> Все исключительные права на загруженные документы, инструкции, регламенты и сформированные на их основе векторные представления принадлежат исключительно клиенту.</li>
              <li><strong>Платформа DocuBrain:</strong> Исходный программный код, интерфейсы, архитектура индексации, дизайн и товарные знаки DocuBrain являются собственностью компании DocuBrain Inc. и защищены международным законодательством об интеллектуальной собственности.</li>
            </ul>
          </section>

          {/* Section 4: AI & Disclaimer of Warranties */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              4. Особенности технологий искусственного интеллекта и ограничение ответственности
            </h2>
            <p>
              DocuBrain использует алгоритмы поиска релевантных контекстов (Retrieval-Augmented Generation) и языковые модели Google Gemini:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <li><strong>Вероятностный характер:</strong> Модель формирует ответы на основе семантического анализа загруженных текстов. Несмотря на жесткие инструкции по недопущению галлюцинаций, клиент осознает вероятность неточностей в случае противоречий в исходных регламентах.</li>
              <li><strong>Отсутствие юридических консультаций:</strong> Ответы сервиса не являются юридической, налоговой, медицинской или иной официальной экспертной консультацией. Критически важные решения подлежат верификации уполномоченными специалистами компании.</li>
              <li><strong>Отказ от косвенных убытков:</strong> В максимально допустимой применимым правом степени DocuBrain Inc. не несет ответственности за упущенную выгоду, простой бизнеса или косвенный ущерб, возникший в результате использования сервиса.</li>
            </ul>
          </section>

          {/* Section 5: Acceptable Use */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              5. Правила допустимого использования (Acceptable Use Policy)
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Пользователю запрещается:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <li>Загружать материалы, нарушающие права третьих лиц, содержащие вредоносное ПО или информацию, распространение которой запрещено законом;</li>
              <li>Предпринимать попытки взлома, внедрения вредоносных prompt-инъекций или декомпиляции алгоритмов изоляции <code>tenant_id</code>;</li>
              <li>Использовать сервис лицами младше 18 лет;</li>
              <li>Предоставлять доступ третьим лицам вне рамок авторизованных сотрудников организации.</li>
            </ul>
          </section>

          {/* Section 6: Contacts */}
          <section className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800 text-xs">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              6. Контакты и разрешение споров
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Все споры и разногласия разрешаются путем обязательного досудебного претензионного порядка (срок рассмотрения претензии — 30 календарных дней).
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Юридические обращения принимаются по электронной почте: <a href="mailto:legal@docubrain.io" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">legal@docubrain.io</a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
