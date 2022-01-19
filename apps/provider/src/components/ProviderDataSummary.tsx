import { Message, Text } from "@kiebitz-oss/common";
import { Trans } from "@lingui/macro";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { Provider } from "vanellus";

interface ProviderDataSummaryProps {
  provider: Provider;
  changeHref?: string;
  verified?: boolean;
}

export const ProviderDataSummary: React.FC<ProviderDataSummaryProps> = ({
  provider,
  verified = false,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!provider) {
      router.push("/onboarding");
    }
  }, [provider, router]);

  return (
    <>
      {!verified && (
        <Text>
          <Trans id="provider.provider-data.not-verified-yet">
            Ihre Daten wurden noch nicht verifiziert. Bitte haben Sie
            Verständnis, dass die Verifizierung bis zu 48h dauern kann.
          </Trans>
        </Text>
      )}

      <Message
        variant="warning"
        className="py-3 my-6 text-xl font-semibold text-center"
      >
        <Trans id="provider.provider-data.notice">
          Bitte überprüfen Sie Ihre Daten, bevor Sie den Vorgang abschließen.
        </Trans>
      </Message>

      <div
        className={clsx("mb-4 provider-data-summary", {
          ["verified"]: verified,
        })}
      >
        <dl>
          <dt>
            <Trans id="provider.provider-data.name">Vollständiger Name</Trans>
          </dt>
          <dd>{provider.name}</dd>

          <dt>
            <Trans id="provider.provider-data.street">
              Straße & Hausnummer
            </Trans>
          </dt>
          <dd>{provider.street}</dd>

          <dt>
            <Trans id="provider.provider-data.zip-code">Postleitzahl</Trans>
          </dt>
          <dd>{provider.zipCode}</dd>

          <dt>
            <Trans id="provider.provider-data.city">Ort</Trans>
          </dt>
          <dd>{provider.city}</dd>

          <dt>
            <Trans id="provider.provider-data.website">Webseite</Trans>
          </dt>
          <dd>
            {provider.website || (
              <Trans id="provider.provider-data.not-given">
                (keine Angabe)
              </Trans>
            )}
          </dd>

          <dt>
            <Trans id="provider.provider-data.description">
              Informationen für Impfwillige
            </Trans>
          </dt>
          <dd>
            {provider.description || (
              <Trans id="provider.provider-data.not-given">
                (keine Angabe)
              </Trans>
            )}
          </dd>

          <dt>
            <Trans id="provider.provider-data.phone">Telefonnummer</Trans>
          </dt>
          {/* <dd>
            {provider.phone || (
              <Trans id="provider.provider-data.not-given">
                (keine Angabe)
              </Trans>
            )}
          </dd> */}

          <dt>
            <Trans id="provider.provider-data.email" />
          </dt>
          <dd>
            {provider.email || (
              <Trans id="provider.provider-data.not-given">
                (keine Angabe)
              </Trans>
            )}
          </dd>

          {/* <dt>
              <Trans id="provider.provider-data.access-code.label">
                  Zugangscode (falls vorhanden)
              </Trans>
          </dt>
          <dd>
              {provider.code || (
                  <Trans id="provider.provider-data.not-given">
                      (keine Angabe)
                  </Trans>
              )}
          </dd> */}

          <dt>
            <Trans id="provider.provider-data.accessible">
              Barrierefreier Zugang zur Praxis/zum Impfzentrum
            </Trans>
            ?
          </dt>
          <dd>
            {provider.accessible ? (
              <Trans id="provider.provider-data.accessible-yes">Ja</Trans>
            ) : (
              <Trans id="provider.provider-data.accessible-no">Nein</Trans>
            )}
          </dd>
        </dl>
      </div>
    </>
  );
};
