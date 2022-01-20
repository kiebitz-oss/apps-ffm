import type { Provider, VanellusConfig } from "vanellus";
import {
  AuthError,
  MediatorApi,
  MediatorKeyPairs,
  VanellusStorage,
} from "vanellus";

/**
 * High-level-API for the mediator.
 */
export class MediatorService {
  protected mediatorApi: MediatorApi;
  protected keyPairs?: MediatorKeyPairs | null;
  protected storage: VanellusStorage;

  public constructor(readonly config: VanellusConfig) {
    this.mediatorApi = new MediatorApi(config);
    this.storage = new VanellusStorage("mediator");
    this.keyPairs = this.storage.get<MediatorKeyPairs>("keyPairs", undefined);
  }

  public authenticate(keyPairs: MediatorKeyPairs) {
    this.keyPairs = keyPairs;
    this.storage.set("keyPairs", keyPairs);

    return true;
  }

  public isAuthenticated() {
    return typeof this.keyPairs === "object";
  }

  public async logout() {
    this.keyPairs = null;
    await this.storage.removeAll();

    return true;
  }

  public async getProviders() {
    const providers = await Promise.all([
      this.mediatorApi.getPendingProviders(this.getKeyPairs()),
      this.mediatorApi.getVerifiedProviders(this.getKeyPairs()),
    ]);

    return providers[0].concat(providers[1]);
  }

  public async confirmProvider(provider: Provider) {
    return this.mediatorApi.confirmProvider(provider, this.getKeyPairs());
  }

  public async getProvider(id: string) {
    const providers = await this.getProviders();

    return providers.find((provider) => provider.id === id) || null;
  }

  protected getKeyPairs() {
    if (!this.keyPairs) {
      this.logout();

      throw new AuthError();
    }

    return this.keyPairs;
  }
}
