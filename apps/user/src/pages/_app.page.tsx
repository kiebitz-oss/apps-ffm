import "@fontsource/ibm-plex-sans/latin.css";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { de, en } from "make-plural/plurals";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../../../../app.css";
import { Layout } from "../components/Layout";
import { loadLocale } from "../components/useI18n";
import { UserApiProvider } from "./UserApiContext";

i18n.loadLocaleData({
  de: { plurals: de },
  en: { plurals: en },
});

loadLocale(i18n, "de");

const App = ({ Component, pageProps }: AppProps) => {
  const locale = i18n.locale;

  useEffect(() => {
    if (locale) {
      loadLocale(i18n, locale);
    }
  }, [locale]);

  return (
    <I18nProvider i18n={i18n}>
      <UserApiProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserApiProvider>
    </I18nProvider>
  );
};

export default App;
