import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";
import { getProviderData } from "./getProviderData";
import { getSecret } from "./getSecret";

export const backup = async () => {
  const api = getApi();
  const secret = getSecret();
  const providerData = await getProviderData();
  const keyPairs = getKeyPairs();

  await api.backupData(
    {
      publicProvider: providerData.publicProvider || undefined,
      verifiedProvider: providerData.verifiedProvider || undefined,
    },
    secret
  );

  return Promise.resolve({
    secret: secret,
    keyPairs: keyPairs,
  });
};
