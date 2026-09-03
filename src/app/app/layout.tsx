"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  BrainCircuit,
  BookOpen,
  Bot,
  BarChart3,
  TrendingUp,
  Users,
  CreditCard,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  PlayCircle,
  Sun,
  Moon,
  Building2,
  Lock,
  LogOut,
} from "lucide-react";
import { useTranslation, LanguageSwitcher } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t, language } = useTranslation();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      setIsDark(true);
    }
  };

  const navItems = [
    {
      name: t.app.knowledgeBase,
      href: "/app/knowledge-base",
      icon: BookOpen,
      count: "4",
    },
    {
      name: t.app.bots,
      href: "/app/bots",
      icon: Bot,
      badge: "Slack & TG",
    },
    {
      name: t.app.analytics,
      href: "/app/analytics",
      icon: BarChart3,
      alert: "3",
    },
    {
      name: t.app.insights,
      href: "/app/analytics/insights",
      icon: TrendingUp,
      scaleOnly: true,
    },
    {
      name: t.app.playground,
      href: "/app/playground",
      icon: PlayCircle,
      highlight: true,
    },
    {
      name: t.app.team,
      href: "/app/settings/team",
      icon: Users,
    },
  ];

  if (mounted && !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFB] dark:bg-[#0F1117] px-4 text-center">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-[#161922] border border-gray-200 dark:border-gray-800 shadow-xl space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-gray-900 dark:text-white">
            {language === "en" ? "Authentication Required" : "Требуется авторизация"}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {language === "en"
              ? "All company dashboard functions, knowledge base management, and bot integrations are available only after registration or sign in."
              : "Все функции управления базой знаний компании, подключение ботов и RAG-песочница доступны только после регистрации или входа в личный кабинет."}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => openAuthModal("login")}
              className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-800 dark:text-white hover:bg-gray-50"
            >
              {language === "en" ? "Sign In" : "Войти"}
            </button>
            <button
              onClick={() => openAuthModal("register")}
              className="flex-1 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold shadow-md"
            >
              {language === "en" ? "Register" : "Регистрация"}
            </button>
          </div>
          <Link
            href="/"
            className="block text-xs text-indigo-600 dark:text-indigo-400 hover:underline pt-2 font-medium"
          >
            ← {language === "en" ? "Back to Homepage" : "Вернуться на главную страницу"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFB] dark:bg-[#0F1117] text-gray-900 dark:text-gray-100">
      {/* Top Navbar */}
      <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-700 text-white flex items-center justify-center shadow-sm">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-lg text-gray-900 dark:text-white">
              DocuBrain
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800/80 text-xs">
            <Building2 className="w-3.5 h-3.5 text-gray-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user?.company_name || "Acme Technologies"}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-bold">
              Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/playground"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.app.playground}</span>
          </Link>

          <LanguageSwitcher />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            title="Переключить тему"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={logout}
            className="p-2 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
            title="Выйти из аккаунта"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <Link
            href="/"
            className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-1"
          >
            <span>{t.app.toSite}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main App Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] p-4 flex flex-col justify-between hidden md:flex shrink-0">
          <div className="space-y-1">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              {language === "en" ? "Knowledge Management" : "Управление базой"}
            </div>

            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        active
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.count && (
                    <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono">
                      {item.count}
                    </span>
                  )}
                  {item.alert && (
                    <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-bold">
                      {item.alert}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Bottom Trust & Plan Box */}
          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#12151D] border border-gray-200 dark:border-gray-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-800 dark:text-gray-200">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                tenant_id active
              </span>
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
              {language === "en"
                ? "Company knowledge base isolated & indexed."
                : "База знаний компании изолирована и проиндексирована."}
            </div>
            <div className="text-[10px] text-gray-400 flex items-center gap-1 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Google Gemini AI Engine</span>
            </div>
          </div>
        </aside>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
