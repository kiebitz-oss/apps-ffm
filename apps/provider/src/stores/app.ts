import { getApiConfig } from "@impfen/common";
import {
  AnonymousApi,
  Appointment,
  AuthError,
  ProviderApi,
  ProviderInput,
  ProviderKeyPairs,
  UnpublishedPublicAppointment,
  Vaccine,
} from "vanellus";
import create from "zustand";
import { persist } from "zustand/middleware";

let anonymousApi: AnonymousApi;

export const getAnonymousApi = () => {
  return !anonymousApi
    ? (anonymousApi = new AnonymousApi(getApiConfig()))
    : anonymousApi;
};

let providerApi: ProviderApi;

export const getApi = () => {
  return !providerApi
    ? (providerApi = new ProviderApi(getApiConfig()))
    : providerApi;
};

type AppState = {
  secret?: string;
  keyPairs?: ProviderKeyPairs;
};

export const useApp = create<AppState>(
  persist(() => ({}), {
    name: "provider:app",
  })
);

export const createAppointment = async (
  start: Date,
  duration: number,
  vaccine: Vaccine,
  slotCount: number
) => {
  const { verifiedProvider } = await getProviderData();

  if (!verifiedProvider) {
    throw new AuthError("Please authenticate");
  }

  const appointment = getApi().createAppointment(
    start,
    duration,
    vaccine,
    slotCount,
    verifiedProvider,
    getKeyPairs()
  );

  return publishAppointments([appointment]);
};

export const createAppointmentSeries = async (
  startAt: Date,
  endAt: Date,
  interval: number,
  vaccine: Vaccine,
  lanes: number
) => {
  const api = getApi();
  const { verifiedProvider } = await getProviderData();

  if (!verifiedProvider) {
    throw new AuthError("Please authenticate");
  }

  const series = api.createAppointmentSeries(
    startAt,
    endAt,
    interval,
    lanes,
    vaccine,
    verifiedProvider,
    getKeyPairs()
  );

  return publishAppointments(series.appointments);
};

export const cancelAppointment = (appointment: Appointment) => {
  return getApi().cancelAppointment(appointment, getKeyPairs());
};

export const getProviderAppointments = (from: Date, to: Date) => {
  return getApi().getProviderAppointments(from, to, getKeyPairs());
};

export const getProviderData = () => {
  return getApi().checkProvider(getKeyPairs());
};

export const storeProvider = (providerInput: ProviderInput, code?: string) => {
  return getApi().storeProvider(providerInput, getKeyPairs(), code);
};

export const register = async (
  providerInput: ProviderInput,
  signupCode?: string
) => {
  const api = getApi();

  const keyPairs = await getApi().generateKeyPairs();
  const secret = await getApi().generateSecret();

  useApp.setState({
    keyPairs,
    secret,
  });

  return api.storeProvider(providerInput, keyPairs, signupCode);
};

export const authenticate = async (
  secret: string,
  keyPairs: ProviderKeyPairs
) => {
  await setKeyPairs(keyPairs);
  await setSecret(secret);

  return true;
};

export const logout = async () => {
  reset();

  return true;
};

export const isAuthenticated = () => {
  const state = useApp.getState();

  return state.keyPairs && state.secret;
};

export const getKeyPairs = () => {
  const keyPairs = useApp.getState().keyPairs;

  if (!keyPairs) {
    throw new AuthError("Please authenticate");
  }

  return keyPairs;
};

export const backup = async () => {
  // const api = getApi();
  // const state = useApp.getState();
  // const providerData = await getProviderData();
  // const keyPairs = getKeyPairs();

  // await api.backupData(
  //   {
  //     publicProvider: providerData.publicProvider || undefined,
  //     verifiedProvider: providerData.verifiedProvider || undefined,
  //   },
  //   secret
  // );

  const state = useApp.getState();

  if (!state.secret || !state.keyPairs) {
    throw new AuthError("error...");
  }

  return Promise.resolve({
    secret: state.secret,
    keyPairs: state.keyPairs,
  });
};

export const restore = async (secret: string, keyPairs: ProviderKeyPairs) => {
  return true;
};

// Private helpers
const publishAppointments = (
  unpublishedAppointments: UnpublishedPublicAppointment[]
) => {
  return getApi().publishAppointments(unpublishedAppointments, getKeyPairs());
};

const setKeyPairs = async (keyPairs: ProviderKeyPairs) => {
  // checks if a keyPair is valid
  // const isValid = await getApi().isValidKeyPairs(keyPairs);

  // if (!isValid) {
  //   throw new AuthError("Please authenticate");
  // }

  return useApp.setState({ keyPairs });
};

const setSecret = async (secret: string) => {
  return useApp.setState({ secret });
};

const reset = () => useApp.setState({}, true);
