import { Trans } from "@lingui/macro";
import { useMediatorApi } from "components/mediator/MediatorApiContext";
import { ProviderList } from "components/mediator/ProvidersList";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import type { Provider } from "types";
import { Title } from "ui";

const ProvidersPage: NextPage = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const api = useMediatorApi();

  useEffect(() => {
    api.getProviders().then((providers) => {
      setProviders(providers);
    });
  }, [api]);

  return (
    <main>
      <Title>
        <Trans id="mediator.providers.title">Impfanbieter</Trans>
      </Title>

      {providers.length > 0 ? (
        <ProviderList providers={providers} />
      ) : (
        <>Loading</>
      )}
    </main>
  );
};

export default ProvidersPage;
