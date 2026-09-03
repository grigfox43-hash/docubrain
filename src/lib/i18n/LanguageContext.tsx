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

// Vector SVG Russian Flag (White, Blue, Red with crisp border)
export function RussianFlag({ className = "w-[19px] h-[13px]" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-[2px] shadow-2xs ring-1 ring-black/25 dark:ring-white/30 shrink-0 inline-block overflow-hidden`}
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 3 horizontal stripes */}
      <rect width="600" height="133.33" fill="#FFFFFF" />
      <rect y="133.33" width="600" height="133.33" fill="#0039A6" />
      <rect y="266.66" width="600" height="133.34" fill="#D52B1E" />
      {/* Subtle bottom border on white stripe for perfect contrast on white backgrounds */}
      <line x1="0" y1="133.33" x2="600" y2="133.33" stroke="#000000" strokeOpacity="0.08" strokeWidth="1.5" />
    </svg>
  );
}

// Vector SVG United Kingdom Flag (Union Jack with crisp border)
export function BritishFlag({ className = "w-[19px] h-[13px]" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-[2px] shadow-2xs ring-1 ring-black/25 dark:ring-white/30 shrink-0 inline-block overflow-hidden`}
      viewBox="0 0 60 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="uk-clip">
        <rect width="60" height="40" rx="2" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        {/* Navy background */}
        <rect width="60" height="40" fill="#012169" />
        {/* White diagonals */}
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" strokeWidth="8" />
        {/* Red diagonals */}
        <path d="M0,0 L30,20 M60,0 L30,20 M60,40 L30,20 M0,40 L30,20" stroke="#C8102E" strokeWidth="4" />
        {/* White cross */}
        <path d="M30,0 v40 M0,20 h60" stroke="#FFFFFF" strokeWidth="12" />
        {/* Red cross */}
        <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="7" />
      </g>
    </svg>
  );
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="inline-flex items-center p-1 rounded-xl bg-gray-100/90 dark:bg-[#141824] border border-gray-200/90 dark:border-gray-800 shadow-2xs">
      <button
        onClick={() => setLanguage("ru")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          language === "ru"
            ? "bg-white dark:bg-[#23293A] text-gray-950 dark:text-white shadow-xs font-bold ring-1 ring-black/5 dark:ring-indigo-500/40"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-gray-800/40"
        }`}
        title="Русский язык"
        type="button"
      >
        <RussianFlag />
        <span className="tracking-wide text-[11px]">RU</span>
      </button>

      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          language === "en"
            ? "bg-white dark:bg-[#23293A] text-gray-950 dark:text-white shadow-xs font-bold ring-1 ring-black/5 dark:ring-indigo-500/40"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-gray-800/40"
        }`}
        title="English"
        type="button"
      >
        <BritishFlag />
        <span className="tracking-wide text-[11px]">EN</span>
      </button>
    </div>
  );
}
