import { getAnonymousApi } from "./getAnonymousApi";

export const getAppointments = (
  date: Date,
  zipFrom: number | string = 60306,
  zipTo: number | string = 65936
) => {
  return getAnonymousApi().getAggregatedAppointments(date, zipFrom, zipTo);
};
