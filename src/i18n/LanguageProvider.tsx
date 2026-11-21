import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { catalog } from "./catalog";
import { createTranslator, type Translator, type Vars } from "./translate";
import { dirFor, htmlLang, isLocale, LOCALE_STORAGE_KEY, type Locale } from "./types";

const META_DESCRIPTION =
  "Portal Resmi & Publikasi Masjid Nurul Falah Sukatani, Desa Wangunsari, Cisolok, Sukabumi. Jadwal shalat, program rutin, dan wakaf pembangunan 2 lantai.";
const OG_DESCRIPTION =
  "Pembangunan Masjid Permanen 2 Lantai & Pusat Dakwah Umat - Kp. Sukatani, Desa Wangunsari, Cisolok, Sukabumi.";
const DOCUMENT_TITLE = "Masjid Nurul Falah // Kp. Sukatani";

interface I18nContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  tx: Translator;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "id";
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : "id";
  } catch {
    return "id";
  }
}

function applyDocument(locale: Locale, tx: Translator) {
  const root = document.documentElement;
  root.lang = htmlLang(locale);
  root.dir = dirFor(locale);
  document.title = tx(DOCUMENT_TITLE);
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", tx(META_DESCRIPTION));
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", tx(OG_DESCRIPTION));
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) {
    ogLocale.setAttribute("content", locale === "id" ? "id_ID" : locale === "ar" ? "ar" : "en_US");
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", tx("Masjid Nurul Falah Sukatani"));
}

function ensureArabicFont() {
  const id = "dkmnf-arabic-font";
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap";
  document.head.appendChild(link);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const tx = useMemo(() => createTranslator(locale, catalog), [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* private mode or blocked storage: the choice still applies for this visit */
    }
  }, []);

  useEffect(() => {
    applyDocument(locale, tx);
    if (locale === "ar") ensureArabicFont();
  }, [locale, tx]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, dir: dirFor(locale), setLocale, tx }),
    [locale, setLocale, tx],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return value;
}

export function Tx({ k, vars }: { k: string; vars?: Vars }) {
  const { tx } = useI18n();
  return <>{tx(k, vars)}</>;
}
