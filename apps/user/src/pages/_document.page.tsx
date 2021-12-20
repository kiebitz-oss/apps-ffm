import NextDocument, { Head, Html, Main, NextScript } from "next/document";

/*
 * Note on CSP: we are blocking everything and allow only the bits we need from "self"
 */
class Document extends NextDocument {
  render() {
    return (
      <Html dir="ltr">
        <Head>
          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src 'none'; style-src 'self'; manifest-src 'self'; script-src 'self'; font-src 'self'; img-src 'self' data:; prefetch-src 'self';"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
