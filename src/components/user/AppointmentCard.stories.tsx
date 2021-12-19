import type { Meta } from "@storybook/react";
import { appointments } from "components/data";
import { AppointmentCard, AppointmentCardProps } from "./AppointmentCard";

export default {
  component: AppointmentCard,
} as Meta<AppointmentCardProps>;

export const Default = () => <AppointmentCard appointment={appointments[0]} />;
export const Border = () => (
  <AppointmentCard appointment={appointments[0]} border />
);
