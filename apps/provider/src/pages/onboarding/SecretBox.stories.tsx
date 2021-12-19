import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SecretBox } from "./SecretBox";

export default {
  component: SecretBox,
  args: {
    secret: "0123456789abcdef",
  },
} as ComponentMeta<typeof SecretBox>;

export const Default: ComponentStory<typeof SecretBox> = (args) => (
  <SecretBox {...args} />
);
