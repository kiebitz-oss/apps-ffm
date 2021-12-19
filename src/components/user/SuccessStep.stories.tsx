import type { Meta } from "@storybook/react";
import { FinderStateProvider } from "./FinderStateProvider";
import { SuccessStep } from "./SuccessStep";
import { UserApiProvider } from "./UserApiContext";

export default {
  component: SuccessStep,
} as Meta;

export const Default = () => (
  <UserApiProvider>
    <FinderStateProvider>
      <SuccessStep />
    </FinderStateProvider>
  </UserApiProvider>
);
