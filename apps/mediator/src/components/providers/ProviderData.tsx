import { addNotification, Button, Link, PageHeader } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { MouseEventHandler, useCallback, useEffect } from "react";
import { confirmProvider, getProvider } from "stores/app";
import { clear, suspend } from "suspend-react";

interface ProviderDataProps {
  id: string;
}

export const ProviderData: React.FC<ProviderDataProps> = ({ id }) => {
  const router = useRouter();
  const provider = suspend(async () => {
    return getProvider(id);
  }, [id]);

  const refreshProvider = useCallback(async (id: string) => {
    clear([id]);
  }, []);

  const handleConfirmProvider: MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      if (provider) {
        await confirmProvider(provider);

        addNotification(
          t({
            id: "mediator.provider-show.notification.success",
            message: "Impfanbieter erfolgreich bestätigt",
          })
        );

        await router.push("/providers");
      }
    }, [provider, router]);

  useEffect(() => {
    refreshProvider(id);
  }, [id, refreshProvider]);

  return (
    <>
      <PageHeader
        title={t({
          id: "mediator.provider.show.title",
          message: `Impfanbieter "${provider.name}"`,
        })}
        backLink={{
          title: t({
            id: "mediator.provider.show.back-link",
            message: "Zurück zur Übersicht",
          }),
          href: "/providers",
        }}
      />

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
        {/* {!provider.verified ? ( */}
        <Button variant="primary" onClick={handleConfirmProvider}>
          <Trans id="mediator.provider-show.button-show">
            Anbieter bestätigen
          </Trans>
        </Button>
        {/* ) : null} */}
      </div>
    </>
  );
};
