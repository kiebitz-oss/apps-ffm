import { Button, Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import { BackLink } from "components/common/BackLink";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ConfirmProviderModal } from "pages/ConfirmProviderModal";
import { useMediatorApi } from "pages/MediatorApiContext";
import { UnconfirmProviderModal } from "pages/UnconfirmProviderModal";
import { useEffect, useState } from "react";
import type { Provider } from "types";

const ProviderShowPage: NextPage = () => {
  const [provider, setProvider] = useState<Provider>();
  const [modal, setModal] = useState<"confirm" | "unconfirm" | null>(null);
  const router = useRouter();
  const api = useMediatorApi();

  const id = router.query?.id as string;

  useEffect(() => {
    if (id) {
      api.getProvider(id).then((provider) => {
        if (provider) {
          setProvider(provider);
        }
      });
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
              <Trans id="mediator.provider-show.phone">Telefonnummer</Trans>
            </th>
            <td>{provider.phone || " -- "}</td>
          </tr>
          <tr>
            <th>
              <Trans id="mediator.provider-show.description">
                Beschreibung
              </Trans>
            </th>
            <td>{provider.description || " -- "}</td>
          </tr>
        </tbody>
      </table>

      <div className="buttons-list">
        {!provider.verified ? (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setModal("confirm")}
          >
            <Trans id="mediator.provider-show.button-confirm">
              Anbieter bestätigen
            </Trans>
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setModal("unconfirm")}
          >
            <Trans id="mediator.provider-show.button-unconfirm">
              Anbieter sperren
            </Trans>
          </Button>
        )}
      </div>
      {modal === "confirm" && (
        <ConfirmProviderModal
          provider={provider}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "unconfirm" && (
        <UnconfirmProviderModal
          provider={provider}
          onClose={() => setModal(null)}
        />
      )}
    </main>
  );
};

export default ProviderShowPage;
