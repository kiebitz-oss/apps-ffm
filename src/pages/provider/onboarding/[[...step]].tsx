import { DataStep } from "components/provider/DataStep";
import { OnboardingProvider } from "components/provider/OnboardingProvider";
import { SecretStep } from "components/provider/SecretStep";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { VerifyStep } from "pages/finder/VerifyStep";
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
