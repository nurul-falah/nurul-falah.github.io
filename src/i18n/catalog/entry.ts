import type { Catalog } from "../types";

export function e(en: string, ar: string): { en: string; ar: string } {
  return { en, ar };
}

export type CatalogPart = Catalog;
