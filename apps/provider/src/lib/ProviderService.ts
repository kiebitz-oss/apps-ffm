import {
  Appointment,
  AuthError,
  ProviderApi,
  ProviderInput,
  ProviderKeyPairs,
  UnpublishedPublicAppointment,
  Vaccine,
  VanellusConfig,
  VanellusError,
  VanellusStorage,
} from "vanellus";

export class ProviderService {
  protected providerApi: ProviderApi;
  protected storage: VanellusStorage;
  protected keyPairs?: ProviderKeyPairs | null;
  protected secret?: string | null;

  public constructor(readonly config: VanellusConfig) {
    this.providerApi = new ProviderApi(config);
    this.storage = new VanellusStorage("provider");
    this.keyPairs = this.storage.get<ProviderKeyPairs>("keyPairs", undefined);
    this.secret = this.storage.get<string | undefined>("secret", undefined);
  }

  public async authenticate(secret: string, keyPairs: ProviderKeyPairs) {
    this.secret = secret;
    this.keyPairs = keyPairs;

    this.storage.set("keyPairs", this.keyPairs);
    this.storage.set("secret", this.secret);

    // const backupData = await this.providerApi.restoreFromBackup(secret);

    return true;
  }

  public isAuthenticated() {
    return typeof this.keyPairs !== "object";
  }

  public async logout() {
    this.secret = undefined;
    this.keyPairs = undefined;

    await this.storage.removeAll();

    return true;
  }

  public async register(providerInput: ProviderInput, signupCode?: string) {
    this.keyPairs = await this.providerApi.generateKeyPairs();
    this.secret = this.providerApi.generateSecret();

    this.storage.set("keyPairs", this.keyPairs);
    this.storage.set("secret", this.secret);

    const provider = await this.providerApi.storeProvider(
      providerInput,
      this.getKeyPairs(),
      signupCode
    );

    return provider;
  }

  public async createAppointment(
    start: Date,
    duration: number,
    vaccine: Vaccine,
    slotCount: number
  ) {
    const { verifiedProvider } = await this.getProviderData();

    if (!verifiedProvider) {
      console.error(verifiedProvider);
      throw new AuthError("");
    }

    return this.providerApi.createAppointment(
      start,
      duration,
      vaccine,
      slotCount,
      verifiedProvider,
      this.getKeyPairs()
    );
  }

  public async createAppointmentSeries(
    startAt: Date,
    endAt: Date,
    interval: number,
    vaccine: Vaccine,
    lanes: number
  ) {
    const { verifiedProvider } = await this.getProviderData();

    if (!verifiedProvider) {
      console.error(verifiedProvider);
      throw new AuthError("");
    }

    return this.providerApi.createAppointmentSeries(
      startAt,
      endAt,
      interval,
      lanes,
      vaccine,
      verifiedProvider,
      this.getKeyPairs()
    );
  }

  public async getProviderAppointments(from: Date, to: Date) {
    return this.providerApi.getProviderAppointments(
      from,
      to,
      this.getKeyPairs()
    );
  }

  public async publishAppointments(
    unpublishedAppointments: UnpublishedPublicAppointment[]
  ) {
    return this.providerApi.publishAppointments(
      unpublishedAppointments,
      this.getKeyPairs()
    );
  }

  public async cancelAppointment(appointment: Appointment) {
    return this.providerApi.cancelAppointment(appointment, this.getKeyPairs());
  }

  public async storeProvider(providerInput: ProviderInput, code?: string) {
    return this.providerApi.storeProvider(
      providerInput,
      this.getKeyPairs(),
      code
    );
  }

  public async createBackup() {
    if (!this.secret) {
      throw new VanellusError("could not backup");
    }

    const providerData = await this.getProviderData();

    this.providerApi.backupData(
      {
        publicProvider: providerData.publicProvider || undefined,
        verifiedProvider: providerData.verifiedProvider || undefined,
      },
      this.secret
    );

    return Promise.resolve({
      secret: this.secret,
      keyPairs: this.keyPairs,
    });
  }

  public getSecret() {
    return this.secret;
  }

  public getKeyPairs() {
    if (!this.keyPairs) {
      throw new AuthError();
    }

    return this.keyPairs;
  }

  public getProviderData() {
    return this.providerApi.checkProvider(this.getKeyPairs());
  }
}
