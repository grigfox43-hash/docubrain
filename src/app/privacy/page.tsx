import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-6">
          Политика конфиденциальности и обработки данных
        </h1>
        <div className="prose dark:prose-invert text-sm text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
          <p>
            Настоящая политика описывает, как DocuBrain обрабатывает, хранит и защищает корпоративные данные при использовании RAG-ассистента в Slack и Telegram.
          </p>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mt-6">
            1. Данные, подлежащие обработке
          </h2>
          <p>
            Сервис обрабатывает текст загруженных регламентов компании исключительно с целью генерации семантических эмбеддингов и выборки релевантных контекстов в ответ на вопросы сотрудников.
          </p>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mt-6">
            2. Хранение и изоляция векторов
          </h2>
          <p>
            Векторные представления документов сохраняются в изолированных коллекциях векторной базы данных Qdrant с фильтрацией по уникальному идентификатору компании (tenant_id).
          </p>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mt-6">
            3. Удаление данных (Право на забвение)
          </h2>
          <p>
            При удалении документа пользователем-администратором все связанные векторные фрагменты немедленно и безвозвратно удаляются из индекса.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
