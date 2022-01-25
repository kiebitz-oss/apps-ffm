import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { act } from "react-dom/test-utils";
import { BackLink } from "./BackLink";

describe("ui/Backlink", () => {
  it("should render", () => {
    expect.hasAssertions();

    render(<BackLink href="/">BackLink</BackLink>);
    const element = screen.getByText(/BackLink/i);

    expect(element).not.toBeNull();
  });

  it("should not have a11y violations", async () => {
    expect.hasAssertions();

    const { container } = render(<BackLink href="/">BackLink</BackLink>);

    await act(async () => {
      await expect(axe(container)).resolves.toHaveNoViolations();
    });
  });
});
