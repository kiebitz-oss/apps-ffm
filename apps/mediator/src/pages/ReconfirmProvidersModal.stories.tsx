import { providers } from "@kiebitz-oss/api";
import type { Meta } from "@storybook/react";
import { MediatorApiProvider } from "./MediatorApiContext";
import { ReconfirmProvidersModal } from "./ReconfirmProvidersModal";

export default {
  component: ReconfirmProvidersModal,
} as Meta;

export const Default = () => (
  <MediatorApiProvider>
    <ReconfirmProvidersModal providers={providers} />
  </MediatorApiProvider>
);
