import type { Meta } from "@storybook/react";
import WelcomePage from "pages/mediator";
import { MediatorApiProvider } from "./MediatorApiContext";

export default {
  component: WelcomePage,
} as Meta;

export const Default = () => (
  <MediatorApiProvider>
    <WelcomePage />
  </MediatorApiProvider>
);
