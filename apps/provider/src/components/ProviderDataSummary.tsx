import { Trans } from "@lingui/macro";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { ProviderInput } from "vanellus";

interface ProviderDataSummaryProps {
  provider: ProviderInput;
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
      <div
        className={clsx("mb-4 provider-data-summary", {
          ["verified"]: verified,
        })}
      >
        <dl>
          <dt>
            <Trans id="provider.provider-data.name">Name der Impfstelle</Trans>
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
