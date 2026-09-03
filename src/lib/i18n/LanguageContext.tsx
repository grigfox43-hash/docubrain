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
    const saved = localStorage.getItem("docubrain_lang") as Language;
    if (saved === "ru" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("docubrain_lang", lang);
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

// Vector SVG Russian Flag (White, Blue, Red)
export function RussianFlag({ className = "w-[18px] h-[13px]" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-[3px] overflow-hidden shadow-xs ring-1 ring-black/10 dark:ring-white/25 shrink-0 inline-block`}
      viewBox="0 0 640 480"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#ffffff" d="M0 0h640v160H0z" />
        <path fill="#0039a6" d="M0 160h640v160H0z" />
        <path fill="#d52b1e" d="M0 320h640v160H0z" />
      </g>
    </svg>
  );
}

// Vector SVG United Kingdom Flag (Union Jack)
export function BritishFlag({ className = "w-[18px] h-[13px]" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-[3px] overflow-hidden shadow-xs ring-1 ring-black/10 dark:ring-white/25 shrink-0 inline-block`}
      viewBox="0 0 640 480"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path
        fill="#ffffff"
        d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-179L0 64V0h75z"
      />
      <path
        fill="#C8102E"
        d="m424 288 216 159v33h-44L380 318l44-30zM640 0v10L456 148l40 30 144-107V0zM184 192 0 55V21h44l216 161-76 10zM0 447l184-137 40 30L40 480H0v-33z"
      />
      <path fill="#ffffff" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
      <path fill="#C8102E" d="M267 0v480h106V0H267zM0 187v106h640V187H0z" />
    </svg>
  );
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center p-1 rounded-xl bg-gray-100/90 dark:bg-[#161922] border border-gray-200/80 dark:border-gray-800 shadow-inner text-xs font-semibold">
      <button
        onClick={() => setLanguage("ru")}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
          language === "ru"
            ? "bg-white text-gray-900 border-gray-200/80 shadow-xs dark:bg-[#222838] dark:text-white dark:border-indigo-500/40 dark:shadow-[0_0_12px_rgba(99,102,241,0.25)] font-bold"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:bg-white/50 dark:hover:bg-gray-800/50"
        }`}
        title="Русский язык"
        type="button"
      >
        <RussianFlag />
        <span className="text-[11px] tracking-wide">RU</span>
      </button>

      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
          language === "en"
            ? "bg-white text-gray-900 border-gray-200/80 shadow-xs dark:bg-[#222838] dark:text-white dark:border-indigo-500/40 dark:shadow-[0_0_12px_rgba(99,102,241,0.25)] font-bold"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:bg-white/50 dark:hover:bg-gray-800/50"
        }`}
        title="English"
        type="button"
      >
        <BritishFlag />
        <span className="text-[11px] tracking-wide">EN</span>
      </button>
    </div>
  );
}
