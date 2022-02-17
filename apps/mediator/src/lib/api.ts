import { getApiConfig } from "@impfen/common";
import { get } from "svelte/store";
import {
  AuthError,
  MediatorApi,
  type MediatorKeyPairs,
  type Provider,
} from "vanellus";
import { keyPairs } from "./stores";

const api = new MediatorApi(getApiConfig());

export const getProvider = (providerId: string) => {
  return api.getProvider(providerId, getKeyPairs());
};

export const confirmProvider = async (provider: Provider) => {
  return api.confirmProvider(provider, getKeyPairs());
};

export const getVerifiedProviders = async () => {
  return api.getVerifiedProviders(getKeyPairs());
};

export const getPendingProviders = async () => {
  return api.getPendingProviders(getKeyPairs());
};

export const getProviders = async () => {
  return api.getProviders(getKeyPairs());
};

export const logout = () => keyPairs.set(null);

export const login = async (newKeyPairs: MediatorKeyPairs) => {
  if (api.isValidKeyPairs(newKeyPairs)) {
    keyPairs.set(newKeyPairs);

    return true;
  }

  throw new AuthError("Could not login or verify data");
};

export const getKeyPairs = () => get(keyPairs);
