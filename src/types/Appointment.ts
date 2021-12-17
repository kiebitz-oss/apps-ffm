import { Booking } from './Booking';
import { PublicProvider } from './Provider';
import { Slot } from './Slot';
import { Vaccine } from './Vaccine';

export interface Appointment {
    id: string;
    duration: number;
    date: Date;
    vaccine: Vaccine;
    provider: PublicProvider;
    bookings: Booking[];
    slots: Slot[];
    modified: undefined | true;
    // properties: Record<string, unknown>;
}
