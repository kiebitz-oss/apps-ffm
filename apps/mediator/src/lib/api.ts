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

const getApi = () => {
  return !api ? (api = new MediatorApi(getApiConfig())) : api;
};

export const getProvider = (providerId: string) => {
  return getApi().getProvider(providerId, getKeyPairs());
};

export const confirmProvider = async (provider: Provider) => {
  return getApi().confirmProvider(provider, getKeyPairs());
};

export const getVerifiedProviders = async () => {
  return getApi().getVerifiedProviders(getKeyPairs());
};

export const getPendingProviders = async () => {
  return getApi().getPendingProviders(getKeyPairs());
};

export const getProviders = async () => {
  return getApi().getProviders(getKeyPairs());
};

export const logout = () => keyPairs.set(null);

export const login = async (newKeyPairs: MediatorKeyPairs) => {
  if (getApi().isValidKeyPairs(newKeyPairs)) {
    keyPairs.set(newKeyPairs);

    return true;
  }

  throw new AuthError("Could not login or verify data");
};

export const getKeyPairs = () => get(keyPairs);
