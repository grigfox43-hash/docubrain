"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  FileText,
  Trash2,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertCircle,
  Upload,
  X,
  Sparkles,
  Search,
} from "lucide-react";
import { DocumentRecord } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function KnowledgeBasePage() {
  const { t, language } = useTranslation();
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [notionModalOpen, setNotionModalOpen] = useState(false);
  const [selectedDocChunks, setSelectedDocChunks] = useState<DocumentRecord | null>(null);

  // New Doc Form
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocContent, setNewDocContent] = useState("");
  const [newDocSourceType, setNewDocSourceType] = useState<"pdf" | "docx" | "notion" | "manual">("pdf");
  const [uploading, setUploading] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  const fetchDocs = async () => {
    try {
      const res = await fetch("/api/documents?tenant_id=tenant-demo-acme");
      const data = await res.json();
      if (data.documents) {
        setDocuments(data.documents);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // Escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setUploadModalOpen(false);
        setNotionModalOpen(false);
        setSelectedDocChunks(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(language === "en" ? `Delete document "${title}" and all vector chunks?` : `Удалить документ "${title}" и все связанные векторные фрагменты?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/documents/${id}?tenant_id=tenant-demo-acme`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDocuments(documents.filter((d) => d.id !== id));
        setActionMessage(language === "en" ? `Document "${title}" and vectors deleted.` : `Документ "${title}" и векторы успешно удалены.`);
        setTimeout(() => setActionMessage(""), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReindex = async (id: string) => {
    try {
      setActionMessage(language === "en" ? "Reindexing chunks via Google Gemini Embedding..." : "Переиндексация фрагментов через Google Gemini Embedding...");
      const res = await fetch(`/api/documents/${id}/reindex?tenant_id=tenant-demo-acme`, {
        method: "POST",
      });
      const data = await res.json();
      setActionMessage(data.message || (language === "en" ? "Reindexed successfully." : "Успешно переиндексировано."));
      setTimeout(() => setActionMessage(""), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim() || !newDocContent.trim()) return;

    setUploading(true);
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenant_id: "tenant-demo-acme",
          title: newDocTitle.trim(),
          content: newDocContent.trim(),
          source_type: newDocSourceType,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Ошибка загрузки");
        return;
      }

      setDocuments([data.document, ...documents]);
      setUploadModalOpen(false);
      setNewDocTitle("");
      setNewDocContent("");
      setActionMessage(data.message || (language === "en" ? "Document indexed successfully!" : "Документ добавлен и проиндексирован!"));
      setTimeout(() => setActionMessage(""), 4000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const filteredDocs = documents.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight">
            {t.app.knowledgeBase}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {language === "en"
              ? "Uploaded regulations, handbooks and SOPs. Bot answers strictly based on these texts."
              : "Загруженные регламенты, политики и стандарты. Бот отвечает сотрудникам строго по этим текстам."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNotionModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium transition-colors"
          >
            <span className="font-bold text-xs">N</span>
            <span>{t.app.connectNotion}</span>
          </button>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold shadow-md shadow-indigo-700/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t.app.uploadDoc}</span>
          </button>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === "en" ? "Search documents by title..." : "Поиск по названию документа..."}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161922] text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {/* Documents Table */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-sm text-gray-500">
            {language === "en" ? "Loading knowledge base..." : "Загрузка базы знаний..."}
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-base text-gray-900 dark:text-white">
              {language === "en" ? "No uploaded regulations yet" : "Нет загруженных регламентов"}
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              {language === "en"
                ? "Upload your first SOP or handbook so the bot can begin answering employee questions."
                : "Загрузите первый регламент или инструкцию, чтобы бот начал отвечать на вопросы сотрудников."}
            </p>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-indigo-700 text-white text-xs font-medium inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.app.uploadDoc}</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">{language === "en" ? "Document Title" : "Название документа"}</th>
                  <th className="py-3.5 px-6">{language === "en" ? "Type" : "Тип"}</th>
                  <th className="py-3.5 px-6">{language === "en" ? "Status" : "Статус"}</th>
                  <th className="py-3.5 px-6">{language === "en" ? "Chunks" : "Фрагменты (Chunks)"}</th>
                  <th className="py-3.5 px-6">{language === "en" ? "Date" : "Дата загрузки"}</th>
                  <th className="py-3.5 px-6 text-right">{language === "en" ? "Actions" : "Действия"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span className="truncate max-w-md">{doc.title}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {doc.source_type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {doc.status === "indexed" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {language === "en" ? "Indexed" : "Проиндексирован"}
                        </span>
                      ) : doc.status === "processing" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          {language === "en" ? "Processing" : "Обрабатывается"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {language === "en" ? "Error" : "Ошибка"}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-gray-600 dark:text-gray-300">
                      {doc.chunk_count} {language === "en" ? "chunks" : "фрагментов"}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(doc.created_at)}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => setSelectedDocChunks(doc)}
                        title="Просмотр фрагментов"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReindex(doc.id)}
                        title="Переиндексировать эмбеддинги"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id, doc.title)}
                        title="Удалить документ и векторы"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL 1: Upload Document (Closes on backdrop click & ESC) */}
      {uploadModalOpen && (
        <div
          onClick={() => setUploadModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-600" />
                {language === "en" ? "Upload New Regulation" : "Добавление нового регламента"}
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  {language === "en" ? "Document Title" : "Название документа / Регламента"}
                </label>
                <input
                  type="text"
                  required
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder={language === "en" ? "e.g. Travel & Taxi Policy 2026" : "Например: Правила компенсации такси и командировок 2026"}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  {language === "en" ? "Format" : "Формат источника"}
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setNewDocSourceType("pdf")}
                    className={`py-2 px-3 rounded-lg border font-medium ${
                      newDocSourceType === "pdf"
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewDocSourceType("docx")}
                    className={`py-2 px-3 rounded-lg border font-medium ${
                      newDocSourceType === "docx"
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    Word DOCX
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewDocSourceType("manual")}
                    className={`py-2 px-3 rounded-lg border font-medium ${
                      newDocSourceType === "manual"
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    Markdown / Text
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  {language === "en" ? "Document Content" : "Содержимое документа"}
                </label>
                <textarea
                  rows={8}
                  required
                  value={newDocContent}
                  onChange={(e) => setNewDocContent(e.target.value)}
                  placeholder={
                    language === "en"
                      ? "Paste policy text. It will be segmented into semantic chunks and vectorized via Google Gemini..."
                      : "Вставьте текст регламента или политики компании. Текст будет автоматически разбит на смысловые фрагменты (chunks) и векторизован с помощью Google Gemini..."
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50"
                >
                  {language === "en" ? "Cancel" : "Отмена"}
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white text-sm font-semibold shadow-md flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{language === "en" ? "Indexing..." : "Индексация..."}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{language === "en" ? "Chunk & Index" : "Разбить и индексировать"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Notion Connect Flow (Closes on backdrop click & ESC) */}
      {notionModalOpen && (
        <div
          onClick={() => setNotionModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs font-bold">
                  N
                </span>
                {language === "en" ? "Connect Notion Workspace" : "Подключение Notion Workspace"}
              </h3>
              <button
                onClick={() => setNotionModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === "en"
                ? "DocuBrain synchronizes selected pages from your Notion workspace via secure OAuth."
                : "DocuBrain синхронизирует страницы базы знаний вашей команды из Notion через защищённый OAuth протокол."}
            </p>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2 text-xs">
              <div className="font-semibold text-gray-900 dark:text-white">
                {language === "en" ? "Available pages for sync:" : "Доступные страницы для выбора:"}
              </div>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                <span>📘 Onboarding Handbook (HR Team)</span>
              </label>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                <span>🔒 Security & Passwords Guide</span>
              </label>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                <input type="checkbox" className="rounded text-indigo-600" />
                <span>💰 Expenses & Travel Policy</span>
              </label>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                onClick={() => setNotionModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm"
              >
                {language === "en" ? "Close" : "Закрыть"}
              </button>
              <button
                onClick={() => {
                  setNotionModalOpen(false);
                  setActionMessage(language === "en" ? "Notion Workspace synchronized." : "Синхронизация с Notion Workspace успешно настроена.");
                  setTimeout(() => setActionMessage(""), 4000);
                }}
                className="px-4 py-2 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-800"
              >
                {language === "en" ? "Sync Selected" : "Синхронизировать выбранные"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: View Chunks Preview (Closes on backdrop click & ESC) */}
      {selectedDocChunks && (
        <div
          onClick={() => setSelectedDocChunks(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 shrink-0">
              <div>
                <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">
                  {language === "en" ? "Vector Chunks:" : "Векторные фрагменты:"} {selectedDocChunks.title}
                </h3>
                <span className="text-xs text-gray-500">
                  {language === "en" ? "Total chunks:" : "Всего"} {selectedDocChunks.chunks?.length || 0} (tenant_id isolated)
                </span>
              </div>
              <button
                onClick={() => setSelectedDocChunks(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {selectedDocChunks.chunks?.map((chunk, idx) => (
                <div
                  key={chunk.id || idx}
                  className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/80 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] text-indigo-600 dark:text-indigo-400 font-mono font-semibold">
                    <span>Chunk #{chunk.chunk_index + 1}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-normal">
                      Embedding: Google Gemini 3072-dim
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-mono text-[11px] leading-relaxed">
                    {chunk.chunk_text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
