import type { Meta } from "@storybook/react";
import { DateStep } from "./DateStep";
import { FinderStateProvider } from "./FinderStateProvider";
import { UserApiProvider } from "./UserApiContext";

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
