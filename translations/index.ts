import { Translations } from "./types";

type TranslationModule = { default: Translations };

const translationModules = import.meta.glob("./locales/*.ts", { eager: true }) as Record<
  string,
  TranslationModule
>;

const loadedTranslations = Object.entries(translationModules).reduce<Record<string, Translations>>(
  (accumulator, [path, module]) => {
    const language = path.replace("./locales/", "").replace(".ts", "");
    accumulator[language] = module.default;
    return accumulator;
  },
  {}
);

if (Object.keys(loadedTranslations).length === 0) {
  throw new Error("No translation files were found inside translations/locales");
}

export const translations = loadedTranslations;
export const availableLanguages = Object.keys(translations);
export type Language = (typeof availableLanguages)[number];

export function getTranslations(language: Language): Translations {
  const selected = translations[language];
  if (!selected) {
    throw new Error(`Missing translations for language: ${language}`);
  }
  return selected;
}

export function getLanguageMeta(language: Language) {
  return getTranslations(language).meta;
}

export const languageMetaList = availableLanguages.map((code) => getLanguageMeta(code));
