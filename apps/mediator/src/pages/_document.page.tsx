import NextDocument, { Head, Html, Main, NextScript } from "next/document";

/*
 * Note on CSP: we are blocking everything and allow only the bits we need
 */
class Document extends NextDocument {
  protected csp =
    process.env.NODE_ENV !== "production"
      ? `default-src 'none'; prefetch-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'unsafe-eval' 'self'; connect-src 'self' ws://localhost:3000/_next/webpack-hmr${
          process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT
            ? new URL(process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT).origin
            : ""
        }${
          process.env.NEXT_PUBLIC_STORAGE_ENDPOINT
            ? new URL(process.env.NEXT_PUBLIC_STORAGE_ENDPOINT).origin
            : ""
        }; img-src 'self' data:;`
      : `default-src 'none'; prefetch-src 'self'; style-src 'self'; manifest-src 'self'; connect-src 'self'${
          process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT
            ? new URL(process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT).origin
            : ""
        }${
          process.env.NEXT_PUBLIC_STORAGE_ENDPOINT
            ? new URL(process.env.NEXT_PUBLIC_STORAGE_ENDPOINT).origin
            : ""
        }; script-src 'self'; font-src 'self'; img-src 'self' data:;`;
  render() {
    return (
      <Html dir="ltr">
        <Head>
          <meta httpEquiv="Content-Security-Policy" content={this.csp} />
          <link rel="icon" href="/favicon.svg" />
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
