"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, Translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "ru",
  setLanguage: () => {},
  t: translations.ru,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ru");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("docubrain_lang") as Language;
      if (saved === "ru" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {
      // storage unavailable
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("docubrain_lang", lang);
    } catch {}
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}

// Vector SVG Russian Flag with permanent non-collapsible dimensions
export function RussianFlag() {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 rounded-[2px] shadow-2xs border border-black/25 dark:border-white/30 overflow-hidden"
      style={{ width: "20px", height: "14px", minWidth: "20px", minHeight: "14px", display: "inline-block" }}
    >
      <rect width="20" height="4.67" fill="#FFFFFF" />
      <rect y="4.67" width="20" height="4.67" fill="#0039A6" />
      <rect y="9.33" width="20" height="4.67" fill="#D52B1E" />
      <line x1="0" y1="4.67" x2="20" y2="4.67" stroke="#000000" strokeOpacity="0.08" strokeWidth="0.5" />
    </svg>
  );
}

// Vector SVG United Kingdom Flag with permanent non-collapsible dimensions
export function BritishFlag() {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 60 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 rounded-[2px] shadow-2xs border border-black/25 dark:border-white/30 overflow-hidden"
      style={{ width: "20px", height: "14px", minWidth: "20px", minHeight: "14px", display: "inline-block" }}
    >
      <rect width="60" height="42" fill="#012169" />
      <path d="M0,0 L60,42 M60,0 L0,42" stroke="#FFFFFF" strokeWidth="8" />
      <path d="M0,0 L30,21 M60,0 L30,21 M60,42 L30,21 M0,42 L30,21" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v42 M0,21 h60" stroke="#FFFFFF" strokeWidth="12" />
      <path d="M30,0 v42 M0,21 h60" stroke="#C8102E" strokeWidth="7" />
    </svg>
  );
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-gray-100/90 dark:bg-[#161922] border border-gray-200/90 dark:border-gray-800 shadow-2xs">
      <button
        onClick={() => setLanguage("ru")}
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          language === "ru"
            ? "bg-white text-gray-950 shadow-xs font-bold border border-gray-200/90 dark:bg-[#252C3E] dark:text-white dark:border-indigo-500/40"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-transparent hover:bg-white/40 dark:hover:bg-gray-800/40"
        }`}
        title="Русский язык"
        type="button"
      >
        <RussianFlag />
        <span className="tracking-wide text-xs font-bold leading-none">RU</span>
      </button>

      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          language === "en"
            ? "bg-white text-gray-950 shadow-xs font-bold border border-gray-200/90 dark:bg-[#252C3E] dark:text-white dark:border-indigo-500/40"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-transparent hover:bg-white/40 dark:hover:bg-gray-800/40"
        }`}
        title="English"
        type="button"
      >
        <BritishFlag />
        <span className="tracking-wide text-xs font-bold leading-none">EN</span>
      </button>
    </div>
  );
}
