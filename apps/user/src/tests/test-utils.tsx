import { loadLocale } from "@impfen/common";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, RenderOptions } from "@testing-library/react";
import { FC, ReactElement } from "react";

import(`../locales/de/messages`).then(({ messages }) =>
  loadLocale("de", messages)
);

// Adds mock for Next.js router before each test
// @see https://github.com/scottrippey/next-router-mock#sync-vs-async
jest.mock("next/dist/client/router", () => require("next-router-mock"));
jest.mock("next/router", () => require("next-router-mock"));

const AppProviders: FC = ({ children }) => {
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

const customRender: any = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AppProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
