import { axe } from "jest-axe";
import { act, render, screen } from "../tests/test-utils";
import IndexPage from "./index.page";

describe("indexPage", () => {
  it("renders a heading", () => {
    expect.hasAssertions();

    render(<IndexPage />);

    const heading = screen.getByRole("heading", {
      name: /Willkommen!/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("should be translated correctly in German", async () => {
    expect.hasAssertions();

    render(<IndexPage />);

    expect(screen.getByTestId("view.title")).toBeInTheDocument();
    expect(screen.getByText("Willkommen!")).toBeDefined();
  });

  // cannot work while wrapped
  // eslint-disable-next-line jest/no-commented-out-tests
  // it("should be translated correctly in English", async () => {
  //   expect.hasAssertions();

  //   act(() => {
  //     import(`../locales/en/messages`).then(({ messages }) =>
  //       loadLocale("en", messages)
  //     );
  //   });

  //   render(<IndexPage />);

  //   expect(screen.getByTestId("view.title")).toBeInTheDocument();
  //   expect(screen.getByText("Welcome!")).toBeDefined();
  // });

  it("should not have a11y violations", async () => {
    expect.hasAssertions();

    const { container } = render(<IndexPage />);

    await act(async () => {
      await expect(axe(container)).resolves.toHaveNoViolations();
    });
  });
});
