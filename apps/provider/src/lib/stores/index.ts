import { persistantWriteable } from "@impfen/common";
import type { Provider, ProviderInput, ProviderKeyPairs } from "vanellus";

export const unverifiedProvider = persistantWriteable<ProviderInput>(
  "mediator:unverifiedProvider"
);
export const verifiedProvider = persistantWriteable<Provider>(
  "mediator:verifiedProvider"
);
export const secret = persistantWriteable<string>("mediator:secret");
export const keyPairs =
  persistantWriteable<ProviderKeyPairs>("mediator:keyPairs");
