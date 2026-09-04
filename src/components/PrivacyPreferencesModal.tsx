"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { X, ShieldCheck, Lock, BarChart3, CheckCircle2 } from "lucide-react";

interface PrivacyPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoNotSellFocus?: boolean;
}

export function PrivacyPreferencesModal({
  isOpen,
  onClose,
  initialDoNotSellFocus = false,
}: PrivacyPreferencesModalProps) {
  const { t } = useTranslation();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [doNotSellOptOut, setDoNotSellOptOut] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem("docubrain_cookie_consent");
        if (stored) {
          const parsed = JSON.parse(stored);
          setAnalyticsEnabled(!!parsed.analytics);
          setDoNotSellOptOut(parsed.doNotSell !== false);
        }
      } catch {}
      setSavedNotice(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    try {
      const consentData = {
        essential: true,
        analytics: analyticsEnabled,
        doNotSell: doNotSellOptOut,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("docubrain_cookie_consent", JSON.stringify(consentData));
      // Dispatch custom event so banner knows consent is saved
      window.dispatchEvent(new Event("docubrain_consent_updated"));
    } catch {}

    setSavedNotice(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#151822] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          type="button"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pr-8">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800/50 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">
              {t.cookies.modalTitle}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {t.cookies.modalSubtitle}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {/* Category 1: Essential */}
          <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/50 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {t.cookies.essentialTitle}
                </span>
              </div>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.cookies.essentialDesc}
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 shrink-0">
              Active
            </span>
          </div>

          {/* Category 2: Analytics */}
          <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/50 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {t.cookies.analyticsTitle}
                </span>
              </div>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.cookies.analyticsDesc}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" />
            </label>
          </div>

          {/* CCPA / CPRA Section */}
          <div
            className={`p-3.5 rounded-xl border ${
              initialDoNotSellFocus
                ? "border-indigo-500 dark:border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20"
                : "border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/50"
            } flex items-start justify-between gap-3`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {t.cookies.doNotSellTitle}
                </span>
              </div>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.cookies.doNotSellDesc}
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800 shrink-0">
              Guaranteed
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between gap-3">
          <span className="text-[11px] text-gray-500">
            {savedNotice ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.cookies.doNotSellConfirmed}
              </span>
            ) : (
              "GDPR • 152-FZ • CCPA"
            )}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              type="button"
              className="px-3.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="px-4 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold shadow-xs transition-colors"
            >
              {t.cookies.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
