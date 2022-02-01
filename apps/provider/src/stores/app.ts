import type { Vaccine } from "@impfen/common";
import { getApiConfig } from "@impfen/common";
import type { Dayjs } from "dayjs";
import type { Provider } from "vanellus";
import {
  AnonymousApi,
  Appointment,
  AuthError,
  ProviderApi,
  ProviderInput,
  ProviderKeyPairs,
  UnpublishedPublicAppointment,
} from "vanellus";
import create from "zustand";
import { persist } from "zustand/middleware";

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

type AppState = {
  secret?: string;
  keyPairs?: ProviderKeyPairs;
  unverifiedProvider?: Provider;
  verifiedProvider?: Provider;
};

export const useApp = create<AppState>(
  persist(() => ({}), {
    name: "provider:app",
  })
);

export const createAppointment = async (
  start: Dayjs,
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
  startAt: Dayjs,
  endAt: Dayjs,
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

export const cancelAppointment = (appointment: Appointment<Vaccine>) => {
  return getApi().cancelAppointment(appointment, getKeyPairs());
};

export const getProviderAppointments = (from: Dayjs, to?: Dayjs) => {
  to = to ? to : from.add(1, "day");

  return getApi().getProviderAppointments(from, to, getKeyPairs());
};

export const setUnverifiedProvider = (unverifiedProvider: Provider) => {
  useApp.setState({
    unverifiedProvider,
  });

  return unverifiedProvider;
};

export const getProviderData = async () => {
  return getApi().checkProvider(getKeyPairs());
};

export const storeProvider = async (
  providerInput: ProviderInput,
  code?: string
) => {
  const unverifiedProvider = await getApi().storeProvider(
    providerInput,
    getKeyPairs(),
    code
  );

  return setUnverifiedProvider(unverifiedProvider);
};

export const register = async (
  providerInput: ProviderInput,
  signupCode?: string
) => {
  const api = getApi();

  const keyPairs = await api.generateKeyPairs();
  const secret = await api.generateSecret();

  useApp.setState({
    keyPairs,
    secret,
  });

  const unverifiedProvider = await storeProvider(providerInput, signupCode);

  useApp.setState({
    unverifiedProvider,
  });

  return unverifiedProvider;
};

export const authenticate = async (
  secret: string,
  keyPairs: ProviderKeyPairs
) => {
  let backup;

  try {
    backup = await restore(secret);
  } catch (error) {
    console.error(error);
  }

  useApp.setState(
    {
      verifiedProvider: backup?.verifiedProvider || undefined,
      unverifiedProvider: backup?.unverifiedProvider || undefined,
      secret,
      keyPairs,
    },
    true
  );

  return true;
};

export const logout = async () => {
  await backup();

  reset();

  return true;
};

export const useIsAuthenticated = () => {
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
  const api = getApi();
  const state = useApp.getState();

  if (!state.secret || !state.keyPairs) {
    throw new AuthError("error...");
  }

  const providerData = await getProviderData();

  const x = await api.backupData(
    {
      unverifiedProvider: state.unverifiedProvider || undefined,
      verifiedProvider: providerData.verifiedProvider || undefined,
    },
    state.secret
  );

  return Promise.resolve({
    secret: state.secret,
    keyPairs: state.keyPairs,
  });
};

export const restore = async (secret: string) => {
  return getApi().restoreFromBackup(secret);
};

// Private helpers
const publishAppointments = (
  unpublishedAppointments: UnpublishedPublicAppointment<Vaccine>[]
) => {
  return getApi().publishAppointments(unpublishedAppointments, getKeyPairs());
};

const reset = () => useApp.setState({}, true);
