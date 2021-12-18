import { DataStep } from "components/provider/onboarding/DataStep";
import { OnboardingProvider } from "components/provider/onboarding/OnboardingProvider";
import { SecretStep } from "components/provider/onboarding/SecretStep";
import { VerifyStep } from "components/user/finder/VerifyStep";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Wizard } from "ui";

const OnboardingPage: NextPage = () => {
  const router = useRouter();

  return (
    <OnboardingProvider>
      <Wizard step={(router.query?.step as string) || "data"}>
        <DataStep />
        <SecretStep />
        <VerifyStep />
      </Wizard>
    </OnboardingProvider>
  );
};

export default OnboardingPage;
