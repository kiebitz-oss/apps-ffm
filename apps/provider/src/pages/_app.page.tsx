import "@fontsource/ibm-plex-sans/latin.css";
import { Layout } from "@impfen/common";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import "app.css";
import { HeaderContent } from "components/HeaderContent";
import { ProviderApiProvider } from "components/ProviderApiContext";
import dayjsEn from "dayjs/locale/de";
import dayjsDe from "dayjs/locale/en";
import { ProviderService } from "lib/ProviderService";
import { de, en } from "make-plural/plurals";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { dayjs } from "../../../../packages/vanellus/src/utils";

const SafeHydrate: React.FC = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

const loadedLocales: string[] = [];

export const loadLocale = async (locale?: string) => {
  if (locale && i18n.locale !== locale) {
    try {
      if (!loadedLocales.includes(locale)) {
        const { messages } = await import(`../locales/${locale}/messages`);
        const { messages: commonMessages } = await import(
          `@impfen/common/locales/${locale}/messages`
        );

        i18n.load(locale, { ...commonMessages, ...messages });
      }

      dayjs.locale(locale === "de" ? dayjsDe : dayjsEn);

      i18n.activate(locale);
      loadedLocales.push(locale);
    } catch (error) {
      console.error(error);
    }
  }
};

i18n.loadLocaleData({
  de: { plurals: de },
  en: { plurals: en },
});

loadLocale("de");

const api = new ProviderService({
  jsonrpc: {
    appointments: process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT as string,
    storage: process.env.NEXT_PUBLIC_STORAGE_ENDPOINT as string,
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  const [locale, setLocale] = useState(i18n.locale);

  useEffect(() => {
    loadLocale(locale);
  }, [locale]);

  return (
    <SafeHydrate>
      <I18nProvider i18n={i18n}>
        <ProviderApiProvider api={api}>
          <Layout header={HeaderContent} locale={locale} setLocale={setLocale}>
            <Component {...pageProps} />
          </Layout>
        </ProviderApiProvider>
      </I18nProvider>
    </SafeHydrate>
  );
};

export default App;
