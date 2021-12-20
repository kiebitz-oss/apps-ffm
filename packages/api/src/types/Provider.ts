import type { PublicProviderData as VanellusPublicProviderData } from "vanellus";
import type { Appointment } from "./Appointment";

export interface PublicProvider extends VanellusPublicProviderData {
  // name: string;
  // street: string;
  // city: string;
  // zipCode: string;
  // description: string;

  id: string;
  accessible: boolean;
  verified: boolean;
  // description?: string;
}

export interface Provider extends PublicProvider {
  appointments: Appointment[];

  email?: string;
  phone?: string;
  website?: string;
}
