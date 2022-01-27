import { Error } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import clsx from "clsx";
import { Control, Controller } from "react-hook-form";

type QuestionBoxProps = {
  name: string;
  control: Control;
  condition?: boolean;
  error?: boolean;
  errorMessage?: string;
};

export const QuestionaireBox: React.FC<QuestionBoxProps> = ({
  children,
  control,
  name,
  condition = true,
  error,
  errorMessage,
}) => {
  if (!condition) {
    return null;
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <fieldset>
            <div className="flex flex-col gap-4 md:px-0 lg:w-full xl:flex-row xl:gap-2">
              <div
                className={clsx(
                  "flex flex-col gap-5 py-3 px-4 font-semibold bg-white rounded shadow-box sm:w-[500px]",
                  {
                    ["border-2 border-error"]: error,
                  }
                )}
              >
                <div className="flex justify-between pr-4">
                  <legend>
                    <h2>{children}</h2>
                  </legend>
                </div>

                <div className="flex gap-8 items-center mb-2">
                  <label
                    htmlFor={`${name}-yes`}
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      className="radio"
                      type="radio"
                      id={`${name}-yes`}
                      name={name}
                      defaultChecked={value === true}
                      onChange={() => onChange(true)}
                      value="1"
                    />
                    <Trans id="user.questionaire.yes">ja</Trans>
                  </label>

                  <label
                    htmlFor={`${name}-no`}
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      className="radio"
                      type="radio"
                      id={`${name}-no`}
                      name={name}
                      defaultChecked={value === false}
                      onChange={() => onChange(false)}
                      value="0"
                    />
                    <Trans id="user.questionaire.no">nein</Trans>
                  </label>
                </div>
              </div>

              {error && (
                <Error className="mx-4 sm:w-[500px] xl:mt-2">
                  {errorMessage ||
                    t({
                      id: "user.questionaire.error.default",
                      message:
                        "Ihre letzte Impfung muss mehr. Bitte haben Sie Verständnis für die aktuellen Regeln. Diese können sich ändern, bleiben Sie informiert.",
                    })}
                </Error>
              )}
            </div>
          </fieldset>
        );
      }}
    />
  );
};
