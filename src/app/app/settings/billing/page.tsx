"use client";

import { useState } from "react";
import { CreditCard, Check, Sparkles, Server, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function BillingSettingsPage() {
  const [currentPlan, setCurrentPlan] = useState<"team" | "scale" | "on_premises">("team");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handlePlanChange = async (newPlan: "team" | "scale") => {
    setLoading(true);
    setSuccessMsg("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: newPlan,
          tenant_id: "tenant-demo-acme",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentPlan(newPlan);
        setSuccessMsg(`Тариф успешно изменен на ${newPlan.toUpperCase()}! Доступны все расширенные функции.`);
        setTimeout(() => setSuccessMsg(""), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight">
          Тариф и управление подпиской
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Управление лимитами документов, подключенными каналами и переходом на On-Premises.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Current Plan Overview Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Текущий тариф организации:
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
              {currentPlan.toUpperCase()}
            </span>
          </div>

          <div className="mt-2 text-2xl font-heading font-extrabold text-gray-900 dark:text-white flex items-baseline gap-2">
            <span>{currentPlan === "scale" ? "$249 / месяц" : "$99 / месяц"}</span>
            <span className="text-xs font-normal text-gray-400">
              (Следующее списание: 3 октября 2026)
            </span>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {currentPlan === "scale"
              ? "Без лимита документов • Slack + Telegram • Глубокие инсайты включены"
              : "До 50 документов • 1 канал (Slack или Telegram) • Базовая аналитика"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentPlan === "team" ? (
            <button
              onClick={() => handlePlanChange("scale")}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Перейти на Scale ($249)</span>
            </button>
          ) : (
            <button
              onClick={() => handlePlanChange("team")}
              disabled={loading}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50"
            >
              Переключить на Team
            </button>
          )}
        </div>
      </div>

      {/* Plan Switcher Grid (Spec Section 5.5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Team Card */}
        <div
          className={`p-6 rounded-2xl border transition-all ${
            currentPlan === "team"
              ? "border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20 shadow-md"
              : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922]"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">Team</h3>
            {currentPlan === "team" && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-bold uppercase">
                Текущий
              </span>
            )}
          </div>
          <div className="font-heading font-extrabold text-2xl text-gray-900 dark:text-white mb-3">
            $99<span className="text-xs font-normal text-gray-500">/мес</span>
          </div>
          <ul className="text-xs space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              До 50 документов
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              1 канал (Slack ИЛИ Telegram)
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Базовый список пробелов
            </li>
          </ul>

          {currentPlan !== "team" && (
            <button
              onClick={() => handlePlanChange("team")}
              className="w-full py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold hover:bg-gray-50"
            >
              Выбрать Team
            </button>
          )}
        </div>

        {/* Scale Card */}
        <div
          className={`p-6 rounded-2xl border transition-all ${
            currentPlan === "scale"
              ? "border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20 shadow-md"
              : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922]"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">Scale</h3>
            {currentPlan === "scale" && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-bold uppercase">
                Текущий
              </span>
            )}
          </div>
          <div className="font-heading font-extrabold text-2xl text-gray-900 dark:text-white mb-3">
            $249<span className="text-xs font-normal text-gray-500">/мес</span>
          </div>
          <ul className="text-xs space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li className="flex items-center gap-1.5 font-medium text-indigo-900 dark:text-indigo-300">
              <Check className="w-3.5 h-3.5 text-indigo-600" />
              Slack И Telegram одновременно
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Без строгого лимита документов
            </li>
            <li className="flex items-center gap-1.5 font-medium text-indigo-900 dark:text-indigo-300">
              <Check className="w-3.5 h-3.5 text-indigo-600" />
              Глубокая аналитика трендов (Insights)
            </li>
          </ul>

          {currentPlan !== "scale" && (
            <button
              onClick={() => handlePlanChange("scale")}
              className="w-full py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold shadow-sm"
            >
              Перейти на Scale
            </button>
          )}
        </div>

        {/* On-Premises Card */}
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-heading font-bold text-lg text-emerald-600 dark:text-emerald-400">
              On-Premises
            </h3>
          </div>
          <div className="font-heading font-extrabold text-2xl text-gray-900 dark:text-white mb-3">
            $1 500<span className="text-xs font-normal text-gray-500"> разово</span>
          </div>
          <ul className="text-xs space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Docker Compose: Qdrant + Postgres
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Данные не покидают ваш сервер
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Оплата по счёту / договору
            </li>
          </ul>

          <Link
            href="/contact-sales?topic=on_premises"
            className="w-full inline-flex items-center justify-center py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
          >
            Запросить деплой On-Premises
          </Link>
        </div>
      </div>
    </div>
  );
}
