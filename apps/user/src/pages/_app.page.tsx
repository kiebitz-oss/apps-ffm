import "@fontsource/ibm-plex-sans/latin.css";
import { Layout, loadLocale } from "@impfen/common";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import "app.css";
import { FooterContent, HeaderContent } from "components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";
import { AuthError } from "vanellus";

dayjs.extend(utc);

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const router = useRouter();
  if (error instanceof AuthError) {
    router.push("/login").finally(() => resetErrorBoundary());

    return null;
  }

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

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
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <I18nProvider i18n={i18n}>
          <Layout
            header={HeaderContent}
            footer={FooterContent}
            locale={locale}
            setLocale={setLocale}
          >
            <Component {...pageProps} />
          </Layout>
        </I18nProvider>
      </ErrorBoundary>
    </SafeHydrate>
  );
};

export default App;
