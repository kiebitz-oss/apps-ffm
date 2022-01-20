import { BackLink, Button, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useApp } from "lib/AppProvider";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Provider } from "vanellus";

const ProviderShowPage: NextPage = () => {
  const [provider, setProvider] = useState<Provider | null>(null);

  const router = useRouter();
  const { api } = useApp();

  const id = router.query?.id
    ? decodeURIComponent(
        Buffer.from(router.query?.id as string, "hex").toString()
      )
    : null;

  useEffect(() => {
    if (id) {
      api.getProvider(id).then(setProvider);
    }
  }, [api, id]);

  if (!provider) {
    return <main>Provider nicht gefunden</main>;
  }

  return (
    <main>
      <BackLink href="/providers">Zurück zur Übersicht</BackLink>

      <Title>
        <Trans id="mediator.provider-show.title">
          Impfanbieter "{provider.name}"
        </Trans>
      </Title>

      <table className="table mb-8 striped">
        <thead>
          <tr>
            <th>
              <Trans id="mediator.provider-show.field">Feld</Trans>
            </th>
            <th>
              <Trans id="mediator.provider-show.value">Wert</Trans>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>
              <Trans id="mediator.provider-show.verified">Bestätigt?</Trans>
            </th>
            <td>
              {provider.verified ? (
                <span className="font-semibold text-green-700">ja</span>
              ) : (
                <span className="font-semibold text-red-700">nein</span>
              )}
            </td>
          </tr>

          <tr>
            <th>
              <Trans id="mediator.provider-show.name">Name</Trans>
            </th>
            <td>{provider.name}</td>
          </tr>

          <tr>
            <th>
              <Trans id="mediator.provider-show.street">Straße</Trans>
            </th>
            <td>{provider.street}</td>
          </tr>

          <tr>
            <th>
              <Trans id="mediator.provider-show.city">Stadt</Trans>
            </th>
            <td>{provider.city || " -- "}</td>
          </tr>

          <tr>
            <th>
              <Trans id="mediator.provider-show.zip-code">Postleitzahl</Trans>
            </th>
            <td>{provider.zipCode}</td>
          </tr>

          <tr>
            <th>
              <Trans id="mediator.provider-show.email">E-Mail</Trans>
            </th>
            <td>{provider.email || " -- "}</td>
          </tr>

          <tr>
            <th>
              <Trans id="mediator.provider-show.description">
                Beschreibung
              </Trans>
            </th>
            <td>{provider.description || " -- "}</td>
          </tr>

          <tr>
            <th>
              <Trans id="mediator.provider-show.accessible">
                Barrierefreier Zugang?
              </Trans>
            </th>
            <td>
              {provider.accessible ? <Trans>Ja</Trans> : <Trans>Nein</Trans>}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="buttons-list">
        {!provider.verified ? (
          <Button variant="primary" size="sm">
            <Trans id="mediator.provider-show.button-show">
              Anbieter bestätigen
            </Trans>
          </Button>
        ) : null}
      </div>
    </main>
  );
};

export default ProviderShowPage;
