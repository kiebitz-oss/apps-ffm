import { api } from "lib/AppProvider";
import { suspensify } from "lib/suspensify";
import type { Provider } from "vanellus";
import { ProviderList } from "./ProvidersList";

const fetchProviders = () => suspensify<Provider[]>(api.getProviders());

const providersResource = fetchProviders();

export const ProvidersContainer: React.FC = () => {
  const loadedProviders = providersResource.read();

  return <ProviderList providers={loadedProviders} />;
};
