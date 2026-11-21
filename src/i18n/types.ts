export const LOCALES = ["id", "en", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export type Catalog = Record<string, { en: string; ar: string }>;

export const LOCALE_STORAGE_KEY = "dkmnf-lang";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "id" || value === "en" || value === "ar";
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function htmlLang(locale: Locale): string {
  return locale;
}
