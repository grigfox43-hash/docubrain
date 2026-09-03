import {
  Tenant,
  AdminUser,
  DocumentRecord,
  DocumentChunk,
  BotChannel,
  QueryLog,
  UnansweredQuestion,
  PlanType,
} from "../types";
import { chunkText } from "../ai/chunker";

// In-memory data store with seeded data for immediate production functionality
class DatabaseStore {
  private tenants: Map<string, Tenant> = new Map();
  private adminUsers: Map<string, AdminUser[]> = new Map();
  private documents: Map<string, DocumentRecord[]> = new Map();
  private chunks: Map<string, DocumentChunk[]> = new Map();
  private botChannels: Map<string, BotChannel[]> = new Map();
  private queryLogs: Map<string, QueryLog[]> = new Map();
  private unansweredQuestions: Map<string, UnansweredQuestion[]> = new Map();

  constructor() {
    this.seedDefaultData();
  }

  private seedDefaultData() {
    const defaultTenantId = "tenant-demo-acme";

    // 1. Tenant
    this.tenants.set(defaultTenantId, {
      id: defaultTenantId,
      name: "Acme Technologies",
      plan: "team",
      plan_status: "active",
      stripe_customer_id: "cus_demo12345",
      is_on_premises: false,
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    });

    // 2. Admin Users
    this.adminUsers.set(defaultTenantId, [
      {
        id: "user-1",
        tenant_id: defaultTenantId,
        email: "alex.hr@acmetech.io",
        name: "Алексей Смирнов (Head of People)",
        role: "admin",
        created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      },
      {
        id: "user-2",
        tenant_id: defaultTenantId,
        email: "daria.ops@acmetech.io",
        name: "Дарья Ковалёва (IT Ops)",
        role: "viewer",
        created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
      },
    ]);

    // 3. Seed Corporate Documents
    const seedDocs = [
      {
        id: "doc-1",
        title: "Регламент отпусков, отгулов и больничных 2026",
        source_type: "pdf" as const,
        source_url: "/files/reglament-vacations-2026.pdf",
        content: `
# Регламент отпусков и больничных Acme Technologies (версия 2026)

1. Ежегодный оплачиваемый отпуск:
- Каждому сотруднику предоставляется 28 календарных дней оплачиваемого отпуска в год.
- Отпуск можно делить на части, при этом хотя бы одна часть должна составлять не менее 14 календарных дней.
- Заявление на отпуск подаётся через внутренний HR-портал не позднее, чем за 14 рабочих дней до предполагаемой даты начала отпуска.
- Отпускные выплачиваются не позднее, чем за 3 календарных дня до старта отпуска.

2. Дни здоровья (Day Off / Sick Leave без больничного листа):
- Компания предоставляет до 4 дней в календарный год (Sick Days), которые можно взять без оформления официального больничного листа от врача.
- Для оформления достаточно написать в личные сообщения своему тимлиду и поставить статус 🤒 в корпоративном Slack в канале #general до 10:00 утра рабочего дня.

3. Официальный больничный:
- При болезни свыше 2 дней подряд требуется оформление электронного листка нетрудоспособности (ЭЛН).
- Номер ЭЛН необходимо направить HR-менеджеру в день закрытия больничного листа.
        `,
      },
      {
        id: "doc-2",
        title: "Политика информационной безопасности и выдачи доступов",
        source_type: "docx" as const,
        source_url: "/files/security-policy.docx",
        content: `
# Политика информационной безопасности Acme Technologies

1. Парольная политика и 2FA:
- Двухфакторная аутентификация (2FA) ОБЯЗАТЕЛЬНА для всех сервисов: Google Workspace, GitHub, Slack, VPN.
- В качестве второго фактора разрешено использовать Google Authenticator, 1Password или аппаратные ключи YubiKey. Использование SMS-кодов запрещено.
- Пароль должен быть длиной не менее 16 символов и генерироваться через менеджер паролей.

2. Защита рабочих устройств:
- Диск каждого рабочего ноутбука (MacBook / ThinkPad) должен быть зашифрован (FileVault для macOS, BitLocker для Windows).
- Запрещено оставлять устройство незаблокированным на рабочем месте. Время автоблокировки экрана установлено в 5 минут.
- Установка несанкционированного ПО без согласования с Security-командой (#sec-ops) запрещена.

3. VPN и удалённая работа:
- Подключение к production-контурам и базам данных разрешено только через корпоративный WireGuard VPN.
- Доступ выдаётся через заявку в IT Service Desk с одобрением тимлида.
        `,
      },
      {
        id: "doc-3",
        title: "Гайд онбординга новичка: первые 30 дней и техника",
        source_type: "notion" as const,
        source_url: "https://notion.so/acme/onboarding-guide-30days",
        content: `
# Гайд онбординга нового сотрудника: Первые 30 дней

1. Первый рабочий день (Day 1):
- В 10:00 созвон-знакомство с HR-менеджером и выдача доступов (email, Slack, Notion).
- В 12:00 встреча с назначенным Buddy (бадди/наставником), который проведёт экскурсию по офису или виртуальному пространству.
- В 15:00 синк с тимлидом: обсуждение целей испытательного срока на 1-й, 2-й и 3-й месяцы.

2. Рабочая техника:
- Каждый сотрудник выбирает комплект техники: MacBook Pro M3 16/32GB или Lenovo ThinkPad X1 Carbon.
- Дополнительно выдаётся 4K-монитор 27", эргономичная клавиатура и мышь/трекпад.
- При удалённой работе доставка техники осуществляется курьерской службой за 2 дня до первого рабочего дня.

3. Испытательный срок:
- Стандартный испытательный срок составляет 3 месяца.
- Промежуточный синк 1-на-1 проводится каждые 2 недели с фиксацией обратной связи в Performance Review форме.
        `,
      },
      {
        id: "doc-4",
        title: "Бенефиты, компенсация спорта, техники и образования",
        source_type: "pdf" as const,
        source_url: "/files/benefits-and-perks-2026.pdf",
        content: `
# Программа бенефитов и компенсаций Acme Technologies

1. ДМС (Медицинская страховка):
- Предоставляется с первого дня работы после успешного прохождения первого месяца.
- Включает стоматологию, экстренную госпитализацию, вызов врача на дом и психологическую помощь (сервис Ясно, 10 сессий в год).

2. Компенсация обучения и конференций:
- Образовательный бюджет составляет до 120 000 рублей (или $1 500) в год на каждого сотрудника.
- Покрывает профильные курсы, книги, билеты на IT-конференции.
- Согласование проходит через тимлида в HR-портале.

3. Компенсация спорта:
- До 30 000 рублей в год на абонемент в фитнес-клуб, бассейн или занятия йогой.
- Выплата производится раз в полгода по чекам об оплате.

4. Обустройство рабочего места дома:
- Единоразовый бонус $500 при выходе на работу на покупку стола, кресла или освещения.
        `,
      },
    ];

    const docRecords: DocumentRecord[] = [];
    const chunkRecords: DocumentChunk[] = [];

    for (const doc of seedDocs) {
      const chunks = chunkText(doc.content, 200, 30);
      const docChunks: DocumentChunk[] = chunks.map((c) => ({
        id: `chunk-${doc.id}-${c.index}`,
        document_id: doc.id,
        tenant_id: defaultTenantId,
        chunk_index: c.index,
        chunk_text: c.text,
        source_url: doc.source_url,
      }));

      chunkRecords.push(...docChunks);

      docRecords.push({
        id: doc.id,
        tenant_id: defaultTenantId,
        source_type: doc.source_type,
        title: doc.title,
        source_url: doc.source_url,
        status: "indexed",
        chunk_count: docChunks.length,
        created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
        chunks: docChunks,
      });
    }

    this.documents.set(defaultTenantId, docRecords);
    this.chunks.set(defaultTenantId, chunkRecords);

    // 4. Bot Channels
    this.botChannels.set(defaultTenantId, [
      {
        id: "chan-slack-1",
        tenant_id: defaultTenantId,
        channel_type: "slack",
        slack_team_id: "T08AB49C91",
        slack_team_name: "Acme Team Workspace",
        slack_bot_token_masked: "xoxb-91823...9a41",
        is_active: true,
        connected_at: new Date(Date.now() - 20 * 86400000).toISOString(),
      },
      {
        id: "chan-tg-1",
        tenant_id: defaultTenantId,
        channel_type: "telegram",
        telegram_bot_token_masked: "7918234...kE3b",
        telegram_bot_username: "acme_docubrain_bot",
        is_active: true,
        connected_at: new Date(Date.now() - 18 * 86400000).toISOString(),
      },
    ]);

    // 5. Unanswered Questions (HR signals)
    this.unansweredQuestions.set(defaultTenantId, [
      {
        id: "uq-1",
        tenant_id: defaultTenantId,
        question_text: "Как получить парковочное место на подземной парковке бизнес-центра?",
        frequency: 14,
        status: "open",
        created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      },
      {
        id: "uq-2",
        tenant_id: defaultTenantId,
        question_text: "Оплачивает ли компания курсы изучения испанского или немецкого языка?",
        frequency: 9,
        status: "open",
        created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
      {
        id: "uq-3",
        tenant_id: defaultTenantId,
        question_text: "Есть ли льготная медицинская страховка для членов семьи и детей сотрудника?",
        frequency: 8,
        status: "open",
        created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      },
      {
        id: "uq-4",
        tenant_id: defaultTenantId,
        question_text: "Как оформить командировочные суточные при поездке в офис в Астане?",
        frequency: 6,
        status: "resolved",
        created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      },
      {
        id: "uq-5",
        tenant_id: defaultTenantId,
        question_text: "Можно ли работать удалённо из других часовых поясов более 6 месяцев подряд?",
        frequency: 5,
        status: "open",
        created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      },
    ]);

    // 6. Query logs
    this.queryLogs.set(defaultTenantId, [
      {
        id: "ql-1",
        tenant_id: defaultTenantId,
        channel_type: "slack",
        question_text: "Сколько дней отпуска положено в год и можно ли делить на части?",
        answer_text: "Сотрудникам Acme Technologies предоставляется 28 календарных дней оплачиваемого отпуска в год. Отпуск можно делить на части, при этом хотя бы одна часть должна составлять не менее 14 дней.",
        matched_document_ids: ["doc-1"],
        relevance_score: 0.94,
        was_answered: true,
        created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
      },
      {
        id: "ql-2",
        tenant_id: defaultTenantId,
        channel_type: "telegram",
        question_text: "Что делать, если заболел на один день? Нужен больничный лист?",
        answer_text: "Вы можете воспользоваться Sick Day (днём здоровья без больничного) — компания предоставляет до 4 таких дней в год. До 10:00 напишите тимлиду и поставьте статус 🤒 в Slack #general.",
        matched_document_ids: ["doc-1"],
        relevance_score: 0.92,
        was_answered: true,
        created_at: new Date(Date.now() - 5 * 3600000).toISOString(),
      },
      {
        id: "ql-3",
        tenant_id: defaultTenantId,
        channel_type: "slack",
        question_text: "Как получить парковочное место в БЦ?",
        answer_text: "Не нашёл точного ответа в базе знаний по этому вопросу. Рекомендую уточнить у HR/руководителя.",
        matched_document_ids: [],
        relevance_score: 0.41,
        was_answered: false,
        created_at: new Date(Date.now() - 8 * 3600000).toISOString(),
      },
    ]);
  }

  // Tenant operations
  getTenant(id: string): Tenant | undefined {
    return this.tenants.get(id);
  }

  getAllTenants(): Tenant[] {
    return Array.from(this.tenants.values());
  }

  updateTenantPlan(id: string, plan: PlanType): Tenant | undefined {
    const t = this.tenants.get(id);
    if (t) {
      t.plan = plan;
      this.tenants.set(id, t);
    }
    return t;
  }

  // Documents
  getDocuments(tenantId: string): DocumentRecord[] {
    return this.documents.get(tenantId) || [];
  }

  getDocument(tenantId: string, id: string): DocumentRecord | undefined {
    const list = this.getDocuments(tenantId);
    return list.find((d) => d.id === id);
  }

  addDocument(tenantId: string, doc: Omit<DocumentRecord, "id" | "created_at">): DocumentRecord {
    const list = this.getDocuments(tenantId);
    const newDoc: DocumentRecord = {
      ...doc,
      id: `doc-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    list.unshift(newDoc);
    this.documents.set(tenantId, list);

    // Save chunks
    if (doc.chunks && doc.chunks.length > 0) {
      const existingChunks = this.chunks.get(tenantId) || [];
      const updatedChunks = doc.chunks.map((c) => ({
        ...c,
        document_id: newDoc.id,
        tenant_id: tenantId,
      }));
      this.chunks.set(tenantId, [...existingChunks, ...updatedChunks]);
    }

    return newDoc;
  }

  deleteDocument(tenantId: string, id: string): boolean {
    const list = this.getDocuments(tenantId);
    const filtered = list.filter((d) => d.id !== id);
    this.documents.set(tenantId, filtered);

    // Remove chunks as well (Section 5.1 & Security Invariant)
    const currentChunks = this.chunks.get(tenantId) || [];
    this.chunks.set(
      tenantId,
      currentChunks.filter((c) => c.document_id !== id)
    );

    return true;
  }

  // Chunks strictly isolated by tenant_id
  getTenantChunks(tenantId: string): DocumentChunk[] {
    return this.chunks.get(tenantId) || [];
  }

  setChunkEmbedding(tenantId: string, chunkId: string, embedding: number[]) {
    const list = this.chunks.get(tenantId) || [];
    const chunk = list.find((c) => c.id === chunkId);
    if (chunk) {
      chunk.embedding = embedding;
    }
  }

  // Bot channels
  getBotChannels(tenantId: string): BotChannel[] {
    return this.botChannels.get(tenantId) || [];
  }

  saveBotChannel(tenantId: string, channel: BotChannel) {
    const list = this.getBotChannels(tenantId);
    const idx = list.findIndex((c) => c.channel_type === channel.channel_type);
    if (idx >= 0) {
      list[idx] = channel;
    } else {
      list.push(channel);
    }
    this.botChannels.set(tenantId, list);
  }

  // Unanswered questions
  getUnansweredQuestions(tenantId: string): UnansweredQuestion[] {
    return this.unansweredQuestions.get(tenantId) || [];
  }

  recordUnansweredQuestion(tenantId: string, questionText: string): UnansweredQuestion {
    const list = this.getUnansweredQuestions(tenantId);
    const existing = list.find(
      (q) => q.question_text.toLowerCase().trim() === questionText.toLowerCase().trim()
    );

    if (existing) {
      existing.frequency += 1;
      existing.updated_at = new Date().toISOString();

      // Async persist to MongoDB
      import("./mongo").then(({ getMongoDb }) => {
        getMongoDb().then((mongo) => {
          if (mongo) {
            mongo.collection("unanswered_questions").updateOne(
              { id: existing.id },
              { $set: { frequency: existing.frequency, updated_at: existing.updated_at } }
            ).catch(console.error);
          }
        });
      });

      return existing;
    }

    const newQuestion: UnansweredQuestion = {
      id: `uq-${Date.now()}`,
      tenant_id: tenantId,
      question_text: questionText,
      frequency: 1,
      status: "open",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    list.unshift(newQuestion);
    this.unansweredQuestions.set(tenantId, list);

    // Async persist to MongoDB
    import("./mongo").then(({ getMongoDb }) => {
      getMongoDb().then((mongo) => {
        if (mongo) {
          mongo.collection("unanswered_questions").insertOne(newQuestion).catch(console.error);
        }
      });
    });

    return newQuestion;
  }

  resolveQuestion(tenantId: string, questionId: string, status: "open" | "resolved"): boolean {
    const list = this.getUnansweredQuestions(tenantId);
    const q = list.find((item) => item.id === questionId);
    if (q) {
      q.status = status;
      q.updated_at = new Date().toISOString();

      // Async persist to MongoDB
      import("./mongo").then(({ getMongoDb }) => {
        getMongoDb().then((mongo) => {
          if (mongo) {
            mongo.collection("unanswered_questions").updateOne(
              { id: questionId },
              { $set: { status, updated_at: q.updated_at } }
            ).catch(console.error);
          }
        });
      });

      return true;
    }
    return false;
  }

  // Query logs
  getQueryLogs(tenantId: string): QueryLog[] {
    return this.queryLogs.get(tenantId) || [];
  }

  addQueryLog(log: Omit<QueryLog, "id" | "created_at">): QueryLog {
    const list = this.queryLogs.get(log.tenant_id) || [];
    const newLog: QueryLog = {
      ...log,
      id: `ql-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    list.unshift(newLog);
    this.queryLogs.set(log.tenant_id, list);

    // Async persist to MongoDB
    import("./mongo").then(({ getMongoDb }) => {
      getMongoDb().then((mongo) => {
        if (mongo) {
          mongo.collection("query_logs").insertOne(newLog).catch(console.error);
        }
      });
    });

    return newLog;
  }
}

// Global singleton for Next.js hot reload safety
const globalForDb = globalThis as unknown as { dbStore?: DatabaseStore };
export const db = globalForDb.dbStore || new DatabaseStore();
if (process.env.NODE_ENV !== "production") globalForDb.dbStore = db;
