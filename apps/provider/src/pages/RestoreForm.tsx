// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import {
  Form,
  FormSubmitButton,
  InputField,
  Message,
  Text,
  Upload,
} from "@kiebitz-oss/ui";
import { t, Trans } from "@lingui/macro";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import {
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface FormData {
  file: string;
  secret: string;
}

const resolver: Resolver<FormData> = async (values) => {
  const errors: any = {};

  if (!values.file) {
    errors.file = t({
      id: "provider.restore-form.missing-file",
      message: "provider.restore-form.missing-file MISSING",
    });
  }

  /* else if (values.file.data === undefined || values.file.iv === undefined) {
        errors.file = t({
            id: 'provider.restore-form.invalid-file',
            message: 'provider.restore-form.invalid-file MISSING',
        });
    } */

  if (values.secret !== undefined) {
    values.secret = values.secret
      .toLowerCase()
      .replace(/[^abcdefghijkmnpqrstuvwxyz23456789]/g, "");
  }

  if (!/[abcdefghijkmnpqrstuvwxyz23456789]{16,20}/i.exec(values.secret)) {
    errors.secret = t({
      id: "provider.restore-form.invalid-secret",
      message: "provider.restore-form.invalid-secret MISSING",
    });
  }

  return { values, errors };
};

interface RestoreFormProps {
  className: string;
}

export const RestoreForm: React.FC<RestoreFormProps> = ({ className }) => {
  const [file, setFile] = useState<string>();
  const fileInput = useRef<HTMLInputElement>(null);
  const [failed, setFailed] = useState<boolean>(false);

  const methods = useForm<FormData>({
    reValidateMode: "onChange",
    mode: "onChange",
    resolver,
  });

  const { register, handleSubmit, formState, setError, setValue } = methods;

  useEffect(() => {
    if (file !== undefined) {
      setValue("file", file, {
        shouldDirty: true,
      });
    }
  }, [file, setValue]);

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.currentTarget.files?.[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      (event) => {
        try {
          setFile(event.target?.result?.toString());
        } catch (error) {
          setError(
            "file",
            new Error(
              t({
                id: "provider.restore-form.invalid-file",
                message: "provider.restore-form.invalid-file MISSING",
              })
            )
          );
        }
      },
      false
    );

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // restoreFromBackup(data.secret, data.file)
    //     .then(() => {
    //         navigate('/schedule');
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         setFailed(true);
    //     });
  };

  return (
    <FormProvider {...methods}>
      <Form
        name="restore"
        onSubmit={handleSubmit(onSubmit)}
        className={className}
      >
        <div>
          <div className="flex flex-col gap-8">
            {failed && (
              <Message variant="danger">
                <Trans id="provider.restore-form.failed">
                  Das Laden Ihrer Daten ist leider fehlgeschlagen. Bitte prüfen
                  Sie Ihren Datenschlüssel sowie die angegebene Datei.
                </Trans>
              </Message>
            )}

            <InputField
              label={t({
                id: "provider.restore-form.secret.label",
                message: "Datenschlüssel",
              })}
              description={t({
                id: "provider.restore-form.secret.description",
                message:
                  "Der Datenschlüssel, den Sie bei der Registrierung erhalten haben.",
              })}
              required
              {...register(
                "secret" /* {
                                onChange: (event) => {
                                    return formatSecret(
                                        event.target.secret || ''
                                    );
                                },
                            } */
              )}
            />

            <div className="field">
              <Upload
                ref={fileInput}
                onChange={onFileChange}
                accept=".enc"
                label={t({
                  id: "provider.restore-form.input",
                  message: "Sicherungsdatei wählen",
                })}
              />

              <input type="hidden" {...register("file")} />

              <Text className="hint">
                <Trans id="provider.restore-form.input.description">
                  Bitte laden Sie hier Ihre Sicherungsdatei
                  (booster-impfen-backup-2021[Datum&Uhrzeit].enc) hoch.
                </Trans>
              </Text>
            </div>
          </div>

          <div>
            <FormSubmitButton formState={formState}>
              <Trans id="provider.restore-form.load">Einloggen</Trans>
            </FormSubmitButton>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
};
