import { PublicProvider } from './Provider';
import { Slot } from './Slot';
import { Vaccine } from './Vaccine';

export interface Appointment {
    id: string;
    duration: number;
    date: Date;
    vaccine: Vaccine;
    provider: PublicProvider;
    // bookings: Booking[];
    // properties: Record<string, unknown>;
    slots: Slot[];
}
