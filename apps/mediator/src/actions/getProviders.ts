import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";

export const getProviders = async () => {
  const api = getApi();
  const keyPairs = getKeyPairs();

  const [pendingProviders, verifiedProviders] = await Promise.all([
    api.getPendingProviders(keyPairs),
    api.getVerifiedProviders(keyPairs),
  ]);

  return [...pendingProviders, ...verifiedProviders];
};
