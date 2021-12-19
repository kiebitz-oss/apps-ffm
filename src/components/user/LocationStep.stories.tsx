import type { Meta } from "@storybook/react";
import { FinderStateProvider } from "./FinderStateProvider";
import { LocationStep } from "./LocationStep";
import { UserApiProvider } from "./UserApiContext";

export default {
  component: LocationStep,
} as Meta;

export const Default = () => (
  <UserApiProvider>
    <FinderStateProvider>
      <LocationStep />
    </FinderStateProvider>
  </UserApiProvider>
);
