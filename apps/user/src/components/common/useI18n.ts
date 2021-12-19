import type { I18n } from "@lingui/core";
import { useLingui } from "@lingui/react";

export const useI18n = () => {
  const { i18n } = useLingui();

  return i18n;
};

export const loadLocale = async (i18n: I18n, locale?: string) => {
  if (locale && i18n.locale !== locale) {
    try {
      const { messages } = await import(`locales/${locale}/messages.js`);

      i18n.load(locale, messages);
      i18n.activate(locale);
    } catch (error) {
      console.error(error);
    }
  }
};
