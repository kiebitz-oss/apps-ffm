import { render, screen } from "@testing-library/react";
// import { axe } from "jest-axe";
import { Checkbox as Default } from "./Checkbox";

describe("ui/Checkbox", () => {
  it("should render", async () => {
    expect.hasAssertions();

    // const { container } =
    render(<Default />);

    const element = screen.getByRole("checkbox");
    expect(element).not.toBeNull();

    // await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
