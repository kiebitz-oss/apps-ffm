import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Footer from "./Footer";

export default {
  component: Footer,
} as ComponentMeta<typeof Footer>;

export const Default: ComponentStory<typeof Footer> = (args) => (
  <Footer {...args} />
);
