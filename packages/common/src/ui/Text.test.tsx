import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Text } from "./Text";

describe("ui/Text", () => {
  it("should render", async () => {
    expect.hasAssertions();

    const { container } = render(<Text>Text</Text>);

    const element = screen.getAllByText("Text");
    expect(element).not.toBeNull();

    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
