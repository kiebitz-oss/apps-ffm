import { persistantWriteable } from "@impfen/common";
import { writable } from "svelte/store";
import type { Provider, ProviderInput, ProviderKeyPairs } from "vanellus";

export const unverifiedProvider = persistantWriteable<ProviderInput>(
  "provider:unverifiedProvider"
);
export const verifiedProvider = persistantWriteable<Provider>(
  "provider:verifiedProvider"
);
export const secret = persistantWriteable<string>("provider:secret");
export const keyPairs =
  persistantWriteable<ProviderKeyPairs>("provider:keyPairs");

export const verified = writable<boolean>();
