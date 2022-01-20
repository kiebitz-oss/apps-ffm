import { render, screen } from "@testing-library/react";
import { Tag } from "./Tag";

describe("ui/Tag", () => {
  it("should render", async () => {
    expect.hasAssertions();

    render(<Tag>Tag</Tag>);

    const element = screen.getAllByText("Tag");
    expect(element).not.toBeNull();
  });
});
