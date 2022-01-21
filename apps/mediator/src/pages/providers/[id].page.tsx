import { BackLink, Button, Link, Title } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { confirmProvider, decodeProviderId, getProvider } from "actions";
import { useAppState } from "lib/AppProvider";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { MouseEventHandler } from "react";
import { useEffect, useState } from "react";
import type { Provider } from "vanellus";

const ProviderShowPage: NextPage = () => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const router = useRouter();
  const { addNotification } = useAppState();

  const id = decodeProviderId(router.query?.id as string);

  const refreshProvider = async (id: string) => {
    return getProvider(id).then(setProvider);
  };

  const handleConfirmProvider: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    if (provider) {
      await confirmProvider(provider);
      await refreshProvider(id);

      addNotification(
        t({
          id: "mediator.provider-show.notification.success",
          message: "Impfanbieter erfolgreich bestätigt",
        })
      );
    }
  };

  useEffect(() => {
    refreshProvider(id);
  }, [id]);

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
              <Trans id="mediator.provider-show.zip-code">Postleitzahl</Trans>
            </th>
            <td>{provider.zipCode}</td>
          </tr>

          <tr>
            <th>
              <Trans id="mediator.provider-show.city">Stadt</Trans>
            </th>
            <td>{provider.city}</td>
          </tr>

          <tr>
            <th>
              <Trans id="mediator.provider-show.website">Website</Trans>
            </th>
            <td>
              {provider.website ? (
                <Link href={provider.website} external>
                  {provider.website}
                </Link>
              ) : (
                " -- "
              )}
            </td>
          </tr>

          <tr>
            <th>
              <Trans id="mediator.provider-show.email">E-Mail</Trans>
            </th>
            <td>
              <a className="link" href={`mailto:${provider.email}`}>
                {provider.email}
              </a>
            </td>
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
          <Button variant="primary" size="sm" onClick={handleConfirmProvider}>
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
