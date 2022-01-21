import { Button, Link, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { register } from "actions";
import { ProviderDataSummary } from "components";
import { useRouter } from "next/router";
import type { Provider } from "vanellus";
import { useOnboardingState } from "./OnboardingStateProvider";

/*
Here the user has a chance to review all data that was entered before confirming
the setup. Once the button gets clicked, the system generates the QR
codes, encrypts the contact data and stores the settings in the storage backend.
*/
export const VerifyStep: React.FC = () => {
  const { state } = useOnboardingState();
  const router = useRouter();

  const submit: React.MouseEventHandler<HTMLButtonElement> = () => {
    register(state.data as Provider).then(() => {
      router.push("/onboarding/secret");
    });
  };

  return (
    <main className="content">
      <div className="lg:w-2/3">
        <Title>
          <Trans id="provider.onboarding.verify.title">
            Bitte überprüfen Sie ihre Daten
          </Trans>
        </Title>

        {state.data && <ProviderDataSummary provider={state.data} />}

        <div className="flex justify-between">
          <Link href="/onboarding/data" type="button" variant="secondary">
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
