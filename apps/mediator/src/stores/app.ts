import { getApiConfig } from "@impfen/common";
import type { MediatorKeyPairs, Provider } from "vanellus";
import { AuthError, MediatorApi } from "vanellus";
import create from "zustand";
import { persist } from "zustand/middleware";

let api: MediatorApi;

export const getApi = () => {
  if (!api) {
    api = new MediatorApi(getApiConfig());
  }

  return api;
};

type useApp = {
  keyPairs?: MediatorKeyPairs;
};

export const useApp = create<useApp>(
  persist(() => ({}), {
    name: "mediator:app",
  })
);

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
  const [pendingProviders, verifiedProviders] = await Promise.all([
    getPendingProviders(),
    getVerifiedProviders(),
  ]);

  return [...pendingProviders, ...verifiedProviders];
};

export const authenticate = async (keyPairs: MediatorKeyPairs) => {
  await setKeyPairs(keyPairs);

  return true;
};

export const logout = async () => {
  reset();

  return true;
};

export const useIsAuthenticated = () => {
  return Boolean(useApp.getState().keyPairs);
};

export const getKeyPairs = () => {
  const keyPairs = useApp.getState().keyPairs;

  if (!keyPairs) {
    throw new AuthError("Please authenticate");
  }

  return keyPairs;
};

// Private helpers
const setKeyPairs = async (keyPairs: MediatorKeyPairs) => {
  // checks if a keyPair is valid
  const isValid = await getApi().isValidKeyPairs(keyPairs);

  if (!isValid) {
    throw new AuthError("Please authenticate");
  }

  return useApp.setState({ keyPairs });
};

const reset = () => useApp.setState({}, true);
