import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Tag } from "./Tag";

describe("ui/Tag", () => {
  it("should render", async () => {
    expect.hasAssertions();

    const { container } = render(<Tag>Tag</Tag>);

    const element = screen.getAllByText("Tag");
    expect(element).not.toBeNull();

    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
