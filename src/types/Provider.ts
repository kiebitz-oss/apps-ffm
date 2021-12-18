import { Appointment } from "./Appointment";

export interface PublicProvider {
  id: string;
  name: string;
  street: string;
  city: string;
  zipCode: string;
  accessible: boolean;
  description?: string;
  verified: boolean;
}

export interface Provider extends PublicProvider {
  appointments: Appointment[];

  email?: string;
  phone?: string;
  website?: string;
  description?: string;
}
