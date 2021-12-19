import type { Meta } from "@storybook/react";
import { UserApiProvider } from "../UserApiContext";
import { FinderStateProvider } from "./FinderStateProvider";
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
