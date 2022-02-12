import { persistantWriteable } from "@impfen/common";
import type { MediatorKeyPairs } from "vanellus";

export const keyPairs =
  persistantWriteable<MediatorKeyPairs>("mediator:keypairs");
