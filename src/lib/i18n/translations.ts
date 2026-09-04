export type Language = "ru" | "en";

export interface Translations {
  nav: {
    howItWorks: string;
    security: string;
    onPremises: string;
    companyPanel: string;
    signIn: string;
    signUp: string;
    signOut: string;
    launchDemo: string;
  };
  hero: {
    badge: string;
    titlePart1: string;
    titleHighlight: string;
    subtitle: string;
    ctaDemo: string;
    ctaOnPrem: string;
    trust1: string;
    trust2: string;
    trust3: string;
    chatPlaceholder: string;
    askButton: string;
  };
  howItWorks: {
    tag: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  security: {
    tag: string;
    title: string;
    subtitle: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    btnMore: string;
    btnAudit: string;
  };
  personas: {
    tag: string;
    title: string;
    hrTitle: string;
    hrDesc: string;
    itTitle: string;
    itDesc: string;
    salesTitle: string;
    salesDesc: string;
    agencyTitle: string;
    agencyDesc: string;
  };
  gaps: {
    tag: string;
    title: string;
    subtitle: string;
    point1: string;
    point2: string;
    point3: string;
    btnDemo: string;
  };
  faq: {
    tag: string;
    title: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };
  ctaBanner: {
    title: string;
    subtitle: string;
    btnLaunch: string;
    btnContact: string;
  };
  authModal: {
    loginTab: string;
    registerTab: string;
    loginTitle: string;
    registerTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    passLabel: string;
    btnSubmitLogin: string;
    btnSubmitRegister: string;
    demoHint: string;
    alreadyHaveAccount: string;
    needAccount: string;
  };
  app: {
    knowledgeBase: string;
    bots: string;
    analytics: string;
    insights: string;
    playground: string;
    team: string;
    uploadDoc: string;
    connectNotion: string;
    docLimit: string;
    toSite: string;
  };
  cookies: {
    bannerTitle: string;
    bannerText: string;
    acceptAll: string;
    essentialOnly: string;
    preferences: string;
    modalTitle: string;
    modalSubtitle: string;
    essentialTitle: string;
    essentialDesc: string;
    analyticsTitle: string;
    analyticsDesc: string;
    save: string;
    doNotSellTitle: string;
    doNotSellDesc: string;
    doNotSellConfirmed: string;
  };
  legal: {
    nonPublicOffer: string;
    aiDisclosure: string;
    ageNotice: string;
    cookieSettings: string;
    doNotSell: string;
    consentCheckboxPrefix: string;
    consentCheckboxPrivacy: string;
    consentCheckboxAnd: string;
    consentCheckboxTerms: string;
    consentCheckboxLaw: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    nav: {
      howItWorks: "Как это работает",
      security: "Безопасность данных",
      onPremises: "On-Premises",
      companyPanel: "Панель компании",
      signIn: "Войти",
      signUp: "Регистрация",
      signOut: "Выйти",
      launchDemo: "Запустить стенд",
    },
    hero: {
      badge: "RAG-ассистент на базе Google Gemini & Qdrant",
      titlePart1: "AI-ассистент, который знает все ваши регламенты ",
      titleHighlight: "— и никогда не выдумывает ответ",
      subtitle:
        "Корпоративный RAG-бот для онбординга и регламентов в Slack и Telegram. Строгая изоляция по tenant_id, ссылки на первоисточники и опция On-Premises.",
      ctaDemo: "Открыть панель управления",
      ctaOnPrem: "Запросить On-Premises деплой",
      trust1: "Данные не покидают периметр компании",
      trust2: "Строгий фильтр tenant_id",
      trust3: "Без галлюцинаций",
      chatPlaceholder: "Задайте реальный вопрос боту (например: 'Какой бюджет на обучение?')",
      askButton: "Спросить",
    },
    howItWorks: {
      tag: "Архитектура RAG",
      title: "Как устроен DocuBrain за 3 шага",
      subtitle:
        "Никакого обучения модели на закрытых данных — используется надёжная векторизация и контекстная выборка.",
      step1Title: "Загрузка документов",
      step1Desc:
        "Загружайте регламенты, политики и гайды онбординга в формате PDF, DOCX или синхронизируйте страницы Notion в 1 клик.",
      step2Title: "Умное чанкование & Qdrant",
      step2Desc:
        "Текст разбивается на смысловые блоки (500–800 токенов с перекрытием). Google Gemini строит 3072-мерные эмбеддинги с изоляцией по tenant_id.",
      step3Title: "Мгновенный ответ в мессенджер",
      step3Desc:
        "Сотрудник спрашивает в Slack или Telegram. Модель сверяет порог релевантности (>0.75), цитирует первоисточник или передает вопрос HR.",
    },
    security: {
      tag: "Ключевой приоритет доверия B2B",
      title: "Строгая изоляция данных компании без риска утечки",
      subtitle:
        "Корпоративные регламенты содержат чувствительную внутреннюю информацию. Мы гарантируем, что ваши данные никогда не смешаются с другими клиентами.",
      pillar1Title: "Обязательный фильтр tenant_id на каждом векторном поиске",
      pillar1Desc:
        "Физически исключает cross-tenant leak: ни один запрос сотрудника не может задеть векторы чужой организации.",
      pillar2Title: "Шифрование токенов интеграций (AES-256)",
      pillar2Desc:
        "Slack Bot Token и Telegram Bot Token хранятся в зашифрованном виде и маскируются в интерфейсе.",
      pillar3Title: "On-Premises деплой (Docker Compose)",
      pillar3Desc:
        "Для Enterprise с повышенными требованиями: разверните Qdrant, Postgres и DocuBrain на своих серверах.",
      btnMore: "Подробнее о безопасности",
      btnAudit: "Запросить аудит безопасности",
    },
    personas: {
      tag: "Для кого создан DocuBrain",
      title: "Решение ключевых болей быстрорастущих команд",
      hrTitle: "HR-команды",
      hrDesc:
        "Автоматический онбординг новичков: бот отвечает на сотни вопросов про отпуска, ДМС, Sick Days и правила офиса без отвлечения HR-менеджера.",
      itTitle: "IT-компании",
      itDesc:
        "Быстрая выдача доступов, регламенты безопасности, правила работы с репозиториями и VPN — ответы прямо в корпоративном Slack.",
      salesTitle: "Отделы продаж",
      salesDesc:
        "Регламенты скидок, скрипты продаж, условия нестандартных договоров и прайс-листы — менеджеры получают точные условия прямо во время звонка.",
      agencyTitle: "Агентства",
      agencyDesc:
        "Высокая ротация и распределённые команды: сокращение времени погружения нового специалиста в проектные стандарты с 2 недель до 2 дней.",
    },
    gaps: {
      tag: "Уникальное преимущество DocuBrain",
      title: "Аналитика пробелов: знайте, каких регламентов не хватает компании",
      subtitle:
        "Обычный бот либо молчит, либо выдумывает ответ. DocuBrain честно признаётся сотруднику, что информации нет, и фиксирует неотвеченный вопрос в специальный отчёт для HR и руководства.",
      point1: "Подсчёт частоты похожих повторяющихся вопросов",
      point2: "Статус «Открыт» / «Решён» с кнопкой быстрой загрузки регламента",
      point3: "Автоматический сигнал HR о слабых местах базы знаний",
      btnDemo: "Посмотреть экран аналитики в демо-панели",
    },
    faq: {
      tag: "Вопросы и ответы",
      title: "Часто задаваемые вопросы",
      q1: "Куда попадают наши внутренние документы?",
      a1: "Документы разбиваются на фрагменты и векторизуются. Векторы сохраняются в изолированной коллекции с обязательным фильтром по tenant_id. Данные никогда не передаются другим компаниям и не используются для дообучения глобальных моделей. На тарифе On-Premises данные не покидают ваш сервер.",
      q2: "Может ли бот выдумать ответ (галлюцинировать)?",
      a2: "Нет. В DocuBrain реализован жёсткий RAG-пайплайн: если в базе знаний нет фрагментов с косинусным сходством выше порога, бот прямо отвечает: «Не нашёл точного ответа в базе знаний по этому вопросу, передал HR». Системный промпт модели запрещает использовать внешние знания.",
      q3: "Поддерживается ли Notion и как работает синхронизация?",
      a3: "Да, через Notion OAuth авторизацию. Вы выбираете конкретные страницы базы знаний, и DocuBrain автоматически выгружает текст, делит на чанки и поддерживает актуальность при нажатии кнопки «Переиндексировать».",
      q4: "Что входит в поставку On-Premises?",
      a4: "Вы получаете готовый Docker Compose стек (DocuBrain + self-hosted Qdrant + PostgreSQL), исходные конфигурации окружения, документацию по установке, а также консультацию нашего DevOps-инженера по первичному развертыванию на ваших серверах.",
    },
    ctaBanner: {
      title: "Освободите HR и поддержку от сотен одинаковых вопросов",
      subtitle:
        "Подключите бота к корпоративным документам прямо сейчас — сотрудники получают ответы за 2 секунды, а вы видите реальные пробелы в базе знаний.",
      btnLaunch: "Запустить тестовый стенд",
      btnContact: "Связаться с отделом продаж",
    },
    authModal: {
      loginTab: "Вход",
      registerTab: "Регистрация",
      loginTitle: "Вход в панель DocuBrain",
      registerTitle: "Регистрация компании в DocuBrain",
      nameLabel: "Ваше имя",
      namePlaceholder: "Иван Петров",
      companyLabel: "Название компании",
      companyPlaceholder: "Acme Technologies",
      emailLabel: "Корпоративный Email",
      emailPlaceholder: "ivan@company.com",
      passLabel: "Пароль",
      btnSubmitLogin: "Войти в систему",
      btnSubmitRegister: "Создать организацию и войти",
      demoHint: "💡 Демо-аккаунт: alex.hr@acmetech.io (пароль любой)",
      alreadyHaveAccount: "Уже есть аккаунт? Войти",
      needAccount: "Еще нет аккаунта? Зарегистрироваться",
    },
    app: {
      knowledgeBase: "База знаний",
      bots: "Подключение ботов",
      analytics: "Неотвеченные вопросы",
      insights: "Глубокие инсайты",
      playground: "RAG Playground",
      team: "Команда админов",
      uploadDoc: "+ Загрузить документ",
      connectNotion: "Подключить Notion",
      docLimit: "Использование лимита документов",
      toSite: "На сайт",
    },
    cookies: {
      bannerTitle: "Мы уважаем вашу конфиденциальность",
      bannerText: "Мы используем файлы cookie и технические идентификаторы для обеспечения работы платформы, безопасной авторизации и аналитики. Вы можете настроить категории или принять все условия (GDPR, 152-ФЗ, CCPA).",
      acceptAll: "Принять все",
      essentialOnly: "Только обязательные",
      preferences: "Настроить",
      modalTitle: "Настройки конфиденциальности и файлов Cookie",
      modalSubtitle: "Управляйте категориями данных в соответствии с регламентами GDPR (ЕС), 152-ФЗ (РФ) и CCPA/CPRA (США).",
      essentialTitle: "Технические и обязательные (Always Active)",
      essentialDesc: "Необходимы для работы сессий, авторизации, токенов безопасности и сохранения выбранного языка/темы. Не могут быть отключены.",
      analyticsTitle: "Аналитические и эксплуатационные",
      analyticsDesc: "Помогают анализировать качество ответов ИИ, частоту неотвеченных вопросов и быстродействие без продажи ваших данных третьим лицам.",
      save: "Сохранить настройки",
      doNotSellTitle: "Не продавать и не передавать мои данные (CCPA/CPRA)",
      doNotSellDesc: "DocuBrain не продает и не передает персональные данные брокерам данных. Ваши регламенты изолированы строгим фильтром tenant_id.",
      doNotSellConfirmed: "Отказ от передачи данных зафиксирован",
    },
    legal: {
      nonPublicOffer: "Информация на сайте носит справочно-информационный характер и не является публичной офертой (ст. 437 ГК РФ). Все права защищены.",
      aiDisclosure: "DocuBrain является B2B AI-сервисом на базе Google Gemini. Ответы генерируются автоматически на основе загруженных регламентов компании. Сервис предназначен для лиц от 18 лет.",
      ageNotice: "18+ • B2B Platform",
      cookieSettings: "Настройки Cookies",
      doNotSell: "Не продавать мои данные (CCPA)",
      consentCheckboxPrefix: "Я даю согласие на обработку персональных данных согласно ",
      consentCheckboxPrivacy: "Политике конфиденциальности",
      consentCheckboxAnd: " и принимаю ",
      consentCheckboxTerms: "Условия использования",
      consentCheckboxLaw: " (152-ФЗ, GDPR, CCPA).",
    },
  },
  en: {
    nav: {
      howItWorks: "How It Works",
      security: "Data Security",
      onPremises: "On-Premises",
      companyPanel: "Company Dashboard",
      signIn: "Sign In",
      signUp: "Get Started",
      signOut: "Log Out",
      launchDemo: "Launch Demo",
    },
    hero: {
      badge: "RAG Assistant Powered by Google Gemini & Qdrant",
      titlePart1: "AI Assistant That Knows All Your Regulations ",
      titleHighlight: "— and never hallucinates",
      subtitle:
        "Enterprise RAG bot for employee onboarding and company SOPs in Slack and Telegram. Strict tenant_id isolation, source citations, and On-Premises deployment.",
      ctaDemo: "Open Management Dashboard",
      ctaOnPrem: "Request On-Premises Deploy",
      trust1: "Data never leaves company perimeter",
      trust2: "Strict tenant_id filtering",
      trust3: "Zero hallucinations",
      chatPlaceholder: "Ask a real question (e.g. 'What is the annual education budget?')",
      askButton: "Ask",
    },
    howItWorks: {
      tag: "RAG Architecture",
      title: "How DocuBrain Works in 3 Steps",
      subtitle:
        "No training on proprietary data — relies purely on semantic vector search and isolated context synthesis.",
      step1Title: "Document Ingestion",
      step1Desc:
        "Upload policies, handbooks, and onboarding guides as PDF, DOCX or sync Notion pages in 1 click.",
      step2Title: "Smart Chunking & Qdrant",
      step2Desc:
        "Text is segmented into semantic chunks (500–800 tokens with overlap). Google Gemini builds 3072-dim embeddings with tenant_id isolation.",
      step3Title: "Instant Messenger Answers",
      step3Desc:
        "Employees ask questions in Slack or Telegram. The assistant checks similarity threshold (>0.75), cites the exact source, or flags gaps to HR.",
    },
    security: {
      tag: "Key B2B Trust Invariant",
      title: "Strict Multi-Tenant Isolation with Zero Data Leakage",
      subtitle:
        "Internal regulations contain sensitive corporate information. We guarantee your data will never mix with other organizations.",
      pillar1Title: "Mandatory tenant_id filter on every vector search",
      pillar1Desc:
        "Physically prevents cross-tenant leaks: no employee query can ever retrieve chunks from another organization.",
      pillar2Title: "Integration token encryption (AES-256)",
      pillar2Desc:
        "Slack Bot Tokens and Telegram Bot Tokens are encrypted in the database and masked across all user interfaces.",
      pillar3Title: "On-Premises deployment (Docker Compose)",
      pillar3Desc:
        "For Enterprise clients with strict residency requirements: deploy Qdrant, Postgres, and DocuBrain within your own infrastructure.",
      btnMore: "Learn More About Security",
      btnAudit: "Request Security Audit",
    },
    personas: {
      tag: "Who DocuBrain is Built For",
      title: "Solving Pain Points of High-Velocity Teams",
      hrTitle: "HR Teams",
      hrDesc:
        "Automate new hire onboarding: bot answers hundreds of questions regarding vacations, health insurance, sick days, and office rules.",
      itTitle: "IT Companies",
      itDesc:
        "Access provisioning, security compliance, git repository guidelines, and VPN configs answered right in corporate Slack.",
      salesTitle: "Sales Departments",
      salesDesc:
        "Discount policies, sales scripts, custom contract guidelines, and price lists — reps get verified terms right during customer calls.",
      agencyTitle: "Digital Agencies",
      agencyDesc:
        "High rotation and remote teams: reduce new specialist ramp-up time to project standards from 2 weeks down to 2 days.",
    },
    gaps: {
      tag: "DocuBrain Unique Advantage",
      title: "Gap Analytics: Discover Missing Company Regulations",
      subtitle:
        "A typical bot either stays silent or makes up an answer. DocuBrain truthfully admits when information is missing and logs unanswered questions to HR.",
      point1: "Track frequency of repeated questions",
      point2: "Open vs. Resolved status with quick document upload shortcut",
      point3: "Automatic HR alert on knowledge base weaknesses",
      btnDemo: "View Analytics in Demo Dashboard",
    },
    faq: {
      tag: "FAQ",
      title: "Frequently Asked Questions",
      q1: "Where are our internal documents stored?",
      a1: "Documents are parsed into chunks and vectorized. Vectors are saved in an isolated Qdrant collection with mandatory tenant_id filtering. Data is never shared or used to train public models. On On-Premises, data never leaves your server.",
      q2: "Can the bot hallucinate an answer?",
      a2: "No. DocuBrain enforces a strict RAG pipeline: if no chunks exceed the similarity threshold, the bot states: 'I could not find an exact answer in the knowledge base, forwarded to HR.' System instructions forbid external knowledge.",
      q3: "Is Notion supported and how does sync work?",
      a3: "Yes, via Notion OAuth. You select specific knowledge pages, and DocuBrain automatically parses text, chunks it, and updates embeddings upon clicking 'Reindex'.",
      q4: "What is included in the On-Premises package?",
      a4: "You receive a complete Docker Compose stack (DocuBrain + self-hosted Qdrant + PostgreSQL), production environment templates, installation guide, and setup consultation with our DevOps engineer.",
    },
    ctaBanner: {
      title: "Relieve HR and Support from Hundreds of Repetitive Questions",
      subtitle:
        "Connect your bot to company documents today — employees get answers in 2 seconds while you identify real knowledge gaps.",
      btnLaunch: "Launch Test Sandbox",
      btnContact: "Contact Sales Team",
    },
    authModal: {
      loginTab: "Sign In",
      registerTab: "Register",
      loginTitle: "Sign In to DocuBrain",
      registerTitle: "Register Your Company on DocuBrain",
      nameLabel: "Your Name",
      namePlaceholder: "Alex Smith",
      companyLabel: "Company Name",
      companyPlaceholder: "Acme Technologies",
      emailLabel: "Corporate Email",
      emailPlaceholder: "alex@company.com",
      passLabel: "Password",
      btnSubmitLogin: "Sign In",
      btnSubmitRegister: "Create Organization & Enter",
      demoHint: "💡 Demo account: alex.hr@acmetech.io (any password)",
      alreadyHaveAccount: "Already have an account? Sign In",
      needAccount: "Need an account? Register now",
    },
    app: {
      knowledgeBase: "Knowledge Base",
      bots: "Bot Integrations",
      analytics: "Unanswered Questions",
      insights: "Deep Insights",
      playground: "RAG Playground",
      team: "Admin Team",
      uploadDoc: "+ Upload Document",
      connectNotion: "Connect Notion",
      docLimit: "Document Limit Usage",
      toSite: "Back to Site",
    },
    cookies: {
      bannerTitle: "We value your privacy",
      bannerText: "We use cookies and technical identifiers to ensure platform reliability, secure authentication, and telemetry. You can customize preferences or accept all terms (GDPR, CCPA, 152-FZ).",
      acceptAll: "Accept All",
      essentialOnly: "Essential Only",
      preferences: "Customize",
      modalTitle: "Privacy & Cookie Preferences",
      modalSubtitle: "Manage your data categories in compliance with GDPR (EU), CCPA/CPRA (US), and 152-FZ (RU).",
      essentialTitle: "Technical & Necessary (Always Active)",
      essentialDesc: "Essential for secure sessions, authentication, CSRF tokens, and saving language/theme choices. Cannot be deactivated.",
      analyticsTitle: "Analytics & Performance",
      analyticsDesc: "Helps monitor AI response latency, unanswered questions, and system health without selling or sharing your data with third parties.",
      save: "Save Preferences",
      doNotSellTitle: "Do Not Sell or Share My Personal Information (CCPA/CPRA)",
      doNotSellDesc: "DocuBrain never sells or rents corporate documents or personal data to data brokers. Your content is strictly isolated by tenant_id.",
      doNotSellConfirmed: "Do Not Sell/Share preference recorded",
    },
    legal: {
      nonPublicOffer: "The information on this website is for informational purposes only and does not constitute a public offer. All rights reserved.",
      aiDisclosure: "DocuBrain is a B2B AI platform powered by Google Gemini. Responses are generated algorithmically based on provided company documents. For users 18+.",
      ageNotice: "18+ • Enterprise B2B",
      cookieSettings: "Cookie Preferences",
      doNotSell: "Do Not Sell My Info (CCPA)",
      consentCheckboxPrefix: "I agree to the processing of personal data in accordance with the ",
      consentCheckboxPrivacy: "Privacy Policy",
      consentCheckboxAnd: " and accept the ",
      consentCheckboxTerms: "Terms of Service",
      consentCheckboxLaw: " (GDPR, CCPA, 152-FZ).",
    },
  },
};
