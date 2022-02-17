import { persistantWriteable } from "@impfen/common";
import { writable } from "svelte/store";
import type {
  CreateProviderInput,
  Provider,
  ProviderKeyPairs,
  UpdateProviderInput,
} from "vanellus";

export const newProvider = writable<CreateProviderInput>();

export const unverifiedProvider = persistantWriteable<UpdateProviderInput>(
  "provider:unverifiedProvider"
);
export const verifiedProvider = persistantWriteable<Provider>(
  "provider:verifiedProvider"
);
export const secret = persistantWriteable<string>("provider:secret");
export const keyPairs =
  persistantWriteable<ProviderKeyPairs>("provider:keyPairs");

export const verified = writable<boolean>();
