import { getApiConfig } from "@impfen/common";
import { get } from "svelte/store";
import type { MediatorKeyPairs, Provider } from "vanellus";
import { MediatorApi } from "vanellus";
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
  const [pendingProviders, verifiedProviders] = await Promise.all([
    getPendingProviders(),
    getVerifiedProviders(),
  ]);

  return [...pendingProviders, ...verifiedProviders];
};

export const logout = () => keyPairs.set(null);

export const login = (newKeyPairs: MediatorKeyPairs) =>
  keyPairs.set(newKeyPairs);

export const getKeyPairs = () => get(keyPairs);
