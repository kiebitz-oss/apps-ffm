import type { Appointment as VanellusAppointment } from "vanellus";
import type { Booking } from "./Booking";
import type { PublicProvider } from "./Provider";
import type { Slot } from "./Slot";
import type { Vaccine } from "./Vaccine";

export interface Appointment extends VanellusAppointment {
  bookings: Booking[]; // any[] in vanellus
  // updatedAt: string;
  // modified: boolean;
  // timestamp: string;
  // duration: number;
  // properties: { [Key: string]: any };
  // id: string;
  // publicKey: string;
  // slotData: Slot[];

  date: Date;
  vaccine: Vaccine;
  slots: Slot[];

  provider: PublicProvider;
  // bookings: Booking[];
}
