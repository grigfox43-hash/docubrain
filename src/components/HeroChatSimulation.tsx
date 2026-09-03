"use client";

import { useState, useEffect, useRef } from "react";
import {
  Send,
  FileText,
  CheckCircle2,
  Shield,
  Bot,
  User,
  Hash,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  sourceDoc?: string;
  sourceSection?: string;
  wasAnswered?: boolean;
  time: string;
}

export function HeroChatSimulation() {
  const { t, language } = useTranslation();
  const [platform, setPlatform] = useState<"slack" | "telegram">("slack");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    setTimeout(() => {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTo({
          top: chatScrollRef.current.scrollHeight,
          behavior,
        });
      }
    }, 50);
  };

  // Pre-fill initial dialogue on load
  useEffect(() => {
    const initial: ChatMessage[] = [
      {
        id: "msg-1",
        sender: "user",
        text:
          language === "en"
            ? "Hi! If I'm sick for 1 day, do I need to get an official doctor's note?"
            : "Привет! Если я заболел на 1 день, мне нужно обязательно оформлять больничный у врача?",
        time: "10:14",
      },
      {
        id: "msg-2",
        sender: "bot",
        text:
          language === "en"
            ? "No, a doctor's note is not required. The company provides up to 4 days per year (Sick Days) without a formal doctor's certificate.\n\nJust notify your team lead and set your status to 🤒 in Slack #general before 10:00 AM."
            : "Нет, оформлять больничный лист не требуется. Компания предоставляет до 4 дней в год (Sick Days / Дни здоровья) без больничного листа.\n\nДо 10:00 напишите тимлиду и поставьте статус 🤒 в Slack в канале #general.",
        sourceDoc:
          language === "en"
            ? "Vacations & Sick Leave Policy 2026"
            : "Регламент отпусков и больничных 2026",
        sourceSection: language === "en" ? "Section 2. Sick Days" : "Раздел 2. Дни здоровья без больничного",
        wasAnswered: true,
        time: "10:14",
      },
      {
        id: "msg-3",
        sender: "user",
        text:
          language === "en"
            ? "Can I take 20 consecutive days of vacation in summer?"
            : "А можно ли взять 20 дней отпуска подряд летом?",
        time: "10:16",
      },
      {
        id: "msg-4",
        sender: "bot",
        text:
          language === "en"
            ? "Yes, you can. Annual paid leave is 28 calendar days. The key requirement: at least one part of the vacation must be 14+ consecutive days. Submit your request 14 working days in advance via the HR portal."
            : "Да, можно. Общий оплачиваемый отпуск составляет 28 дней. Главное условие регламента: одна из частей отпуска должна быть не менее 14 дней подряд. Заявление необходимо подать за 14 рабочих дней через HR-портал.",
        sourceDoc:
          language === "en"
            ? "Vacations & Sick Leave Policy 2026"
            : "Регламент отпусков и больничных 2026",
        sourceSection: language === "en" ? "Section 1. Annual Paid Leave" : "Раздел 1. Ежегодный оплачиваемый отпуск",
        wasAnswered: true,
        time: "10:16",
      },
    ];

    setMessages(initial);
    scrollToBottom("auto");
  }, [language]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputVal).trim();
    if (!textToSend || isBotTyping) return;

    // 1. Immediately clear input so the user sees action
    setInputVal("");

    // 2. Append user message to chat
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsBotTyping(true);
    scrollToBottom();

    // 3. Send query to RAG API with Google Gemini
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: textToSend,
          channel_type: platform,
        }),
      });

      const data = await res.json();

      const matchedDoc = data.matched_chunks?.[0]?.document_title;
      const scorePct = data.relevance_score
        ? `${Math.round(data.relevance_score * 100)}%`
        : "85%";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.answer || (language === "en" ? "Answer received." : "Ответ получен."),
        sourceDoc: matchedDoc || (data.was_answered ? (language === "en" ? "Knowledge Base" : "Регламенты компании") : undefined),
        sourceSection: data.was_answered
          ? `RAG Match (${scorePct})`
          : (language === "en" ? "Forwarded to HR" : "Передано HR"),
        wasAnswered: data.was_answered,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text:
          language === "en"
            ? "Failed to connect to the knowledge base. Please try again."
            : "Не удалось получить ответ от сервера. Пожалуйста, попробуйте еще раз.",
        wasAnswered: false,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsBotTyping(false);
      scrollToBottom();
    }
  };

  const quickQuestions =
    language === "en"
      ? [
          "What is the annual education budget?",
          "How do I request a new MacBook or laptop?",
          "How many sick days without a doctor's note?",
        ]
      : [
          "Какой размер бюджета на обучение в год?",
          "Какая техника выдается новичку?",
          "Сколько дней Sick Leave можно без справки?",
        ];

  return (
    <div id="demo" className="w-full max-w-2xl mx-auto scroll-mt-28">
      {/* Simulation Window Container */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] shadow-2xl overflow-hidden transition-all">
        {/* Window Top Bar with Platform Switcher */}
        <div className="px-5 py-3.5 bg-gray-50/90 dark:bg-[#12151D] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
            <span className="ml-2 text-xs font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
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

          <div className="flex items-center p-0.5 rounded-lg bg-gray-200/70 dark:bg-gray-800 text-xs font-semibold">
            <button
              onClick={() => setPlatform("slack")}
              className={`px-3 py-1 rounded-md transition-all ${
                platform === "slack"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Slack App
            </button>
            <button
              onClick={() => setPlatform("telegram")}
              className={`px-3 py-1 rounded-md transition-all ${
                platform === "telegram"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Telegram
            </button>
          </div>
        </div>

        {/* Chat Stream (Scrollable container) */}
        <div
          ref={chatScrollRef}
          className="p-5 space-y-4 h-[380px] overflow-y-auto bg-gray-50/40 dark:bg-[#131620] scroll-smooth"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                msg.sender === "user" ? "" : ""
              }`}
            >
              {msg.sender === "user" ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {language === "en" ? "You" : "Вы (Сотрудник)"}
                      </span>
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                    </div>
                    <div className="mt-1 p-3 rounded-2xl rounded-tl-sm bg-white dark:bg-[#1E2330] border border-gray-100 dark:border-gray-800 text-sm text-gray-800 dark:text-gray-200 shadow-xs inline-block max-w-[90%]">
                      {msg.text}
                    </div>
                  </div>
                </>
              ) : (
                <>
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
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl rounded-tl-sm border text-sm leading-relaxed shadow-xs whitespace-pre-line ${
                        msg.wasAnswered === false
                          ? "bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200"
                          : "bg-indigo-50/50 dark:bg-[#191D28] border-indigo-100/80 dark:border-indigo-900/40 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {msg.text}

                      {/* Source attribution pill */}
                      {msg.sourceDoc && (
                        <div className="mt-3 pt-2.5 border-t border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between text-xs text-indigo-900/80 dark:text-indigo-300">
                          <span className="flex items-center gap-1.5 font-medium truncate max-w-[260px]">
                            <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            <span className="truncate">{msg.sourceDoc}</span>
                          </span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0 font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            {msg.sourceSection || "RAG Verified"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isBotTyping && (
            <div className="flex items-start gap-3 animate-in fade-in duration-200">
              <div className="w-8 h-8 rounded-full bg-indigo-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/40 flex items-center gap-2 text-xs text-indigo-700 dark:text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>
                  {language === "en"
                    ? "DocuBrain searching company regulations & synthesizing answer..."
                    : "DocuBrain ищет в регламентах компании и формирует ответ..."}
                </span>
                <span className="flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dot-pulse-1" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dot-pulse-2" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dot-pulse-3" />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Question Pills */}
        <div className="px-4 py-2 bg-gray-50/70 dark:bg-[#141722] border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 overflow-x-auto text-[11px] text-gray-500 no-scrollbar">
          <span className="font-semibold text-gray-400 shrink-0 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            {language === "en" ? "Try asking:" : "Примеры вопросов:"}
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0 truncate max-w-[210px]"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Real Interactive Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white dark:bg-[#161922] border-t border-gray-200 dark:border-gray-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={
              language === "en"
                ? "Ask a real question (e.g. 'What is the education budget?')"
                : "Задайте реальный вопрос боту (например: 'Какой бюджет на обучение?')"
            }
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400"
          />
          <button
            type="submit"
            disabled={isBotTyping || !inputVal.trim()}
            className="px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white text-sm font-semibold flex items-center gap-1.5 transition-all shadow-md shrink-0"
          >
            {isBotTyping ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{language === "en" ? "Ask" : "Спросить"}</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Trust pill under simulation */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          {t.hero.trust1}
        </span>
        <span>•</span>
        <span>{t.hero.trust2}</span>
        <span>•</span>
        <span>{t.hero.trust3}</span>
      </div>
    </div>
  );
}
