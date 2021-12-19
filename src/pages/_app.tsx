import "@fontsource/ibm-plex-sans/latin.css";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import "app.css";
import { Layout } from "components/common/Layout";
import { loadLocale } from "components/common/useI18n";
import { MediatorApiProvider } from "components/mediator/MediatorApiContext";
import { ProviderApiProvider } from "components/provider/ProviderApiContext";
import { Nav } from "components/user/Nav";
import { UserApiProvider } from "components/user/UserApiContext";
import { de, en } from "make-plural/plurals";
import type { AppProps } from "next/app";
import { useEffect } from "react";

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
      <ProviderApiProvider>
        <MediatorApiProvider>
          <UserApiProvider>
            <Layout nav={Nav}>
              <Component {...pageProps} />
            </Layout>
          </UserApiProvider>
        </MediatorApiProvider>
      </ProviderApiProvider>
    </I18nProvider>
  );
};

export default App;
