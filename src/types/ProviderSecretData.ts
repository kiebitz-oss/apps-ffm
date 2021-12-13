import { ProviderKeyPair } from './ProviderKeyPair';

export interface ProviderSecretData {
    secret: string;
    keyPair: ProviderKeyPair;
}
