import type { Meta } from "@storybook/react";
import ProviderShowPage from "pages/mediator/providers/[id]";
import { MediatorApiProvider } from "./MediatorApiContext";

export default {
  component: ProviderShowPage,
} as Meta;

export const Default = () => (
  <MediatorApiProvider>
    <ProviderShowPage />
  </MediatorApiProvider>
);
