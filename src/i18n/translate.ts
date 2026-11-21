import type { Catalog, Locale } from "./types";

export type Vars = Record<string, string | number>;

export function mergeCatalogs(...parts: Catalog[]): Catalog {
  const out: Catalog = {};
  for (const part of parts) {
    for (const [key, value] of Object.entries(part)) {
      const existing = out[key];
      if (existing && (existing.en !== value.en || existing.ar !== value.ar)) {
        throw new Error(`Duplicate i18n key with a different translation: ${key}`);
      }
      out[key] = value;
    }
  }
  return out;
}

function fill(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) => {
    const value = vars[name];
    return value === undefined ? `{${name}}` : String(value);
  });
}

export function createTranslator(locale: Locale, catalog: Catalog) {
  return function tx(source: string, vars?: Vars): string {
    if (!source) return source;
    if (locale === "id") return fill(source, vars);
    const entry = catalog[source];
    return fill(entry ? entry[locale] : source, vars);
  };
}

export type Translator = ReturnType<typeof createTranslator>;
