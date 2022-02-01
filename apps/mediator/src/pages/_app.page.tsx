import "@fontsource/ibm-plex-sans/latin.css";
import { Layout, loadLocale } from "@impfen/common";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import "app.css";
import { HeaderContent } from "components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

dayjs.extend(utc);

const SafeHydrate: React.FC = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  const [locale, setLocale] = useState(i18n.locale || "de");

  useEffect(() => {
    import(`../locales/${locale}/messages`).then(({ messages }) =>
      loadLocale(locale, messages)
    );
    dayjs.locale(locale);
  }, [locale]);

  return (
    <SafeHydrate>
      <I18nProvider i18n={i18n}>
        <Layout header={HeaderContent} locale={locale} setLocale={setLocale}>
          <Component {...pageProps} />
        </Layout>
      </I18nProvider>
    </SafeHydrate>
  );
};

export default App;
