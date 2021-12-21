// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import * as stories from "./Button.stories";

const { Default } = composeStories(stories);

describe("UI/Button", () => {
  it("should render", () => {
    render(<Default>Hello world</Default>);
    const buttonElement = screen.getByText(/Hello world/i);
    expect(buttonElement).not.toBeNull();
  });

  it("should handle onclick events", async () => {
    const onClickSpy = jest.fn();
    render(<Default onClick={onClickSpy} />);
    const buttonElement = screen.getByRole("button");
    buttonElement.click();
    expect(onClickSpy).toHaveBeenCalled();
  });

  it("should not have a11y violations", async () => {
    const { container } = render(<Default />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
