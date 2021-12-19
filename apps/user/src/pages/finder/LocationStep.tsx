import type { PublicProvider } from "@kiebitz-oss/api";
import { CheckboxField, Text, Title } from "@kiebitz-oss/ui";
import { t, Trans } from "@lingui/macro";
import { BackLink } from "components/common/BackLink";
import { ProviderCard } from "components/common/ProviderCard";
import { Link } from "components/Link";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useUserApi } from "../UserApiContext";
import { Types, useFinderState } from "./FinderStateProvider";

export const LocationStep: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [filterAccessible, setFilterAccessible] = useState<boolean>(false);
  const [providers, setProviders] = useState<PublicProvider[]>([]);
  const api = useUserApi();
  const { dispatch, state } = useFinderState();

  useEffect(() => {
    api.getProvidersByZip(30363, 10).then((providers) => {
      setLoading(false);
      setProviders(providers);
    });
  }, [api]);

  const onClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    const id = event.currentTarget.dataset["id"];

    dispatch({
      type: Types.SET_PROVIDER,
      payload: { provider: providers[Number(id) - 1] },
    });
  };

  const onFilterAccessibleChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setFilterAccessible(event.currentTarget.checked);
  };

  return (
    <main id="finder-location">
      <BackLink href="/">
        <Trans id="user.finder.location.back-link">
          Zurück zu den allgemeinen Informationen
        </Trans>
      </BackLink>

      <Title variant="h1" as="h2">
        <Trans id="user.finder.location.title">Impfstellen</Trans>
      </Title>

      <Text variant="text2" className="mb-8">
        <Trans id="user.finder.location.intro">
          Wählen Sie aus den möglichen Optionen, wo Sie geimpft werden möchten.
        </Trans>
      </Text>

      <div className="mx-4 mb-8 md:max-w-3xl lg:mx-8">
        <CheckboxField
          label={t({
            id: "user.finder.location.accessible.label",
            message: "Nur barrierefreie Impfstellen",
          })}
          name="accessible"
          onChange={onFilterAccessibleChange}
        />
      </div>

      <ul className="flex flex-col gap-4 w-full md:px-0 md:max-w-3xl">
        {providers
          .filter((provider) => {
            if (!filterAccessible) {
              return true;
            }

            return provider.accessible;
          })
          .map((provider) => (
            <li key={provider.id}>
              <Link
                href="/finder/appointment"
                onClick={onClick}
                data-id={provider.id}
              >
                <ProviderCard provider={provider} />
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
};
