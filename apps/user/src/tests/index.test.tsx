import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { act, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { de, en } from "make-plural/plurals";
import { messages as deMessages } from "../locales/de/messages";
import { messages as enMessages } from "../locales/en/messages";
import IndexPage from "../pages/index.page";

const setupI18n = () => {
  i18n.load("de", deMessages);
  i18n.load("en", enMessages);

  i18n.loadLocaleData({
    de: { plurals: de },
    en: { plurals: en },
  });

  return i18n;
};

const TestingProvider: React.FC = ({ children }) => (
  <I18nProvider i18n={i18n}>{children}</I18nProvider>
);

describe("indexPage", () => {
  it("should be translated correctly in German", async () => {
    expect.hasAssertions();

    setupI18n();

    act(() => {
      i18n.activate("de");
    });

    render(
      <TestingProvider>
        <IndexPage />
      </TestingProvider>,
      {
        wrapper: TestingProvider,
      }
    );

    expect(screen.getByTestId("view.title")).toBeInTheDocument();
    expect(screen.getByText("Willkommen!")).toBeDefined();
  });

  it("should be translated correctly in English", async () => {
    expect.hasAssertions();

    setupI18n();

    act(() => {
      i18n.activate("en");
    });

    render(
      <TestingProvider>
        <IndexPage />
      </TestingProvider>,
      {
        wrapper: TestingProvider,
      }
    );

    expect(screen.getByTestId("view.title")).toBeInTheDocument();
    expect(screen.getByText("Welcome!")).toBeDefined();
  });

  it("should not have a11y violations", async () => {
    expect.hasAssertions();

    setupI18n();

    // pass anything that outputs html to axe
    const { container } = render(
      <TestingProvider>
        <IndexPage />
      </TestingProvider>,
      {
        wrapper: TestingProvider,
      }
    );

    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
