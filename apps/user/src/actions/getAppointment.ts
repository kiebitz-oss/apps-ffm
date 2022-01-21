import { getAnonymousApi } from "./getAnonymousApi";

export const getAppointment = async (
  appointmentId: string,
  providerId: string
) => {
  return getAnonymousApi().getAppointment(appointmentId, providerId, true);
};
