import type { Meta } from "@storybook/react";
import ProvidersPage from "pages/mediator/providers";
import { MediatorApiProvider } from "../common/MediatorApiContext";

export default {
  component: ProvidersPage,
} as Meta;

export const Default = () => (
  <MediatorApiProvider>
    <ProvidersPage />
  </MediatorApiProvider>
);
