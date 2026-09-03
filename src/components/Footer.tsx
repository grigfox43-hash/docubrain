"use client";

import Link from "next/link";
import { BrainCircuit, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t, language } = useTranslation();

  return (
    <footer className="bg-white dark:bg-[#0B0D13] border-t border-gray-200 dark:border-gray-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-700 text-white flex items-center justify-center shadow-md">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-gray-900 dark:text-white">
                DocuBrain
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              {language === "en"
                ? "Enterprise RAG assistant for internal regulations in Slack and Telegram. Strict tenant_id isolation, zero LLM hallucinations, and On-Premises deployment."
                : "Корпоративный RAG-ассистент по внутренним регламентам в Slack и Telegram. Строгая изоляция по tenant_id, исключение 'галлюцинаций' LLM и On-Premises деплой."}
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero Data-Leak Guarantee
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-medium">
                Google Gemini Powered
              </span>
            </div>
          </div>

          {/* Col 2: Продукт */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              {language === "en" ? "Product" : "Продукт"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="/#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <Link href="/security" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {t.nav.security}
                </Link>
              </li>
              <li>
                <Link href="/contact-sales" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {t.nav.onPremises}
                </Link>
              </li>
              <li>
                <a href="/#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Юридическая инфо */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              {language === "en" ? "Legal & Compliance" : "Юридическая инфо"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/security" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  GDPR & Compliance
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {language === "en" ? "Terms of Service" : "Условия обслуживания"}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {language === "en" ? "Privacy Policy" : "Политика конфиденциальности"}
                </Link>
              </li>
              <li>
                <Link href="/contact-sales" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {language === "en" ? "Security Team" : "Отдел безопасности"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} DocuBrain Inc. Multi-tenant Enterprise RAG.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {language === "en"
                ? "All systems operational (Qdrant + Google Gemini)"
                : "Все системы работают штатно (Qdrant + Google Gemini)"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
