import type { Booking } from "vanellus";
import { getApi } from "./getApi";
import { getUserQueueToken } from "./getUserQueueToken";

export const cancelBooking = async (booking: Booking) => {
  const userQueueToken = await getUserQueueToken();

  if (!userQueueToken) {
    return false;
  }

  return getApi().cancelBooking(booking, userQueueToken);
};
