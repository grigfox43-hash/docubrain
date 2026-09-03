"use client";

import { useState } from "react";
import { Lock, Sparkles, TrendingUp, BarChart, Layers, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function InsightsPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight">
              Глубокие инсайты базы знаний
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
              Scale Only
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Анализ трендов, кластеризация тем и тепловая карта пробелов в корпоративных регламентах.
          </p>
        </div>

        {/* Quick Demo Switcher */}
        <button
          onClick={() => setIsUnlocked(!isUnlocked)}
          className="text-xs text-indigo-600 dark:text-indigo-400 underline font-medium"
        >
          {isUnlocked ? "Смоделировать вид тарифа Team (Locked)" : "Смоделировать вид тарифа Scale (Unlocked)"}
        </button>
      </div>

      {/* Main Analytics Container with Overlay if locked */}
      <div className="relative">
        {/* The Actual Insights Dashboard Content */}
        <div className={`space-y-6 transition-all duration-300 ${!isUnlocked ? "blur-md select-none pointer-events-none opacity-60" : ""}`}>
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Top Question Topics */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center justify-between">
                <span>Топ тем вопросов сотрудников</span>
                <span className="text-xs font-normal text-gray-400">за 30 дней</span>
              </h3>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                    <span>Отпуска, Day Off и больничные</span>
                    <span>38% (142 вопроса)</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full w-[38%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                    <span>Компенсация спорта, обучения и техники</span>
                    <span>27% (101 вопрос)</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-[27%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                    <span>Информационная безопасность и 2FA/VPN</span>
                    <span>19% (71 вопрос)</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[19%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                    <span>Парковка и правила офиса (пробел)</span>
                    <span>16% (60 вопросов)</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[16%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 2: Unanswered dynamics */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center justify-between">
                <span>Динамика неотвеченных вопросов (Gaps)</span>
                <span className="text-xs font-normal text-emerald-600">Снижение на 42%</span>
              </h3>

              <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
                {[
                  { week: "Нед 1", count: 28, height: "70%" },
                  { week: "Нед 2", count: 35, height: "88%" },
                  { week: "Нед 3", count: 24, height: "60%" },
                  { week: "Нед 4", count: 18, height: "45%" },
                  { week: "Нед 5", count: 12, height: "30%" },
                  { week: "Нед 6", count: 7, height: "18%" },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-mono text-gray-500">{item.count}</span>
                    <div
                      className="w-full bg-indigo-600/80 hover:bg-indigo-600 rounded-t-lg transition-all"
                      style={{ height: item.height }}
                    />
                    <span className="text-[10px] text-gray-400">{item.week}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blocking Overlay for Team Plan (Spec Section 3.1 & 5.4) */}
        {!isUnlocked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
            <div className="max-w-md w-full p-8 rounded-2xl bg-white dark:bg-[#161922] border-2 border-indigo-600 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-gray-900 dark:text-white">
                Доступно на тарифе Scale ($249/мес)
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Глубокая аналитика пробелов базы знаний, кластеризация частых вопросов и тепловая карта регламентов доступны на тарифе Scale и в On-Premises версии.
              </p>
              <div className="pt-2">
                <Link
                  href="/app/settings/billing"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-sm shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Обновить тариф до Scale</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="text-[11px] text-gray-400">
                Или нажмите кнопку выше для предпросмотра демо-графиков.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
