import { axe } from "jest-axe";
import { act, render, screen } from "../tests/test-utils";
import { Questionaire } from "./questionaire";

describe("questionaire", () => {
  it("renders a heading", () => {
    expect.hasAssertions();

    render(<Questionaire />);

    const form = screen.getByRole("form");

    expect(form).toBeInTheDocument();
  });

  it("should not have a11y violations", async () => {
    expect.hasAssertions();

    const { container } = render(<Questionaire />);

    await act(async () => {
      await expect(axe(container)).resolves.toHaveNoViolations();
    });
  });
});
