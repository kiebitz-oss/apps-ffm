import { getPendingProviders } from "actions";
import { getVerifiedProviders } from "actions/getVerifiedProviders";
import { suspensify } from "lib/suspensify";
import type { Provider } from "vanellus";
import { ProviderList } from "./ProvidersList";

const pendingProvidersResource = suspensify<Provider[]>(getPendingProviders());
const verifiedProvidersResource = suspensify<Provider[]>(
  getVerifiedProviders()
);

interface ProvidersContainerProps {
  pending?: boolean;
}

export const ProvidersContainer: React.FC<ProvidersContainerProps> = ({
  pending = true,
}) => {
  const providers = pending
    ? pendingProvidersResource.read()
    : verifiedProvidersResource.read();

  return <ProviderList providers={providers} />;
};
