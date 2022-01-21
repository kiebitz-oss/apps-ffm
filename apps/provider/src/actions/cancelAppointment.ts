import type { Appointment } from "vanellus";
import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";

export const cancelAppointment = (appointment: Appointment) => {
  return getApi().cancelAppointment(appointment, getKeyPairs());
};
