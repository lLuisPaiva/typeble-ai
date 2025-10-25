"use client";

import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import {
  availableLanguages,
  getTranslations,
  languageMetaList,
  translations,
  type Language,
} from "@/translations";
import type { Translations, TranslationMeta } from "@/translations/types";

interface LanguageContextValue {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  availableLanguages: Language[];
  languageMeta: TranslationMeta[];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const languageList = useMemo(() => availableLanguages as Language[], []);
  const metaList = useMemo(() => languageMetaList as TranslationMeta[], []);

  if (languageList.length === 0) {
    throw new Error("LanguageProvider requires at least one translation file");
  }

  const fallbackLanguage = (languageList.includes("en" as Language) ? "en" : languageList[0]) as Language;
  const [language, setLanguageState] = useState<Language>(fallbackLanguage);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = getTranslations(language).meta.code;
    }
  }, [language]);

  const setLanguage = useCallback(
    (next: Language) => {
      if (!translations[next]) return;
      setLanguageState(next);
    },
    []
  );

  const toggleLanguage = useCallback(() => {
    if (languageList.length <= 1) return;
    const currentIndex = languageList.indexOf(language);
    const nextIndex = (currentIndex + 1) % languageList.length;
    setLanguageState(languageList[nextIndex]);
  }, [language, languageList]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      translations: getTranslations(language),
      setLanguage,
      toggleLanguage,
      availableLanguages: languageList,
      languageMeta: metaList,
    }),
    [language, languageList, metaList, setLanguage, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
