import type { Meta } from "@storybook/react";
import WelcomePage from "./index.page";
import { MediatorApiProvider } from "./MediatorApiContext";

export default {
  component: WelcomePage,
} as Meta;

export const Default = () => (
  <MediatorApiProvider>
    <WelcomePage />
  </MediatorApiProvider>
);
