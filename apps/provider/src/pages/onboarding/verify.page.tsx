import { Button, Link, Page, PageHeader } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { ProviderDataSummary } from "components";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { register } from "stores/app";
import { resetOnboarding, useOnboarding } from "stores/onboarding";

/*
Here the user has a chance to review all data that was entered before confirming
the setup. Once the button gets clicked, the system generates the QR
codes, encrypts the contact data and stores the settings in the storage backend.
*/
const OnboardingVerifyPage: NextPage = () => {
  const provider = useOnboarding((state) => state.provider);
  const router = useRouter();

  const submit: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      if (provider) {
        await register(provider).then(() => {
          resetOnboarding();

          return router.push("/onboarding/backup");
        });
      }
    }, [provider, router]);

  if (!provider) {
    router.push("/onboarding");

    return null;
  }

  return (
    <Page narrow>
      <PageHeader
        title={t({
          id: "provider.onboarding.verify.title",
          message: "Bitte überprüfen Sie ihre Daten",
        })}
      />

      <ProviderDataSummary provider={provider} />

      <div className="flex justify-between">
        <Link href="/onboarding" type="button" variant="secondary">
          <Trans id="provider.onboarding.verify.edit-data">Anpassen</Trans>
        </Link>

        <Button onClick={submit}>
          <Trans id="provider.onboarding.verify.button">Weiter</Trans>
        </Button>
      </div>
    </Page>
  );
};

export default OnboardingVerifyPage;
