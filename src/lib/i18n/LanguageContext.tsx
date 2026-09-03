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

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center p-0.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold">
      <button
        onClick={() => setLanguage("ru")}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all ${
          language === "ru"
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs font-bold"
            : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
        }`}
        title="Русский"
      >
        <span className="text-sm leading-none">🇷🇺</span>
        <span>RU</span>
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all ${
          language === "en"
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs font-bold"
            : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
        }`}
        title="English"
      >
        <span className="text-sm leading-none">🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}
