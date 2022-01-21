import type { Booking } from "vanellus";
import { getStorage } from "./getStorage";

export const setBooking = (booking?: Booking) => {
  const storage = getStorage();

  if (booking) {
    storage.set("booking", booking);

    return true;
  }

  storage.remove("booking");

  return true;
};
