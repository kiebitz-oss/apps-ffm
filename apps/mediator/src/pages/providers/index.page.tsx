import { Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Provider } from "vanellus";
import { useMediatorApi } from "../MediatorApiContext";
import { ProviderList } from "./ProvidersList";

const ProvidersPage: NextPage = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const api = useMediatorApi();
  const router = useRouter();

  useEffect(() => {
    try {
      api.getVerifiedProviders().then((providers) => {
        setProviders(providers);
      });
    } catch (error) {
      router.push("/");
    }
  }, [api, router]);

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
