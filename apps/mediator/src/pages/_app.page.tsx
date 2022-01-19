import "@fontsource/ibm-plex-sans/latin.css";
import { Layout } from "@kiebitz-oss/common";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import "app.css";
import { HeaderContent } from "components/HeaderContent";
import { AppProvider } from "lib/AppProvider";
import { de, en } from "make-plural/plurals";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

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
          `@kiebitz-oss/common/locales/${locale}/messages`
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

i18n.loadLocaleData({
  de: { plurals: de },
  en: { plurals: en },
});

loadLocale("de");

const App = ({ Component, pageProps }: AppProps) => {
  const [locale, setLocale] = useState(i18n.locale);

  useEffect(() => {
    loadLocale(locale);
  }, [locale]);

  return (
    <SafeHydrate>
      <I18nProvider i18n={i18n}>
        <AppProvider>
          <Layout header={HeaderContent} locale={locale} setLocale={setLocale}>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </I18nProvider>
    </SafeHydrate>
  );
};

export default App;
