import { Link } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { getProviders } from "stores/app";
import { setProvider } from "stores/finder";
import { preload, suspend } from "suspend-react";
import type { PublicProvider } from "vanellus";
import { ProviderCard } from "./ProviderCard";

const fetchProviders = async () => {
  return getProviders();
};

preload(fetchProviders, ["v0"], {
  lifespan: 5 * 60 * 1000 /* 5 minutes cache in miliseconds */,
});

interface ProvidersListProps {
  accessible?: true;
}

export const ProvidersList: FC<ProvidersListProps> = ({ accessible }) => {
  const router = useRouter();
  const providers = suspend(fetchProviders, ["v0"], {
    lifespan: 5 * 60 * 1000 /* 5 minutes cache in miliseconds */,
  });

  const [filteredProviders, setFilteredProviders] = useState<PublicProvider[]>(
    []
  );

  useEffect(() => {
    setFilteredProviders(
      accessible === true
        ? providers?.filter((provider) => provider.accessible === true)
        : providers
    );
  }, [accessible, providers]);

  if (filteredProviders?.length < 1) {
    return (
      <Trans id="user.finder.location.no-provider">
        Leider wurden keine passenden Impfstellen gefunden.
      </Trans>
    );
  }

  return (
    <ul className="grid grid-flow-row gap-4 md:px-0 md:max-w-2xl">
      {filteredProviders?.map((provider) => (
        <li key={provider.id}>
          <Link
            data-id={provider.id}
            href="/finder/appointment"
            onClick={(event) => {
              event.preventDefault();
              setProvider(provider);
              router.push("/finder/appointment");
            }}
            className="block"
          >
            <ProviderCard provider={provider} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
