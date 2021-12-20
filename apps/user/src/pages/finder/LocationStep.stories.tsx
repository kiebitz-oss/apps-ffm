import type { Meta } from "@storybook/react";
import { UserApiProvider } from "../UserApiContext";
import { FinderStateProvider } from "./FinderStateProvider";
import { LocationStep } from "./LocationStep";

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
