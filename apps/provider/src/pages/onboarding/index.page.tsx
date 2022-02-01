import { Page, PageHeader } from "@impfen/common";
import { t } from "@lingui/macro";
import { ProviderForm } from "components";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { setProvider, useOnboarding } from "stores/onboarding";
import type { ProviderInput } from "vanellus";

const OnboardingIndexPage: NextPage = () => {
  const router = useRouter();
  const provider = useOnboarding((state) => state.provider);

  const onSubmit: SubmitHandler<ProviderInput> = async (data) => {
    setProvider(data);

    // we redirect to the 'verify' step
    await router.push(`/onboarding/verify`);
  };

  return (
    <Page narrow>
      <PageHeader
        title={t({
          id: "provider.onboarding.data.title",
          message: "Daten der Impfstelle erfassen",
        })}
      />

      <ProviderForm
        onSubmit={onSubmit}
        defaultValues={provider}
        submitText={t({
          id: "provider.onboarding.data.save-and-continue",
          message: "Speichern und weiter",
        })}
      />
    </Page>
  );
};

export default OnboardingIndexPage;
