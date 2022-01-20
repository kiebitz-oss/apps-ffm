import { render, screen } from "@testing-library/react";
import { Checkbox as Default } from "./Checkbox";

describe("ui/Checkbox", () => {
  it("should render", async () => {
    expect.hasAssertions();

    render(<Default />);

    const element = screen.getByRole("checkbox");
    expect(element).not.toBeNull();
  });
});
