import { getApiConfig, type Vaccine } from "@impfen/common";
import type { Dayjs } from "dayjs";
import { get } from "svelte/store";
import type {
  AESData,
  Appointment,
  CreateProviderInput,
  Provider,
  ProviderKeyPairs,
  UnpublishedPublicAppointment,
  UpdateProviderInput,
} from "vanellus";
import { AuthError, ProviderApi } from "vanellus";
import {
  keyPairs,
  secret,
  unverifiedProvider,
  verifiedProvider,
} from "./stores";

let api: ProviderApi<Vaccine>;

const getApi = async () => {
  return !api ? (api = new ProviderApi<Vaccine>(await getApiConfig())) : api;
};

export const createAppointment = async (
  start: Dayjs,
  duration: number,
  vaccine: Vaccine,
  slotCount: number
) => {
  const appointment = (await getApi()).createAppointment(
    start,
    duration,
    vaccine,
    slotCount,
    get(verifiedProvider),
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
  const series = (await getApi()).createAppointmentSeries(
    startAt,
    endAt,
    interval,
    lanes,
    vaccine,
    get(verifiedProvider),
    getKeyPairs()
  );

  return publishAppointments(series.appointments);
};

export const cancelAppointment = async (appointment: Appointment<Vaccine>) => {
  return (await getApi()).cancelAppointment(appointment, getKeyPairs());
};

export const cancelAppointmentSeries = async (seriesId: string) => {
  return (await getApi()).cancelAppointmentSeries(seriesId, getKeyPairs());
};

export const getProviderAppointments = async (from: Dayjs, to?: Dayjs) => {
  to = to ? to : from.add(1, "day");

  return (await getApi()).getProviderAppointments(from, to, getKeyPairs());
};

export const getVerifiedProvider = async () => {
  try {
    const verifiedProviderData = await (
      await getApi()
    ).checkProvider(getKeyPairs());

    verifiedProvider.set(verifiedProviderData);

    return verifiedProviderData;
  } catch (error) {
    return null;
  }
};

export const updateProvider = async (provider: UpdateProviderInput) => {
  const keyPairs = getKeyPairs();

  const updatedProvider = await (
    await getApi()
  ).updateProvider(
    {
      ...provider,
      name: String(provider.name),
      street: String(provider.street),
      zipCode: String(provider.zipCode),
      city: String(provider.city),
      email: String(provider.email),
      description: String(provider.description || ""),
      website: String(provider.website || ""),
      accessible: Boolean(provider.accessible || false),
    },
    keyPairs
  );

  setUnverifiedProvider(updatedProvider);

  return updatedProvider;
};

export const createProvider = async (
  providerInput: CreateProviderInput,
  signupCode?: string
) => {
  const newKeyPairs = await (await getApi()).generateKeyPairs();
  const newSecret = (await getApi()).generateSecret();

  setSecret(newSecret);
  await setKeyPairs(newKeyPairs, false);

  const unverifiedProvider = await (
    await getApi()
  ).createProvider(
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
    newKeyPairs,
    signupCode
  );

  setUnverifiedProvider(unverifiedProvider);

  return unverifiedProvider;
};

export const login = async (backupData: AESData, newSecret: string) => {
  const backup = await restore(backupData, newSecret);

  const isValidKeyPairs = await (
    await getApi()
  ).isValidKeyPairs(backup.providerKeyPairs);

  if (isValidKeyPairs) {
    setUnverifiedProvider(backup.publicProvider);
    setSecret(newSecret);
    await setKeyPairs(backup.providerKeyPairs);

    return true;
  }

  throw new AuthError("Could not login or verify data");
};

export const logout = async () => {
  await backup();

  reset();

  return true;
};

export const isAuthenticated = () => {
  return keyPairs && secret;
};

export const isVerified = async () => {
  if (!keyPairs) {
    return false;
  }

  try {
    const isVerified = await (
      await getApi()
    ).isValidatedKeyPairs(getKeyPairs());

    return isVerified;
  } catch (e) {
    return false;
  }
};

export const backup = async () => {
  if (!secret || !keyPairs) {
    throw new AuthError("error...");
  }

  return (await getApi()).backupData(
    getUnverifiedProvider(),
    getKeyPairs(),
    getSecret()
  );
};

export const restore = async (
  encryptedLocalBackup: AESData,
  secret: string
) => {
  return (await getApi()).restoreFromBackup(encryptedLocalBackup, secret);
};

// Private helpers
const setKeyPairs = async (newKeyPairs: ProviderKeyPairs, doCheck = true) => {
  // checks if a keyPair is valid
  if (doCheck) {
    const isValid = await (await getApi()).isValidKeyPairs(newKeyPairs);

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

const publishAppointments = async (
  unpublishedAppointments: UnpublishedPublicAppointment<Vaccine>[]
) => {
  return (await getApi()).publishAppointments(
    unpublishedAppointments,
    getKeyPairs()
  );
};

export const reset = () => {
  keyPairs.set(null);
  secret.set(null);
  unverifiedProvider.set(null);
  verifiedProvider.set(null);

  localStorage.clear();
  sessionStorage.clear();
};
