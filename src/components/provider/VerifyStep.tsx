// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { Button, Link, Title } from "ui";
import { useOnboarding } from "./OnboardingProvider";
import { ProviderDataSummary } from "./ProviderDataSummary";

/*
Here the user has a chance to review all data that was entered before confirming
the setup. Once the button gets clicked, the system generates the QR
codes, encrypts the contact data and stores the settings in the storage backend.
*/
export const VerifyStep: React.FC = () => {
  const { state } = useOnboarding();
  const router = useRouter();

  const submit = () => {
    router.push("/provider/onboarding/secret");
  };

  return (
    <main className="content">
      <div className="lg:w-2/3">
        <Title>Bitte überprüfen Sie ihre Daten</Title>

        <ProviderDataSummary provider={state.data!} />

        <div className="flex justify-between">
          <Link
            href="/provider/onboarding/provider"
            type="button"
            variant="secondary"
          >
            <Trans id="provider.onboarding.verify.edit-data">Anpassen</Trans>
          </Link>

          <Button onClick={submit}>
            <Trans id="provider.onboarding.verify.button">Weiter</Trans>
          </Button>
        </div>
      </div>
    </main>
  );
};
