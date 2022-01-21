import type { Booking } from "vanellus";
import { getStorage } from "./getStorage";

export const getBooking = () => {
  return getStorage().get<Booking>("booking");
};
