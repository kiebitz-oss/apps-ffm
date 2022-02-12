import { persistantWriteable, type Vaccine } from "@impfen/common";
import type {
  AggregatedPublicAppointment,
  Booking,
  PublicProvider,
  UserKeyPairs,
  UserQueueToken,
} from "vanellus";

// localStorage
export const booking = persistantWriteable<Booking<Vaccine>>("user:booking");
export const token = persistantWriteable<UserQueueToken>("user:token");
export const secret = persistantWriteable<string>("user:secret");
export const keypairs = persistantWriteable<UserKeyPairs>("user:keypairs");

// sessionStorage
export const provider = persistantWriteable<PublicProvider | true>(
  "user:finder:provider",
  undefined,
  true
);

export const appointment = persistantWriteable<
  AggregatedPublicAppointment<Vaccine>
>("user:finder:appointment", undefined, true);

export const vaccine = persistantWriteable<Vaccine>(
  "user:finder:vaccine",
  undefined,
  true
);
