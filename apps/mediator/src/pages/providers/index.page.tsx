import { Title } from "@kiebitz-oss/common";
import { Trans } from "@lingui/macro";
import { ProviderList } from "components/providers";
import { useApp } from "lib/AppProvider";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Provider } from "vanellus";

const ProvidersPage: NextPage = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const { api } = useApp();
  const router = useRouter();

  useEffect(() => {
    try {
      api.getProviders().then((providers) => {
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
