export interface NavbarTranslations {
  services: string;
  caseStudies: string;
  process: string;
  philosophy: string;
  engagement: string;
  cta: string;
  toggleLabel: string;
}

export interface HeroTranslations {
  strap: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  scrollTop: string;
  scrollBottom: string;
}

export interface TranslationMeta {
  code: string;
  label: string;
  name: string;
}

export interface Translations {
  meta: TranslationMeta;
  navbar: NavbarTranslations;
  hero: HeroTranslations;
}
