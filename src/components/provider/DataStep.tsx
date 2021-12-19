// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { t, Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Form, InputField, SwitchField, Text, TextareaField, Title } from "ui";
import { FormSubmitButton } from "ui/FormSubmitButton";
import { OnboardingData, Types, useOnboarding } from "./OnboardingProvider";
import { useProviderApi } from "./ProviderApiContext";

export const DataStep: React.FC = () => {
  const router = useRouter();
  const api = useProviderApi();
  const { state, dispatch } = useOnboarding();

  const methods = useForm<OnboardingData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: state.data || {},
  });

  const { register, handleSubmit, formState } = methods;

  const onSubmit: SubmitHandler<OnboardingData> = (data) => {
    api.storeProvider(data).then(() => {
      dispatch({ type: Types.SET_DATA, payload: { data } });

      // we redirect to the 'verify' step
      router.push(`/provider/onboarding/verify`);
    });
  };

  return (
    <main className="content">
      <div className="lg:w-2/3">
        <Title>Daten der Impfstelle erfassen</Title>

        <FormProvider {...methods}>
          <Form
            name="provider-onboarding"
            className="flex flex-col gap-12 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-12">
              <fieldset className="flex flex-col gap-6">
                <legend>
                  <Title variant="h3">
                    <Trans id="provider.onboarding.title">
                      Allgemeine Daten
                    </Trans>
                  </Title>

                  <Text>
                    <Trans id="provider.onboarding.intro">
                      Dies sind die allgemeinen Kontaktdaten.
                    </Trans>
                  </Text>
                </legend>

                <InputField
                  label={t({
                    id: "provider.onboarding.name.label",
                    message: "Vollständiger Name",
                  })}
                  required
                  {...register("name", {
                    required: t({
                      id: "provider.onboarding.name.error.required",
                      message: "Bitte gegen Sie einen gültigen Namen an",
                    }),
                    minLength: {
                      value: 5,
                      message: t({
                        id: "provider.onboarding.name.error.min-length",
                        message: "Bitte gegen Sie einen gültigen Namen an",
                      }),
                    },
                  })}
                />

                <InputField
                  label={t({
                    id: "provider.onboarding.street.label",
                    message: "Straße & Hausnummer",
                  })}
                  required
                  {...register("street", {
                    required: t({
                      id: "provider.onboarding.street.error",
                      message: "Bitte gegen Sie eine gültige Straße an",
                    }),
                  })}
                />
                <div className="grid grid-cols-6 gap-4">
                  <InputField
                    className="col-span-6 md:col-span-2"
                    label={t({
                      id: "provider.onboarding.zip-code.label",
                      message: "Postleitzahl",
                    })}
                    required
                    {...register("zipCode", {
                      required: t({
                        id: "provider.onboarding.zip-code.error",
                        message: "Bitte gegen Sie eine gültige Postleitzahl an",
                      }),
                    })}
                  />

                  <InputField
                    className="col-span-6 md:col-span-4"
                    label={t({
                      id: "provider.onboarding.city.label",
                      message: "Ort",
                    })}
                    required
                    {...register("city", {
                      required: t({
                        id: "provider.onboarding.city.error",
                        message: "Bitte gegen Sie einen gültigen Ort an",
                      }),
                    })}
                  />
                </div>

                <InputField
                  label={t({
                    id: "provider.onboarding.website.label",
                    message: "Webseite",
                  })}
                  {...register("website")}
                />

                <TextareaField
                  label={t({
                    id: "provider.onboarding.description.title",
                    message: "Beschreibung",
                  })}
                  description={t({
                    id: "provider.onboarding.description.description",
                    message:
                      "Informationen für Impfwillige (z.B. wenn Sie spezielle Impfstoffe nur bestimmten Gruppen empfehlen)",
                  })}
                  {...register("description")}
                />
              </fieldset>

              <fieldset className="flex flex-col gap-6">
                <legend>
                  <Title variant="h3">
                    <Trans id="provider.onboarding.data-title">
                      Kontaktdaten
                    </Trans>
                  </Title>

                  <Text>
                    <Trans id="provider.onboarding.data-description">
                      Die folgenden Kontaktdaten dienen ausschließlich zur
                      Kommunikation mit dem Support-Team.
                    </Trans>
                  </Text>
                </legend>

                <InputField
                  label={t({
                    id: "provider.onboarding.phone.label",
                    message: "Telefonnummer",
                  })}
                  {...register("phone")}
                />

                <InputField
                  label={t({
                    id: "provider.onboarding.email.label",
                    message: "E-Mail Adresse",
                  })}
                  type="email"
                  {...register("email")}
                />

                <InputField
                  description={t({
                    id: "provider.onboarding.access-code.description",
                    message:
                      "Falls Sie einen spezifischen Zugangscode erhalten haben geben Sie diesen bitte hier ein.",
                  })}
                  label={t({
                    id: "provider.onboarding.access-code.label",
                    message: "Zugangscode (falls vorhanden)",
                  })}
                  {...register("accessCode")}
                />
              </fieldset>

              <fieldset className="flex flex-col gap-6">
                <legend>
                  <Title variant="h3">Einstellungen</Title>
                  <Text>
                    <Trans id="provider.onboarding.settings-description">
                      Weitere Angaben
                    </Trans>
                  </Text>
                </legend>

                <SwitchField
                  label={t({
                    id: "provider.onboarding.accessible.label",
                    message: "Barrierefreier Zugang zur Praxis/zum Impfzentrum",
                  })}
                  {...register("accessible")}
                />
              </fieldset>
            </div>

            <div>
              <FormSubmitButton formState={formState}>
                <Trans id="provider.onboarding.save-and-continue">Weiter</Trans>
              </FormSubmitButton>
            </div>
          </Form>
        </FormProvider>
      </div>
    </main>
  );
};
