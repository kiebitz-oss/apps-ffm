import "@fontsource/ibm-plex-sans/latin.css";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import "app.css";
import { Layout } from "components/common/Layout";
import { MediatorApiProvider } from "components/mediator/common/MediatorApiContext";
import { ProviderApiProvider } from "components/provider/common/ProviderApiContext";
import { Nav } from "components/user/common/Nav";
import { UserApiProvider } from "components/user/common/UserApiContext";
import { de, en } from "make-plural/plurals";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

i18n.loadLocaleData({
  de: { plurals: de },
  en: { plurals: en },
});

const App = ({ Component, pageProps }: AppProps) => {
  const { locale, defaultLocale } = useRouter();

  useEffect(() => {
    const load = async (locale: string) => {
      try {
        const { messages } = await import(`../locales/${locale}/messages.po`);

        i18n.load(locale, messages);
        i18n.activate(locale);
      } catch (error) {
        console.error(error);
      }
    };

    load(locale || defaultLocale || "de");
  }, [locale, defaultLocale]);

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
