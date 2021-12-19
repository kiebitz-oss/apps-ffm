import type { Meta } from "@storybook/react";
import { MediatorApiProvider } from "../MediatorApiContext";
import ProvidersPage from "./index.page";

export default {
  component: ProvidersPage,
} as Meta;

export const Default = () => (
  <MediatorApiProvider>
    <ProvidersPage />
  </MediatorApiProvider>
);
