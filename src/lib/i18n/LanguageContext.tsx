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

// Vector SVG Russian Flag (with 4-sided crisp border so white top stripe never vanishes)
export function RussianFlag({ className = "w-[18px] h-[12px]" }: { className?: string }) {
  return (
    <span className="relative inline-flex items-center justify-center shrink-0 rounded-[2.5px] overflow-hidden border border-black/25 dark:border-white/30 shadow-2xs">
      <svg
        className={className}
        viewBox="0 0 600 400"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <rect width="600" height="133.33" fill="#FFFFFF" />
        <rect y="133.33" width="600" height="133.33" fill="#0039A6" />
        <rect y="266.66" width="600" height="133.34" fill="#D52B1E" />
      </svg>
    </span>
  );
}

// Vector SVG United Kingdom Flag (Union Jack with crisp border)
export function BritishFlag({ className = "w-[18px] h-[12px]" }: { className?: string }) {
  return (
    <span className="relative inline-flex items-center justify-center shrink-0 rounded-[2.5px] overflow-hidden border border-black/25 dark:border-white/30 shadow-2xs">
      <svg
        className={className}
        viewBox="0 0 60 40"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" strokeWidth="8" />
        <path d="M0,0 L30,20 M60,0 L30,20 M60,40 L30,20 M0,40 L30,20" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v40 M0,20 h60" stroke="#FFFFFF" strokeWidth="12" />
        <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="7" />
      </svg>
    </span>
  );
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-gray-100/90 dark:bg-[#161922] border border-gray-200/90 dark:border-gray-800 shadow-2xs">
      <button
        onClick={() => setLanguage("ru")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
          language === "ru"
            ? "bg-white text-gray-950 shadow-xs font-bold border border-gray-200/90 dark:bg-[#252C3E] dark:text-white dark:border-indigo-500/40"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-transparent hover:bg-white/40 dark:hover:bg-gray-800/40"
        }`}
        title="Русский язык"
        type="button"
      >
        <RussianFlag />
        <span className="tracking-wide text-[11px] font-bold">RU</span>
      </button>

      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
          language === "en"
            ? "bg-white text-gray-950 shadow-xs font-bold border border-gray-200/90 dark:bg-[#252C3E] dark:text-white dark:border-indigo-500/40"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-transparent hover:bg-white/40 dark:hover:bg-gray-800/40"
        }`}
        title="English"
        type="button"
      >
        <BritishFlag />
        <span className="tracking-wide text-[11px] font-bold">EN</span>
      </button>
    </div>
  );
}
