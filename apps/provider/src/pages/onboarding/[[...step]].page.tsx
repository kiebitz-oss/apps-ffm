import type { NextPage } from "next";
import { useRouter } from "next/router";
import { DataStep } from "./DataStep";
import { OnboardingProvider } from "./OnboardingProvider";
import { SecretStep } from "./SecretStep";
import { VerifyStep } from "./VerifyStep";

const OnboardingPage: NextPage = () => {
  const router = useRouter();

  return (
    <OnboardingProvider>
      <DataStep />
      <SecretStep />
      <VerifyStep />
    </OnboardingProvider>
  );
};

export default OnboardingPage;
