import type { Meta } from "@storybook/react";
import { providers } from "components/data";
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
