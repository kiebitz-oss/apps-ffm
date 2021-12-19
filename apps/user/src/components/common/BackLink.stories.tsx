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
