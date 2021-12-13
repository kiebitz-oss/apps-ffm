import { providers } from 'apps/data';
import type { MediatorKeyPairs, Provider } from 'types';

export class MediatorApi {
    protected keyPairs: MediatorKeyPairs | null = null;

    public async authenticate(keyPairs: MediatorKeyPairs): Promise<boolean> {
        this.keyPairs = keyPairs;

        return true;
    }

    public async isAuthenticated(): Promise<boolean> {
        return !!this.keyPairs;
    }

    public async logout(): Promise<boolean> {
        return true;
    }

    public async getProviders(): Promise<Provider[]> {
        return providers;
    }

    public async getProvider(providerId: string): Promise<Provider | null> {
        return providers[Number(providerId) - 1] || null;
    }

    public async confirmProvider(provider: Provider): Promise<boolean> {
        return false;
    }

    public async unconfirmProvider(provider: Provider): Promise<boolean> {
        return false;
    }

    public async reconfirmProvider(provider: Provider): Promise<boolean> {
        return false;
    }

    public async backupData(): Promise<MediatorKeyPairs> {
        return 'foobar' as unknown as any;
    }
}
