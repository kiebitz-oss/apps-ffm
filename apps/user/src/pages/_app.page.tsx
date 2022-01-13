import "@fontsource/ibm-plex-sans/latin.css";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { de, en } from "make-plural/plurals";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../../../../app.css";
import { Layout } from "../components/Layout";
import { loadLocale } from "../components/useI18n";
import { UserService } from "../lib/UserService";
import { messages } from "../locales/de/messages";
import { UserApiProvider } from "./UserApiContext";

const api = new UserService({
  jsonrpc: {
    appointments: "http://127.0.0.1:22222/jsonrpc",
    storage: "http://127.0.0.1:11111/jsonrpc",
  },
});

i18n.loadLocaleData({
  de: { plurals: de },
  en: { plurals: en },
});

i18n.load("de", messages);
i18n.activate("de");

const App = ({ Component, pageProps }: AppProps) => {
  const locale = i18n.locale;

  useEffect(() => {
    if (locale !== i18n.locale) {
      loadLocale(i18n, locale);
    }
  }, [locale]);

  return (
    <I18nProvider i18n={i18n}>
      <UserApiProvider api={api}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserApiProvider>
    </I18nProvider>
  );
};

export default App;
