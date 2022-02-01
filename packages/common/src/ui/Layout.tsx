import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Footer, Header } from "./page";

interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  header?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  footer?: any;
  locale?: string;
  setLocale?: (locale: string) => void;
}

const ErrorBoundary: React.FC = ({ children }) => {
  const [error, setError] = useState("");
  const router = useRouter();

  const promiseRejectionHandler = useCallback((event) => {
    setError(event.reason);
  }, []);

  const resetError = useCallback(() => {
    setError("");
    window.sessionStorage.clear();
    window.localStorage.clear();
    router.push("/");
  }, [router]);

  useEffect(() => {
    window.addEventListener("unhandledrejection", promiseRejectionHandler);

    return () => {
      window.removeEventListener("unhandledrejection", promiseRejectionHandler);
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return error ? (
    <React.Fragment>
      <h1 className="h1">Ein Fehler ist aufgetreten</h1>

      <p className="mb-8">{error.toString()}</p>

      <button type="button" className="button primary md" onClick={resetError}>
        Reset
      </button>
    </React.Fragment>
  ) : (
    children
  );
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  footer,
  setLocale = () => undefined,
  locale = "de",
}) => {
  const HeaderContent = header;
  const FooterContent = footer;

  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  return (
    <>
      <Header mobile={footer}>
        <HeaderContent locale={locale} setLocale={setLocale} />
      </Header>

      <ErrorBoundary>{children}</ErrorBoundary>

      {FooterContent && (
        <Footer>
          <FooterContent locale={locale} setLocale={setLocale} />
        </Footer>
      )}
    </>
  );
};
