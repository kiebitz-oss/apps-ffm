import {
  Form,
  FormSubmitButton,
  InputField,
  SwitchField,
  Text,
  TextareaField,
  Title,
} from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import type { Provider } from "vanellus";

interface ProviderFormProps {
  onSubmit: SubmitHandler<Provider>;
  defaultValues?: Partial<Provider>;
  submitText?: string;
}

export const ProviderForm: React.FC<ProviderFormProps> = ({
  onSubmit,
  defaultValues = {},
  submitText,
}) => {
  const methods = useForm<Provider>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues,
  });

  const { register, handleSubmit, formState } = methods;

  return (
    <FormProvider {...methods}>
      <Form
        name="provider-onboarding"
        className="flex flex-col gap-12 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-12">
          <fieldset className="flex flex-col gap-8">
            <legend className="mb-8">
              <Title variant="h3">
                <Trans id="provider.onboarding.title">Allgemeine Daten</Trans>
              </Title>

              <Text>
                <Trans id="provider.onboarding.intro">
                  Dies sind die allgemeinen Kontaktdaten der Impfstelle.
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
                  value: 2,
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
                type="number"
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
                  minLength: {
                    value: 5,
                    message: t({
                      id: "provider.onboarding.zip-code.error.min-length",
                      message: "Bitte gegen Sie eine gültige Postleitzahl an",
                    }),
                  },
                  maxLength: {
                    value: 5,
                    message: t({
                      id: "provider.onboarding.zip-code.error.min-length",
                      message: "Bitte gegen Sie eine gültige Postleitzahl an",
                    }),
                  },
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
            <legend className="mb-8">
              <Title variant="h3">
                <Trans id="provider.onboarding.data-title">Kontaktdaten</Trans>
              </Title>

              <Text>
                <Trans id="provider.onboarding.data-description">
                  Die folgenden Kontaktdaten dienen ausschließlich zur
                  Kommunikation mit dem Support-Team.
                </Trans>
              </Text>
            </legend>

            <InputField
              type="email"
              label={t({
                id: "provider.onboarding.email.label",
                message: "E-Mail Adresse",
              })}
              required
              {...register("email", {
                required: t({
                  id: "provider.onboarding.email.error.required",
                  message: "Bitte gegen Sie eine gültige E-Mail-Adresse an",
                }),
              })}
            />
          </fieldset>

          <fieldset className="flex flex-col gap-6">
            <legend className="mb-8">
              <Title variant="h3">Einstellungen</Title>
              <Text>
                <Trans id="provider.onboarding.settings-description">
                  Weitere Einstellungen
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
            {submitText || (
              <Trans id="provider.onboarding.save-and-continue">Weiter</Trans>
            )}
          </FormSubmitButton>
        </div>
      </Form>
    </FormProvider>
  );
};
