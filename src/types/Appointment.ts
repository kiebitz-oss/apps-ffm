import { Booking } from './Booking';
import { Slot } from './Slot';

export interface Appointment {
    id: string;
    duration: number;
    maxOverlap: number;
    bookings: Booking[];
    properties: Record<string, unknown>;
    slot: Slot[];
}
