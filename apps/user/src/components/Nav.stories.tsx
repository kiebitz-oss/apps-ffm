import type { Meta } from "@storybook/react";
import { Nav, NavProps } from "./Nav";

export default {
  component: Nav,
} as Meta<NavProps>;

export const Default = () => <Nav />;
