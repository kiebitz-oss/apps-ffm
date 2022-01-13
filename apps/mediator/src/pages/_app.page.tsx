import "@fontsource/ibm-plex-sans/latin.css";
import { Layout, loadLocale } from "@kiebitz-oss/ui";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { de, en } from "make-plural/plurals";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../../../../app.css";
import { MediatorService } from "../lib/MediatorService";
import { MediatorApiProvider } from "./MediatorApiContext";

i18n.loadLocaleData({
  de: { plurals: de },
  en: { plurals: en },
});

loadLocale(i18n, "de");

const api = new MediatorService({
  jsonrpc: {
    appointments: "http://127.0.0.1:22222/jsonrpc",
    storage: "http://127.0.0.1:11111/jsonrpc",
  },
});

const SafeHydrate: React.FC = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  const locale = i18n.locale;

  useEffect(() => {
    if (locale) {
      loadLocale(i18n, locale);
    }
  }, [locale]);

  return (
    <SafeHydrate>
      <I18nProvider i18n={i18n}>
        <MediatorApiProvider api={api}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MediatorApiProvider>
      </I18nProvider>
    </SafeHydrate>
  );
};

export default App;
