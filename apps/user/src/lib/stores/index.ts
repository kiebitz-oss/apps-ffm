import { persistantWriteable, type Vaccine } from "@impfen/common";
import { writable } from "svelte/store";
import type {
  AggregatedPublicAppointment,
  Booking,
  PublicProvider,
  UserQueueToken,
} from "vanellus";

// localStorage
export const booking = persistantWriteable<Booking<Vaccine>>("user:booking");
export const token = persistantWriteable<UserQueueToken>("user:token");
export const secret = persistantWriteable<string>("user:secret");

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

export const accessible = writable<boolean>(false);
