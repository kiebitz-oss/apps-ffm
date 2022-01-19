// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Title } from "@impfen/common";
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
        <Title>Daten der Impfstelle erfassen</Title>

        {state.data && (
          <ProviderForm onSubmit={onSubmit} defaultValues={state.data} />
        )}
      </div>
    </main>
  );
};
