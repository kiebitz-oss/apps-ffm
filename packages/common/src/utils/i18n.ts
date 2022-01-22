import type { Messages } from "@lingui/core";
import { i18n } from "@lingui/core";
import "dayjs/locale/de";
import "dayjs/locale/en";
import { de, en } from "make-plural/plurals";

const loadedLocales: string[] = [];

i18n.loadLocaleData({
  de: { plurals: de },
  en: { plurals: en },
});

export const loadLocale = async (locale: string, messages: Messages) => {
  if (i18n.locale !== locale) {
    try {
      if (!loadedLocales.includes(locale)) {
        const { messages: commonMessages } = await import(
          `@impfen/common/locales/${locale}/messages`
        );

        i18n.load(locale, { ...commonMessages, ...messages });
      }

      i18n.activate(locale);
      loadedLocales.push(locale);
    } catch (error) {
      console.error(error);
    }
  }
};
