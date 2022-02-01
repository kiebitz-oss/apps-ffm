import { Button, Error } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { setVaccine } from "stores/finder";
import { QuestionaireBox } from "./QuestionaireBox";

interface FormData {
  q1Value: boolean;
  q2Value: boolean;
  q3Value: boolean;
  q4Value: boolean;
}

const resolver: Resolver = (values) => {
  const errors = {};

  return {
    values,
    errors,
  };
};

export const Questionaire: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setVaccine(undefined);
  });

  const { watch, control, handleSubmit, resetField } = useForm({
    reValidateMode: "onChange",
    resolver,
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    if (valid) {
      router.push("/finder");
    } else {
      setError(true);
    }
  };

  const q1Value = watch("q1");
  const q2Value = watch("q2");
  const q3Value = watch("q3");
  const q4Value = watch("q4");

  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      // reset global error
      setError(false);

      // reset later fields
      if (type === "change") {
        switch (name) {
          case "q1": {
            resetField("q2");
            resetField("q3");
            resetField("q4");
          }

          case "q2": {
            resetField("q3");
            resetField("q4");
          }

          case "q3": {
            resetField("q4");
            setVaccine(undefined);
          }

          case "q4": {
            if (values["q4"] === true) {
              setVaccine(undefined);
            } else {
              setVaccine("biontech");
            }
          }
        }
      }

      setValid(values["q3"] === false || values["q4"] === false || false);
    });

    return () => subscription.unsubscribe();
  }, [watch, resetField, setValid]);

  return (
    <form
      name="questionaire"
      className="flex flex-col grow mb-6 md:mb-8 lg:max-w-full"
      onSubmit={handleSubmit(onSubmit as any)}
    >
      <div className="flex flex-col flex-1 gap-5">
        <QuestionaireBox name="q1" control={control}>
          <Trans id="user.welcome.question1_value">
            Handelt es sich um eine Booster-Impfung?
          </Trans>
        </QuestionaireBox>

        <QuestionaireBox
          name="q2"
          condition={q1Value === true}
          error={q2Value === false}
          errorMessage={t({
            id: "user.welcome.question2_error",
            message:
              "Es müssen 3 Monate seit Ihrem letzten Impftermin vergangen sein, bevor Sie sich boostern lassen können.",
          })}
          control={control}
        >
          <Trans id="user.welcome.question2_value">
            Liegt Ihre letzte Impfung mehr als 3 Monate zurück?
          </Trans>
        </QuestionaireBox>

        <QuestionaireBox
          name="q3"
          condition={q1Value === false || q2Value === true}
          control={control}
        >
          <Trans id="user.welcome.question3_value">
            Sind sie schwanger oder jünger als 30?
          </Trans>
        </QuestionaireBox>

        {/* no = biontech */}
        <QuestionaireBox
          name="q4"
          condition={
            (q1Value === false || q2Value === true) && q3Value === true
          }
          error={q4Value === true}
          control={control}
          errorMessage={t({
            id: "user.welcome.question4_error",
            message:
              "Leider gibt es aktuell (noch) keine Termine für Kinderimpfungen über das Portal. Wir bemühen uns das Angebot schnellstmöglich zu erweitern und bitten bis dahin um Geduld.",
          })}
        >
          <Trans id="user.welcome.question4_value">
            Sind Sie jünger als 12?
          </Trans>
        </QuestionaireBox>
      </div>

      {error && !valid && (
        <Error className="mx-8 mt-8 md:mx-0">
          <Trans id="user.welcome.form_error">
            Bitte beantworten Sie alle Fragen, denn sonst können wir keine
            Termine für Sie heraussuchen. Alle Ihre persönlichen Daten werden
            nur auf Ihrem Endgerät gespeichert und nicht an einen Server
            übermittelt oder weitergegeben.
          </Trans>
        </Error>
      )}

      <Button
        type="submit"
        variant={valid ? "primary" : "invalid"}
        className="mx-4 mt-8 sm:self-start sm:mx-0 md:mx-0"
      >
        <Trans id="user.welcome.button">Weiter zum Termin</Trans>
      </Button>
    </form>
  );
};
