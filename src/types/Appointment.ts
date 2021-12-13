import { PublicProvider } from './Provider';
import { Slot } from './Slot';

export interface Appointment {
    id: string;
    duration: number;
    date: Date;
    provider: PublicProvider;
    // bookings: Booking[];
    // properties: Record<string, unknown>;
    slots: Slot[];
}
