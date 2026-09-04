"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Cookie, Settings, Check, Shield } from "lucide-react";
import { PrivacyPreferencesModal } from "./PrivacyPreferencesModal";

export function CookieConsentBanner() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [doNotSellFocus, setDoNotSellFocus] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem("docubrain_cookie_consent");
      if (!consent) {
        // slight delay for smooth page entry
        const timer = setTimeout(() => setIsVisible(true), 700);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const handleConsentUpdated = () => {
      setIsVisible(false);
    };

    const handleOpenPreferences = (e: any) => {
      setDoNotSellFocus(!!e.detail?.doNotSell);
      setIsPreferencesOpen(true);
    };

    window.addEventListener("docubrain_consent_updated", handleConsentUpdated);
    window.addEventListener("docubrain_open_preferences", handleOpenPreferences);

    return () => {
      window.removeEventListener("docubrain_consent_updated", handleConsentUpdated);
      window.removeEventListener("docubrain_open_preferences", handleOpenPreferences);
    };
  }, []);

  const acceptAll = () => {
    try {
      localStorage.setItem(
        "docubrain_cookie_consent",
        JSON.stringify({
          essential: true,
          analytics: true,
          doNotSell: true,
          timestamp: new Date().toISOString(),
        })
      );
    } catch {}
    setIsVisible(false);
  };

  const acceptEssentialOnly = () => {
    try {
      localStorage.setItem(
        "docubrain_cookie_consent",
        JSON.stringify({
          essential: true,
          analytics: false,
          doNotSell: true,
          timestamp: new Date().toISOString(),
        })
      );
    } catch {}
    setIsVisible(false);
  };

  if (!mounted) return null;

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-3 inset-x-3 sm:bottom-5 sm:inset-x-6 z-40 max-w-4xl mx-auto animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-white/95 dark:bg-[#12151E]/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800/50 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1 pr-2">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <span>{t.cookies.bannerTitle}</span>
                  <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                    GDPR • 152-ФЗ • CCPA
                  </span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                  {t.cookies.bannerText}{" "}
                  <Link
                    href="/privacy"
                    className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700 font-medium"
                  >
                    Политика конфиденциальности
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <button
                onClick={() => {
                  setDoNotSellFocus(false);
                  setIsPreferencesOpen(true);
                }}
                type="button"
                className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors inline-flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{t.cookies.preferences}</span>
              </button>

              <button
                onClick={acceptEssentialOnly}
                type="button"
                className="px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors"
              >
                {t.cookies.essentialOnly}
              </button>

              <button
                onClick={acceptAll}
                type="button"
                className="px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold shadow-xs transition-colors inline-flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t.cookies.acceptAll}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <PrivacyPreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        initialDoNotSellFocus={doNotSellFocus}
      />
    </>
  );
}
