import type { Locale } from "@/i18n/types";
import { useI18n } from "@/i18n/LanguageProvider";

const OPTIONS: { id: Locale; label: string; name: string; lang: string }[] = [
  { id: "id", label: "ID", name: "Bahasa Indonesia", lang: "id" },
  { id: "en", label: "EN", name: "English", lang: "en" },
  { id: "ar", label: "ع", name: "العربية", lang: "ar" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, tx } = useI18n();

  return (
    <div
      role="group"
      aria-label={tx("Pilih bahasa")}
      className={`inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 ${className}`}
    >
      {OPTIONS.map((option) => {
        const active = locale === option.id;
        return (
          <button
            key={option.id}
            type="button"
            lang={option.lang}
            aria-pressed={active}
            title={option.name}
            onClick={() => setLocale(option.id)}
            className={`min-h-9 min-w-9 px-2 rounded-md text-[11px] font-bold tracking-wide transition cursor-pointer ${
              active
                ? "bg-[#064e3b] text-white shadow-sm"
                : "text-slate-600 hover:bg-white hover:text-emerald-800"
            } ${option.id === "ar" ? "font-serif text-sm leading-none" : ""}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
