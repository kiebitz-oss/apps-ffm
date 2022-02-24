import { getApiConfig } from "@impfen/common";
import { get } from "svelte/store";
import {
  AuthError,
  MediatorApi,
  type MediatorKeyPairs,
  type Provider,
} from "vanellus";
import { keyPairs } from "./stores";

let api: MediatorApi;

const getApi = async () => {
  return !api ? (api = new MediatorApi(await getApiConfig())) : api;
};

export const getProvider = async (providerId: string) => {
  return (await getApi()).getProvider(providerId, getKeyPairs());
};

export const confirmProvider = async (provider: Provider) => {
  return (await getApi()).confirmProvider(provider, getKeyPairs());
};

export const getVerifiedProviders = async () => {
  return (await getApi()).getVerifiedProviders(getKeyPairs());
};

export const getPendingProviders = async () => {
  return (await getApi()).getPendingProviders(getKeyPairs());
};

export const getProviders = async () => {
  return (await getApi()).getProviders(getKeyPairs());
};

export const logout = () => keyPairs.set(null);

export const login = async (newKeyPairs: MediatorKeyPairs) => {
  if ((await getApi()).isValidKeyPairs(newKeyPairs)) {
    keyPairs.set(newKeyPairs);

    return true;
  }

  throw new AuthError("Could not login or verify data");
};

export const getKeyPairs = () => get(keyPairs);
