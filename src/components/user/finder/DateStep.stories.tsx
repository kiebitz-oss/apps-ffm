import type { Meta } from "@storybook/react";
import { UserApiProvider } from "../common/UserApiContext";
import { DateStep } from "./DateStep";
import { FinderStateProvider } from "./FinderStateProvider";

export default {
  component: DateStep,
} as Meta;

export const Default = () => (
  <UserApiProvider>
    <FinderStateProvider>
      <DateStep />
    </FinderStateProvider>
  </UserApiProvider>
);
