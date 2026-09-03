import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-6">
          Условия использования сервиса DocuBrain
        </h1>
        <div className="prose dark:prose-invert text-sm text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
          <p>
            Настоящие Условия регулируют использование корпоративного RAG-сервиса DocuBrain («Сервис»), предоставляемого клиентам на условиях SaaS-подписки или лицензии On-Premises.
          </p>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mt-6">
            1. Изоляция и владение данными
          </h2>
          <p>
            Все права на загруженные документы, корпоративные регламенты и базы знаний принадлежат исключительно компании-клиенту. DocuBrain не приобретает прав интеллектуальной собственности на данные клиента.
          </p>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mt-6">
            2. Обязательства безопасности
          </h2>
          <p>
            DocuBrain обязуется поддерживать программную и векторную изоляцию данных каждой организации (tenant_id), шифровать токены мессенджеров и не использовать загруженные данные для открытого обучения глобальных языковых моделей.
          </p>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mt-6">
            3. Лицензия On-Premises
          </h2>
          <p>
            При приобретении On-Premises версии клиент получает неисключительную бессрочную лицензию на развертывание программного контейнера в своей инфраструктуре без права сублицензирования третьим лицам.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
