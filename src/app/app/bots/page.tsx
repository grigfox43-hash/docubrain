"use client";

import { useState, useEffect } from "react";
import {
  Bot,
  Hash,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Shield,
  Send,
  Lock,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

export default function BotsPage() {
  const [tenantPlan, setTenantPlan] = useState<"team" | "scale" | "on_premises">("team");
  const [slackConnected, setSlackConnected] = useState(true);
  const [slackTeamName, setSlackTeamName] = useState("Acme Team Workspace");

  const [telegramToken, setTelegramToken] = useState("");
  const [telegramConnected, setTelegramConnected] = useState(true);
  const [telegramUsername, setTelegramUsername] = useState("acme_docubrain_bot");
  const [telegramLoading, setTelegramLoading] = useState(false);
  const [telegramError, setTelegramError] = useState("");
  const [testAnswer, setTestAnswer] = useState<string | null>(null);

  const [manifestModalOpen, setManifestModalOpen] = useState(false);
  const [manifestJson, setManifestJson] = useState("");

  useEffect(() => {
    fetch("/api/bots/slack")
      .then((r) => r.json())
      .then((data) => setManifestJson(JSON.stringify(data, null, 2)))
      .catch(() => {});
  }, []);

  const handleConnectTelegram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegramToken.trim()) return;

    setTelegramLoading(true);
    setTelegramError("");
    try {
      const res = await fetch("/api/bots/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify_token",
          token: telegramToken.trim(),
          tenant_id: "tenant-demo-acme",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setTelegramError(data.error || "Не удалось проверить токен");
        return;
      }

      setTelegramConnected(true);
      setTelegramUsername(data.username);
      setTelegramToken("");
    } catch (err: any) {
      setTelegramError(err.message);
    } finally {
      setTelegramLoading(false);
    }
  };

  const handleSendTestQuery = async () => {
    setTestAnswer(null);
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: "Как оформить больничный лист или Sick Day?",
          channel_type: "telegram",
        }),
      });
      const data = await res.json();
      setTestAnswer(data.answer);
    } catch {
      setTestAnswer("Ошибка соединения с тестовым ботом.");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight">
          Подключение ботов к мессенджерам
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Точки входа для ваших сотрудников в Slack и Telegram. Токены шифруются по стандарту AES-256.
        </p>
      </div>

      {/* Plan limitation banner if on Team */}
      {tenantPlan === "team" && (
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
              <Lock className="w-4 h-4" />
            </span>
            <div className="text-xs text-gray-700 dark:text-gray-300">
              <strong>Тариф Team ($99):</strong> позволяет одновременно подключить только 1 активный канал.
              Для работы в Slack и Telegram одновременно обновитесь до <strong>Scale ($249)</strong>.
            </div>
          </div>
          <Link
            href="/app/settings/billing"
            className="px-3.5 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold shrink-0"
          >
            Улучшить до Scale
          </Link>
        </div>
      )}

      {/* Two Integrations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CARD 1: SLACK */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#4A154B]/10 dark:bg-[#4A154B]/30 text-[#4A154B] dark:text-purple-300 flex items-center justify-center font-bold">
                <Hash className="w-6 h-6" />
              </div>
              {slackConnected ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Активен
                </span>
              ) : (
                <span className="text-xs text-gray-400">Не подключен</span>
              )}
            </div>

            <div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                Slack Workspace App
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Интеграция с корпоративным пространством Slack. Доступ через упоминание <code>@DocuBrain</code> в каналах или слэш-команду <code>/docubrain</code>.
              </p>
            </div>

            {slackConnected ? (
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/60 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                  <span>Рабочее пространство:</span>
                  <strong className="text-gray-900 dark:text-white">{slackTeamName}</strong>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                  <span>Токен бота:</span>
                  <span className="font-mono text-gray-500">xoxb-918...9a41 (AES)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                  <span>Режим:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Events API Webhook
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            {slackConnected ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setManifestModalOpen(true)}
                  className="flex-1 py-2 px-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-200 flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Slack Manifest JSON</span>
                </button>
                <button
                  onClick={() => setSlackConnected(false)}
                  className="py-2 px-3 rounded-xl border border-red-200 dark:border-red-900 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
                >
                  Отключить
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSlackConnected(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-medium text-xs shadow-sm flex items-center justify-center gap-2"
              >
                <span>Подключить Slack App Manifest</span>
              </button>
            )}
          </div>
        </div>

        {/* CARD 2: TELEGRAM */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">
                <Bot className="w-6 h-6" />
              </div>
              {telegramConnected ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Активен
                </span>
              ) : (
                <span className="text-xs text-gray-400">Не подключен</span>
              )}
            </div>

            <div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                Telegram Bot API
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Сотрудники задают вопросы боту в Telegram. Поддерживаются личные чаты и корпоративные рабочие группы.
              </p>
            </div>

            {telegramConnected ? (
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/60 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                  <span>Имя бота:</span>
                  <strong className="text-sky-600 dark:text-sky-400">@{telegramUsername}</strong>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                  <span>Статус Webhook:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Слушает /api/bots/telegram
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                  <span>Шифрование:</span>
                  <span className="font-mono text-gray-500">AES-256 pgcrypto</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConnectTelegram} className="space-y-3">
                {telegramError && (
                  <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 text-xs">
                    {telegramError}
                  </div>
                )}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    Bot Token от @BotFather:
                  </label>
                  <input
                    type="text"
                    required
                    value={telegramToken}
                    onChange={(e) => setTelegramToken(e.target.value)}
                    placeholder="Например: 7918234812:AAH..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={telegramLoading}
                  className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-medium text-xs shadow-sm flex items-center justify-center gap-1.5"
                >
                  {telegramLoading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span>Сохранить и проверить Bot Token</span>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
            {telegramConnected && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendTestQuery}
                  className="flex-1 py-2 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 text-sky-700 dark:text-sky-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Отправить тестовый вопрос</span>
                </button>
                <button
                  onClick={() => setTelegramConnected(false)}
                  className="py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500 hover:text-red-600"
                >
                  Сменить
                </button>
              </div>
            )}

            {testAnswer && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-gray-800 dark:text-gray-200 leading-relaxed animate-in fade-in">
                <strong className="text-emerald-700 dark:text-emerald-300 block mb-1">
                  Ответ бота в Telegram:
                </strong>
                {testAnswer}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: Slack Manifest View */}
      {manifestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">
                Slack App Manifest (JSON)
              </h3>
              <button
                onClick={() => setManifestModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Скопируйте этот JSON в Slack API Console (<a href="https://api.slack.com/apps" target="_blank" className="text-indigo-600 underline">Create New App → From an app manifest</a>) для мгновенной установки:
            </p>
            <pre className="p-4 rounded-xl bg-gray-950 text-gray-200 font-mono text-xs overflow-y-auto flex-1 leading-relaxed">
              {manifestJson}
            </pre>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(manifestJson);
                  alert("Manifest скопирован в буфер обмена!");
                }}
                className="px-4 py-2 rounded-xl bg-indigo-700 text-white text-xs font-semibold"
              >
                Скопировать в буфер
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
