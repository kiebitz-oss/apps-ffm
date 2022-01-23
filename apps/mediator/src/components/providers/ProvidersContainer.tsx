import { getPendingProviders, getVerifiedProviders } from "stores/app";
import { suspend } from "suspend-react";
import type { Provider } from "vanellus";
import { ProviderList } from "./ProvidersList";

interface ProvidersContainerProps {
  pending?: boolean;
}

export const ProvidersContainer: React.FC<ProvidersContainerProps> = ({
  pending = true,
}) => {
  const providers: Provider[] = suspend(async () => {
    return pending ? getPendingProviders() : getVerifiedProviders();
  }, [pending]);

  return <ProviderList providers={providers} />;
};
