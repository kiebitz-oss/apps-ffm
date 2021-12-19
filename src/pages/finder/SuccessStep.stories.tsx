import type { Meta } from "@storybook/react";
import { UserApiProvider } from "pages/UserApiContext";
import { FinderStateProvider } from "./FinderStateProvider";
import { SuccessStep } from "./SuccessStep";

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
