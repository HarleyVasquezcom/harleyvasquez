import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales:       ["en", "es", "fr", "de", "pt", "it"],
  defaultLocale: "en",
  localePrefix:  "always",
});

export type Locale = (typeof routing.locales)[number];
export const LOCALES = routing.locales;
export const DEFAULT_LOCALE: Locale = routing.defaultLocale;
