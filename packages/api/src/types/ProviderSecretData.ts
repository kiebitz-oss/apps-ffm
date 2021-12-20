import { ActorKey } from "vanellus";

export interface ProviderSecretData {
  secret: string;
  keyPair: ActorKey | null;
}
