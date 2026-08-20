import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import type { Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  let projectCatalog: unknown;
  try {
    projectCatalog = (await import(`../../messages/projects.${locale}.json`)).default;
  } catch {
    projectCatalog = (await import(`../../messages/projects.en.json`)).default;
  }

  return {
    locale,
    messages: { ...messages, projectCatalog },
  };
});
