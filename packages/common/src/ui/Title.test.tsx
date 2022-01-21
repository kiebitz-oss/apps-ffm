import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Title } from "./Title";

describe("ui/Title", () => {
  it("should render", async () => {
    expect.hasAssertions();

    const { container } = render(<Title>Title</Title>);

    const element = screen.getAllByText("Title");
    expect(element).not.toBeNull();

    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
