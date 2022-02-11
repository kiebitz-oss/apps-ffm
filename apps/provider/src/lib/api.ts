import { keyPairs, verifiedProvider } from "$lib/stores";
import type { Vaccine } from "@impfen/common";
import { getApiConfig } from "@impfen/common";
import type { Dayjs } from "dayjs";
import { get } from "svelte/store";
import type {
  AESData,
  Appointment,
  Provider,
  ProviderInput,
  ProviderKeyPairs,
  UnpublishedPublicAppointment,
} from "vanellus";
import { AnonymousApi, AuthError, ProviderApi } from "vanellus";
import { secret, unverifiedProvider } from "./stores";

let anonymousApi: AnonymousApi<Vaccine>;

export const getAnonymousApi = () => {
  return !anonymousApi
    ? (anonymousApi = new AnonymousApi<Vaccine>(getApiConfig()))
    : anonymousApi;
};

let providerApi: ProviderApi<Vaccine>;

export const getApi = () => {
  return !providerApi
    ? (providerApi = new ProviderApi<Vaccine>(getApiConfig()))
    : providerApi;
};

export const createAppointment = async (
  start: Dayjs,
  duration: number,
  vaccine: Vaccine,
  slotCount: number
) => {
  const appointment = getApi().createAppointment(
    start,
    duration,
    vaccine,
    slotCount,
    getVerifiedProvider(),
    getKeyPairs()
  );

  return publishAppointments([appointment]);
};

export const createAppointmentSeries = async (
  startAt: Dayjs,
  endAt: Dayjs,
  interval: number,
  vaccine: Vaccine,
  lanes: number
) => {
  const api = getApi();
  const series = api.createAppointmentSeries(
    startAt,
    endAt,
    interval,
    lanes,
    vaccine,
    getVerifiedProvider(),
    getKeyPairs()
  );

  return publishAppointments(series.appointments);
};

export const cancelAppointment = (appointment: Appointment<Vaccine>) => {
  return getApi().cancelAppointment(appointment, getKeyPairs());
};

export const getProviderAppointments = (from: Dayjs, to?: Dayjs) => {
  to = to ? to : from.add(1, "day");

  return getApi().getProviderAppointments(from, to, getKeyPairs());
};

export const getProviderData = async () => {
  return getApi().checkProvider(getKeyPairs());
};

export const storeProvider = async (
  providerInput: ProviderInput,
  code?: string
) => {
  const keyPairs = getKeyPairs();

  const unverifiedProvider = await getApi().storeProvider(
    {
      name: String(providerInput.name),
      street: String(providerInput.street),
      zipCode: String(providerInput.zipCode),
      city: String(providerInput.city),
      email: String(providerInput.email),
      description: String(providerInput.description || ""),
      website: String(providerInput.website || ""),
      accessible: Boolean(providerInput.accessible || false),
    },
    keyPairs,
    code
  );

  setUnverifiedProvider(unverifiedProvider);

  return unverifiedProvider;
};

export const register = async (
  providerInput: ProviderInput,
  signupCode?: string
) => {
  const api = getApi();

  const newKeyPairs = await api.generateKeyPairs();
  const newSecret = api.generateSecret();

  setSecret(newSecret);
  await setKeyPairs(newKeyPairs, false);

  return storeProvider(providerInput, signupCode);
};

export const login = async (backupData: AESData, newSecret: string) => {
  const backup = await restore(backupData, newSecret);

  setUnverifiedProvider(backup.publicProvider);
  setSecret(newSecret);
  await setKeyPairs(backup.providerKeyPairs);

  return true;
};

export const logout = async () => {
  await backup();

  reset();

  return true;
};

export const isAuthenticated = () => {
  return keyPairs && secret;
};

export const backup = async () => {
  const api = getApi();

  if (!secret || !keyPairs) {
    throw new AuthError("error...");
  }

  return api.backupData(getUnverifiedProvider(), getKeyPairs(), getSecret());
};

export const restore = async (
  encryptedLocalBackup: AESData,
  secret: string
) => {
  return getApi().restoreFromBackup(encryptedLocalBackup, secret);
};

// Private helpers
const setKeyPairs = async (newKeyPairs: ProviderKeyPairs, doCheck = true) => {
  // checks if a keyPair is valid
  if (doCheck) {
    const isValid = await getApi().isValidKeyPairs(newKeyPairs);

    if (!isValid) {
      throw new AuthError("Please authenticate");
    }
  }

  return keyPairs.set(newKeyPairs);
};

const getKeyPairs = () => {
  const savedKeyPairs = get(keyPairs);

  if (!savedKeyPairs) {
    throw new AuthError("Please authenticate");
  }

  return savedKeyPairs;
};

const setSecret = (newSecret: string) => {
  if (!newSecret) {
    throw new AuthError("Please authenticate");
  }

  return secret.set(newSecret);
};

const getSecret = () => {
  const savedSecret = get(secret);

  if (!savedSecret) {
    throw new AuthError("Please authenticate");
  }

  return savedSecret;
};

const setUnverifiedProvider = (newUnverifiedProvider: Provider) => {
  return unverifiedProvider.set(newUnverifiedProvider);
};

const getUnverifiedProvider = () => {
  return get(unverifiedProvider);
};

const getVerifiedProvider = () => {
  return get(verifiedProvider);
};

const publishAppointments = (
  unpublishedAppointments: UnpublishedPublicAppointment<Vaccine>[]
) => {
  return getApi().publishAppointments(unpublishedAppointments, getKeyPairs());
};

export const reset = () => {
  keyPairs.set(null);
  secret.set(null);
  unverifiedProvider.set(null);
  verifiedProvider.set(null);

  localStorage.clear();
  sessionStorage.clear();
};
