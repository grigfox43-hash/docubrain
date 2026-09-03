"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Upload,
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  Layers,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { UnansweredQuestion } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AnalyticsPage() {
  const [questions, setQuestions] = useState<UnansweredQuestion[]>([]);
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("open");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const res = await fetch("/api/analytics/unanswered?tenant_id=tenant-demo-acme");
      const data = await res.json();
      if (data.questions) {
        setQuestions(data.questions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: "open" | "resolved") => {
    const nextStatus = currentStatus === "open" ? "resolved" : "open";
    try {
      await fetch("/api/analytics/unanswered", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenant_id: "tenant-demo-acme",
          question_id: id,
          status: nextStatus,
        }),
      });

      setQuestions(
        questions.map((q) => (q.id === id ? { ...q, status: nextStatus } : q))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = questions.filter((q) => {
    if (filter !== "all" && q.status !== filter) return false;
    if (search && !q.question_text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const openCount = questions.filter((q) => q.status === "open").length;
  const resolvedCount = questions.filter((q) => q.status === "resolved").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight">
            Аналитика базы знаний & Пробелы
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Вопросы, на которые бот не смог найти точного ответа в регламентах. Это прямой сигнал HR о пробелах.
          </p>
        </div>

        <Link
          href="/app/knowledge-base"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-medium shadow-sm transition-colors shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Добавить регламент</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-xs">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Открытые пробелы в регламентах
          </div>
          <div className="mt-2 text-3xl font-heading font-extrabold text-amber-600 dark:text-amber-400">
            {openCount}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Сотрудники спрашивали, но регламент отсутствует
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-xs">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Закрытые вопросы
          </div>
          <div className="mt-2 text-3xl font-heading font-extrabold text-emerald-600 dark:text-emerald-400">
            {resolvedCount}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            HR добавил документ или инструкцию
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-xs">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Покрытие базы знаний
          </div>
          <div className="mt-2 text-3xl font-heading font-extrabold text-indigo-600 dark:text-indigo-400">
            91.4%
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Доля вопросов, отвеченных со score &gt; 0.75
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs w-full sm:w-auto">
          <button
            onClick={() => setFilter("open")}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              filter === "open"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs font-semibold"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
            }`}
          >
            Открытые ({openCount})
          </button>
          <button
            onClick={() => setFilter("resolved")}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              filter === "resolved"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs font-semibold"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
            }`}
          >
            Решённые ({resolvedCount})
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              filter === "all"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs font-semibold"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
            }`}
          >
            Все ({questions.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по вопросу..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161922] text-xs text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      {/* Unanswered Questions Table */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] overflow-hidden shadow-xs">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-500 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <div className="font-semibold text-gray-900 dark:text-white">
              Нет неотвеченных вопросов по данному фильтру!
            </div>
            <p className="text-xs text-gray-400">
              База знаний компании полностью закрывает все текущие запросы сотрудников.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Вопрос сотрудника</th>
                  <th className="py-3.5 px-6">Частота (запросов)</th>
                  <th className="py-3.5 px-6">Дата фиксации</th>
                  <th className="py-3.5 px-6">Статус</th>
                  <th className="py-3.5 px-6 text-right">Действие HR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white max-w-md">
                      {item.question_text}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                        {item.frequency} раз
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="py-4 px-6">
                      {item.status === "open" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Открыт (пробел)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Решён
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(item.id, item.status)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                          item.status === "open"
                            ? "border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                            : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100"
                        }`}
                      >
                        {item.status === "open" ? "Отметить решённым" : "Вернуть в открытые"}
                      </button>
                      <Link
                        href="/app/knowledge-base"
                        className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 font-medium inline-block"
                      >
                        Загрузить регламент
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
