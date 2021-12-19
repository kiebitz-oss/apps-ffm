import { providers } from "@kiebitz-oss/api";
import type { Meta } from "@storybook/react";
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
