import { Title } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { ProviderForm } from "components/ProviderForm";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import {
  OnboardingStateData,
  Types,
  useOnboardingState,
} from "./OnboardingStateProvider";

export const DataStep: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useOnboardingState();

  const onSubmit: SubmitHandler<OnboardingStateData> = (data) => {
    dispatch({ type: Types.SET_DATA, payload: { data } });

    // we redirect to the 'verify' step
    router.push(`/onboarding/verify`);
  };

  return (
    <main className="content">
      <div className="lg:w-2/3">
        <Title>
          <Trans id="provider.onboarding.data.title">
            Daten der Impfstelle erfassen
          </Trans>
        </Title>

        <ProviderForm
          onSubmit={onSubmit}
          defaultValues={state.data}
          submitText={t({
            id: "provider.onboarding.data.save-and-continue",
            message: "Speichern und weiter",
          })}
        />
      </div>
    </main>
  );
};
