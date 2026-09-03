"use client";

import { useState, useEffect } from "react";
import { Send, FileText, CheckCircle2, Shield, Bot, User, Hash, Sparkles } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  sourceDoc?: string;
  sourceSection?: string;
  time: string;
}

export function HeroChatSimulation() {
  const [platform, setPlatform] = useState<"slack" | "telegram">("slack");
  const [step, setStep] = useState<number>(0);
  const [inputVal, setInputVal] = useState("");
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Scripted simulation sequence
  const initialMessages: Message[] = [
    {
      sender: "user",
      text: "Привет! Если я заболел на 1 день, мне нужно обязательно оформлять больничный у врача?",
      time: "10:14",
    },
    {
      sender: "bot",
      text: "Нет, оформлять больничный лист не требуется. Компания предоставляет до 4 дней в год (Sick Days / Дни здоровья) без больничного листа.\n\nДо 10:00 напишите тимлиду и поставьте статус 🤒 в Slack в канале #general.",
      sourceDoc: "Регламент отпусков и больничных 2026",
      sourceSection: "Раздел 2. Дни здоровья без больничного",
      time: "10:14",
    },
    {
      sender: "user",
      text: "А можно ли взять 20 дней отпуска подряд летом?",
      time: "10:16",
    },
    {
      sender: "bot",
      text: "Да, можно. Общий оплачиваемый отпуск составляет 28 дней. Главное условие регламента: одна из частей отпуска должна быть не менее 14 дней подряд. Заявление необходимо подать за 14 рабочих дней через HR-портал.",
      sourceDoc: "Регламент отпусков и больничных 2026",
      sourceSection: "Раздел 1. Ежегодный оплачиваемый отпуск",
      time: "10:16",
    },
  ];

  // Staggered reveal effect on load
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600); // user msg 1
    const t2 = setTimeout(() => setStep(2), 1600); // typing bot 1
    const t3 = setTimeout(() => setStep(3), 2800); // bot msg 1
    const t4 = setTimeout(() => setStep(4), 4200); // user msg 2
    const t5 = setTimeout(() => setStep(5), 5200); // typing bot 2
    const t6 = setTimeout(() => setStep(6), 6400); // bot msg 2
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setLoading(true);
    setCustomAnswer(null);
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: inputVal,
          channel_type: platform,
        }),
      });
      const data = await res.json();
      setCustomAnswer(data.answer || "Ответ получен.");
    } catch {
      setCustomAnswer("Не удалось связаться с базой знаний. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Simulation Window Container */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] shadow-xl overflow-hidden transition-all">
        {/* Window Top Bar with Platform Switcher */}
        <div className="px-4 py-3 bg-gray-50/80 dark:bg-[#12151D] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              {platform === "slack" ? (
                <>
                  <Hash className="w-3.5 h-3.5 text-indigo-500" />
                  #onboarding-help (Slack)
                </>
              ) : (
                <>
                  <Bot className="w-3.5 h-3.5 text-sky-500" />
                  @acme_docubrain_bot (Telegram)
                </>
              )}
            </span>
          </div>

          <div className="flex items-center p-0.5 rounded-lg bg-gray-200/70 dark:bg-gray-800 text-xs">
            <button
              onClick={() => setPlatform("slack")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                platform === "slack"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
              }`}
            >
              Slack App
            </button>
            <button
              onClick={() => setPlatform("telegram")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                platform === "telegram"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
              }`}
            >
              Telegram
            </button>
          </div>
        </div>

        {/* Chat Stream */}
        <div className="p-5 space-y-4 min-h-[380px] max-h-[440px] overflow-y-auto bg-gray-50/30 dark:bg-transparent">
          {/* Message 1: User */}
          {step >= 1 && (
            <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">
                    Михаил (Frontend Dev)
                  </span>
                  <span className="text-[10px] text-gray-400">10:14</span>
                </div>
                <div className="mt-1 p-3 rounded-2xl rounded-tl-sm bg-white dark:bg-[#1E2330] border border-gray-100 dark:border-gray-800 text-sm text-gray-800 dark:text-gray-200 shadow-xs inline-block">
                  {initialMessages[0].text}
                </div>
              </div>
            </div>
          )}

          {/* Bot 1 typing */}
          {step === 2 && (
            <div className="flex items-center gap-3 pl-11">
              <div className="px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex items-center gap-1.5 text-xs text-indigo-700 dark:text-indigo-300">
                <Bot className="w-3.5 h-3.5 animate-spin" />
                <span>DocuBrain ищет в регламентах...</span>
                <span className="flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dot-pulse-1" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dot-pulse-2" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dot-pulse-3" />
                </span>
              </div>
            </div>
          )}

          {/* Message 2: Bot 1 */}
          {step >= 3 && (
            <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-8 h-8 rounded-full bg-indigo-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                    DocuBrain Bot
                    <span className="text-[9px] px-1 py-0.2 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded font-medium">
                      APP
                    </span>
                  </span>
                  <span className="text-[10px] text-gray-400">10:14</span>
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-indigo-50/50 dark:bg-[#191D28] border border-indigo-100/80 dark:border-indigo-900/40 text-sm text-gray-800 dark:text-gray-200 leading-relaxed shadow-xs whitespace-pre-line">
                  {initialMessages[1].text}
                  {/* Citation Box */}
                  <div className="mt-3 pt-2.5 border-t border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between text-xs text-indigo-900/80 dark:text-indigo-300">
                    <span className="flex items-center gap-1.5 font-medium truncate">
                      <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      {initialMessages[1].sourceDoc}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Точный RAG (0.94)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Message 3: User 2 */}
          {step >= 4 && (
            <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">
                    Михаил (Frontend Dev)
                  </span>
                  <span className="text-[10px] text-gray-400">10:16</span>
                </div>
                <div className="mt-1 p-3 rounded-2xl rounded-tl-sm bg-white dark:bg-[#1E2330] border border-gray-100 dark:border-gray-800 text-sm text-gray-800 dark:text-gray-200 shadow-xs inline-block">
                  {initialMessages[2].text}
                </div>
              </div>
            </div>
          )}

          {/* Bot 2 typing */}
          {step === 5 && (
            <div className="flex items-center gap-3 pl-11">
              <div className="px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex items-center gap-1.5 text-xs text-indigo-700 dark:text-indigo-300">
                <Bot className="w-3.5 h-3.5 animate-spin" />
                <span>Генерация ответа строго по документам...</span>
              </div>
            </div>
          )}

          {/* Message 4: Bot 2 */}
          {step >= 6 && (
            <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-8 h-8 rounded-full bg-indigo-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">
                    DocuBrain Bot
                  </span>
                  <span className="text-[10px] text-gray-400">10:16</span>
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-indigo-50/50 dark:bg-[#191D28] border border-indigo-100/80 dark:border-indigo-900/40 text-sm text-gray-800 dark:text-gray-200 leading-relaxed shadow-xs whitespace-pre-line">
                  {initialMessages[3].text}
                  <div className="mt-3 pt-2.5 border-t border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between text-xs text-indigo-900/80 dark:text-indigo-300">
                    <span className="flex items-center gap-1.5 font-medium truncate">
                      <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      {initialMessages[3].sourceDoc}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Точный RAG (0.91)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Live custom response if user tested */}
          {customAnswer && (
            <div className="flex items-start gap-3 animate-in fade-in duration-200">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Тестовый ответ RAG (Gemini 3.5)
                </span>
                <div className="mt-1 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-sm text-gray-800 dark:text-gray-200">
                  {customAnswer}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Interactive Test Input */}
        <form
          onSubmit={handleAskQuestion}
          className="p-3 bg-white dark:bg-[#161922] border-t border-gray-200 dark:border-gray-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Задайте реальный вопрос боту (например: 'Какой бюджет на обучение?')"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400"
          />
          <button
            type="submit"
            disabled={loading || !inputVal.trim()}
            className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white text-sm font-medium flex items-center gap-1.5 transition-all shrink-0"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Спросить</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Trust pill under simulation */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          Данные не покидают периметр компании
        </span>
        <span>•</span>
        <span>Строгий фильтр tenant_id</span>
        <span>•</span>
        <span>Без галлюцинаций</span>
      </div>
    </div>
  );
}
