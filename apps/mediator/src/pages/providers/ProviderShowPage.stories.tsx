import type { Meta } from "@storybook/react";
import ProviderShowPage from "../../pages/providers/[id].page";
import { MediatorApiProvider } from "../MediatorApiContext";

export default {
  component: ProviderShowPage,
} as Meta;

export const Default = () => (
  <MediatorApiProvider>
    <ProviderShowPage />
  </MediatorApiProvider>
);
