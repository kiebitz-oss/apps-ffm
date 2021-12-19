import type { Meta } from "@storybook/react";
import { FinderStateProvider } from "./FinderStateProvider";
import { UserApiProvider } from "./UserApiContext";
import { VerifyStep } from "./VerifyStep";

export default {
  component: VerifyStep,
} as Meta;

export const Default = () => (
  <UserApiProvider>
    <FinderStateProvider>
      <VerifyStep />
    </FinderStateProvider>
  </UserApiProvider>
);
