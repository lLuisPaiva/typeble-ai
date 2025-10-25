import { Translations, TranslationMeta } from "./types";

type TranslationModule = { default: Translations };

type RequireWithContext = typeof require & {
  context: (
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ) => {
    keys(): string[];
    <T>(id: string): T;
  };
};

const translationContext = (require as RequireWithContext).context(
  "./locales",
  false,
  /\.ts$/
);

const loadedTranslations = translationContext.keys().reduce<Record<string, Translations>>( 
  (accumulator, filename) => {
    const module = translationContext(filename) as TranslationModule;
    const language = filename.replace("./", "").replace(".ts", "");
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

export function getLanguageMeta(language: Language): TranslationMeta {
  return getTranslations(language).meta;
}

export const languageMetaList = availableLanguages.map((code) => getLanguageMeta(code));
