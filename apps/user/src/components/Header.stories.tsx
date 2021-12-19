import { ComponentStory, Meta } from "@storybook/react";
import { Header, HeaderProps } from "./Header";

export default {
  component: Header,
  // argTypes: { onMobileNavClick: { action: 'onMobileNavClick clicked' } },
} as Meta<HeaderProps>;

export const Default: ComponentStory<typeof Header> = (args) => (
  <Header {...args} />
);
