import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";

export const getProviderAppointments = (from: Date, to: Date) => {
  return getApi().getProviderAppointments(from, to, getKeyPairs());
};
