import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Lock, Globe2, FileText, CheckCircle2, UserCheck, AlertTriangle } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0d12]">
      <Navbar />

      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GDPR (EU) • 152-ФЗ (РФ) • CCPA/CPRA (US) • EU AI Act Compliant</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
            Политика конфиденциальности и обработки персональных данных
          </h1>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Дата последней редакции: {new Date().toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" })} • Версия 2.4 (Enterprise Multi-tenant Edition)
          </p>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 space-y-8 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              1. Общие положения и оператор данных (Data Controller)
            </h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных и корпоративных данных при использовании программного сервиса <strong>DocuBrain</strong> («Сервис», «Платформа»), предоставляемого компанией <strong>DocuBrain Inc.</strong> («Оператор», «Мы»).
            </p>
            <p>
              Платформа представляет собой корпоративное B2B-решение (Business-to-Business) для индексации внутренних регламентов компании и генерации ответов на вопросы сотрудников через Retrieval-Augmented Generation (RAG) на базе моделей Google Gemini и векторной базы данных Qdrant.
            </p>
            <p>
              Политика составлена в строгом соответствии с:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <li><strong>Регламентом ЕС 2016/679 (GDPR)</strong> и директивой ePrivacy Directive;</li>
              <li><strong>Федеральным законом РФ № 152-ФЗ</strong> «О персональных данных»;</li>
              <li><strong>Законодательством США (CCPA/CPRA)</strong> о защите прав потребителей штата Калифорния;</li>
              <li><strong>Регламентом ЕС об искусственном интеллекте (EU AI Act 2024/1689)</strong> в части требований к прозрачности генеративных систем.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              2. Правовые основания и цели обработки данных
            </h2>
            <p>
              Оператор осуществляет обработку данных исключительно на законных основаниях (ст. 6 GDPR, ст. 6 152-ФЗ РФ):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40">
                <h4 className="font-bold text-xs text-gray-900 dark:text-white mb-1">Исполнение договора (Contract)</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Предоставление доступа к Личному кабинету, авторизация администраторов, индексирование корпоративных баз знаний и маршрутизация ботов в Slack / Telegram.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40">
                <h4 className="font-bold text-xs text-gray-900 dark:text-white mb-1">Явное согласие (Consent)</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Предоставляется субъектом при регистрации учетной записи (чекбокс) и при выборе настроек аналитических файлов cookie.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              3. Категории обрабатываемых данных и строгая изоляция
            </h2>
            <p>
              Мы обрабатываем только минимально необходимый объем данных для функционирования платформы (Data Minimization):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <li><strong>Данные учетной записи:</strong> корпоративный адрес электронной почты, имя администратора, наименование организации, хэшированный пароль.</li>
              <li><strong>Корпоративный контент компании:</strong> тексты загруженных регламентов, инструкций, векторные фрагменты (chunks) и эмбеддинги.</li>
              <li><strong>Техническая телеметрия:</strong> IP-адрес, тип браузера, сессионные токены, журналы запросов к боту и оценки релевантности ответов.</li>
            </ul>

            <div className="mt-3 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20">
              <h4 className="font-bold text-xs text-indigo-900 dark:text-indigo-300 flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                Архитектурный инвариант безопасности: Запрет публичного обучения ИИ
              </h4>
              <p className="text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed">
                Корпоративные документы, загруженные в DocuBrain, <strong>НИКОГДА не передаются третьим лицам и НЕ используются для открытого обучения или дообучения глобальных моделей Google Gemini</strong>. Векторные эмбеддинги хранятся в изолированных коллекциях Qdrant с обязательным серверным фильтром <code>tenant_id</code>.
              </p>
            </div>
          </section>

          {/* Section 4: 152-ФЗ */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              4. Специальные положения для резидентов Российской Федерации (152-ФЗ)
            </h2>
            <p>
              В соответствии с требованиями Федерального закона № 152-ФЗ «О персональных данных»:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <li><strong>Согласие субъекта:</strong> Регистрируясь на Платформе, пользователь дает конкретное, предметное, информированное, сознательное и однозначное согласие на обработку своих данных.</li>
              <li><strong>Локализация:</strong> Первичный сбор, запись, систематизация, накопление и хранение персональных данных граждан РФ обеспечиваются в соответствии с требованиями законодательства РФ.</li>
              <li><strong>Право на отзыв согласия:</strong> Субъект персональных данных вправе отозвать свое согласие в любой момент, направив официальное уведомление на адрес <code>privacy@docubrain.io</code>. Оператор прекращает обработку данных в срок, не превышающий 10 рабочих дней.</li>
            </ul>
          </section>

          {/* Section 5: GDPR */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              5. Права субъектов данных Европейского Союза (GDPR, Articles 15–22)
            </h2>
            <p>
              Если вы находитесь на территории Европейской экономической зоны (EEA), вы обладаете следующими неотъемлемыми правами:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                <strong>Право на доступ (Art. 15):</strong> Запрос копии всех обрабатываемых персональных данных.
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                <strong>Право на забвение (Art. 17):</strong> Полное безвозвратное удаление учетной записи и документов.
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                <strong>Право на исправление (Art. 16):</strong> Обновление неточных или устаревших сведений.
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                <strong>Переносимость данных (Art. 20):</strong> Экспорт данных в структурированном машиночитаемом формате (JSON).
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
              Вы также имеете право подать жалобу в национальный надзорный орган по защите данных (Data Protection Authority, DPA) вашего государства-члена ЕС.
            </p>
          </section>

          {/* Section 6: CCPA/CPRA */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              6. Положения для жителей США и Калифорнии (CCPA / CPRA Notice)
            </h2>
            <p>
              В соответствии с Законом Калифорнии о конфиденциальности потребителей (California Consumer Privacy Act, CCPA / CPRA):
            </p>
            <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/50 bg-purple-50/30 dark:bg-purple-950/20">
              <h4 className="font-bold text-xs text-purple-900 dark:text-purple-300 mb-1">
                «Do Not Sell or Share My Personal Information» Statement
              </h4>
              <p className="text-xs text-purple-950 dark:text-purple-200 leading-relaxed">
                DocuBrain <strong>НЕ ПРОДАЕТ и НЕ ПЕРЕДАЕТ</strong> личные данные пользователей третьим лицам или брокерам данных («We do not sell or share your personal information for monetary or other consideration»).
              </p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Потребители из Калифорнии имеют право требовать раскрытия категорий собираемых данных, требовать их удаления без дискриминации в стоимости или качестве предоставляемых услуг.
            </p>
          </section>

          {/* Section 7: EU AI Act & Transparency */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              7. Прозрачность искусственного интеллекта (EU AI Act & FTC Disclosures)
            </h2>
            <p>
              В соответствии с Регламентом ЕС об искусственном интеллекте (EU AI Act 2024/1689) и руководящими принципами FTC (США):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <li><strong>Уведомление об ИИ:</strong> Пользователи прямо уведомляются, что ответы ассистента генерируются алгоритмической моделью искусственного интеллекта на основе загруженного контекста.</li>
              <li><strong>Ограничение решений:</strong> Система не принимает автоматизированных решений, влекущих юридические последствия для сотрудников компании, без верификации ответственным лицом (Human-in-the-loop).</li>
              <li><strong>Репрезентативность демонстраций:</strong> Интерактивные демонстрации на сайте служат иллюстрацией функционала и не гарантируют идентичность ответов на произвольных нерегламентированных данных.</li>
            </ul>
          </section>

          {/* Section 8: Children */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              8. Защита несовершеннолетних (COPPA & GDPR-K)
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Платформа DocuBrain предназначена исключительно для корпоративного использования (B2B) лицами, достигшими возраста 18 лет. Мы осознанно не собираем и не обрабатываем персональные данные лиц младше 18 лет (включая требования Закона США COPPA и статьи 8 GDPR). При обнаружении случайного сбора таких данных они подлежат незамедлительному уничтожению.
            </p>
          </section>

          {/* Section 9: Cookies */}
          <section id="cookies" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              9. Политика использования файлов Cookie (Cookie Policy)
            </h2>
            <p>
              Файлы cookie представляют собой небольшие текстовые файлы, сохраняемые на вашем устройстве. Платформа использует:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <li><strong>Технические (Обязательные):</strong> Обеспечивают сессии, авторизацию JWT, защиту от межсайтовой подделки запросов (CSRF), а также сохранение выбранного языка и темы оформления.</li>
              <li><strong>Аналитические (Опциональные):</strong> Позволяют анализировать задержку генерации ответов и системные ошибки для улучшения стабильности. Не используются для отслеживания вне домена DocuBrain.</li>
            </ul>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Вы можете изменить свои настройки cookies в любой момент, нажав кнопку «Настройки Cookies» в нижней части любой страницы сайта.
            </p>
          </section>

          {/* Section 10: Contacts */}
          <section className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              10. Контактная информация Службы защиты данных (DPO)
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              По всем вопросам, связанным с настоящей Политикой, реализацией ваших прав или отзывом согласия на обработку данных, обращайтесь к уполномоченному лицу по защите данных:
            </p>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs space-y-1">
              <p><strong>DocuBrain Inc. Data Protection Office</strong></p>
              <p>Email для юридических обращений: <a href="mailto:privacy@docubrain.io" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">privacy@docubrain.io</a></p>
              <p>Служба безопасности: <a href="mailto:security@docubrain.io" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">security@docubrain.io</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
