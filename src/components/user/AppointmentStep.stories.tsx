import type { Meta } from "@storybook/react";
import { AppointmentStep } from "./AppointmentStep";
import { FinderStateProvider } from "./FinderStateProvider";
import { UserApiProvider } from "./UserApiContext";

export default {
  component: AppointmentStep,
} as Meta;

export const Default = () => (
  <UserApiProvider>
    <FinderStateProvider>
      <AppointmentStep />
    </FinderStateProvider>
  </UserApiProvider>
);
