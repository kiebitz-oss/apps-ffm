import { prerendering } from "$app/env";
import type { Handle } from "@sveltejs/kit";

const minificationOptions = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: true,
  html5: true,
  ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: false,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true,
};

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    ssr: false,
  });

  // let's add in some security!
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "same-origin");

  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  // if we are prerendering html, we minify it :)
  if (prerendering && response.headers.get("content-type") === "text/html") {
    return import("html-minifier").then(async ({ default: { minify } }) => {
      return new Response(minify(await response.text(), minificationOptions), {
        status: response.status,
        headers: response.headers,
      });
    });
  }

  return response;
};
