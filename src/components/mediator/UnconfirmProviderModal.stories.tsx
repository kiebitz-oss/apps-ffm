import type { Meta } from "@storybook/react";
import { providers } from "components/data";
import { MediatorApiProvider } from "./MediatorApiContext";
import { UnconfirmProviderModal } from "./UnconfirmProviderModal";

export default {
  component: UnconfirmProviderModal,
} as Meta;

export const Default = () => (
  <MediatorApiProvider>
    <UnconfirmProviderModal provider={providers[0]} />
  </MediatorApiProvider>
);
