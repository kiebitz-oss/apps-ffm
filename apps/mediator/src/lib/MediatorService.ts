import {
  AuthError,
  MediatorApi,
  MediatorKeyPairs,
  Provider,
  VanellusConfig,
  VanellusStorage,
} from "vanellus";

/**
 * High-level-API for the mediator.
 */
export class MediatorService {
  protected mediatorApi: MediatorApi;
  protected keyPairs: MediatorKeyPairs | null = null;
  protected storage: VanellusStorage;

  public constructor(readonly config: VanellusConfig) {
    this.mediatorApi = new MediatorApi(config);
    this.storage = new VanellusStorage("mediator");

    if (typeof window !== "undefined") {
      this.keyPairs = this.storage.get<MediatorKeyPairs>("keyPairs", undefined);
    }
  }

  public authenticate(keyPairs: MediatorKeyPairs) {
    this.keyPairs = keyPairs;
    this.storage.set("keyPairs", keyPairs);

    return true;
  }

  public isAuthenticated() {
    return null !== this.keyPairs;
  }

  public logout() {
    this.keyPairs = null;
    this.storage.removeItem("keyPairs");

    return true;
  }

  public async confirmProvider(provider: Provider) {
    return this.mediatorApi.confirmProvider(provider, this.getKeyPairs());
  }

  /**
   *
   * @throws AuthError if proper keys are absent
   */
  public getPendingProviders(limit?: number) {
    return this.mediatorApi.getPendingProviders(this.getKeyPairs(), limit);
  }

  /**
   *
   * @throws AuthError if proper keys are absent
   */
  public getVerifiedProviders(limit?: number) {
    return this.mediatorApi.getVerifiedProviders(this.getKeyPairs(), limit);
  }

  protected getKeyPairs() {
    if (null === this.keyPairs) {
      this.keyPairs = null;
      this.storage.removeItem("keyPairs");

      throw new AuthError();
    }

    return this.keyPairs;
  }
}
