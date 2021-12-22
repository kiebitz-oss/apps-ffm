// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BackLink } from "./BackLink";

export default {
  component: BackLink,
  args: {
    children: "Zurück zur Seite",
    href: "#",
  },
} as ComponentMeta<typeof BackLink>;

export const Default: ComponentStory<typeof BackLink> = (args) => (
  <BackLink {...args} />
);
