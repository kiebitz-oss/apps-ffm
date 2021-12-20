import { Error } from "@kiebitz-oss/ui";
import clsx from "clsx";
import { Control, Controller } from "react-hook-form";

type QuestionBoxProps = {
  name: string;
  control: Control;
  error?: boolean;
  errorMessage?: string;
};

export const QuestionaireBox: React.FC<QuestionBoxProps> = ({
  children,
  control,
  name,
  error,
  errorMessage = "Ihre letzte Impfung muss mehr. Bitte haben Sie Verständnis für die aktuellen Regeln. Diese können sich ändern, bleiben Sie informiert.",
}) => {
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
                    ["border-error border-2"]: error,
                  }
                )}
              >
                <div className="flex justify-between pr-4">
                  <legend>
                    <h3>{children}</h3>
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
                    ja
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
                    nein
                  </label>
                </div>
              </div>

              {error && (
                <Error className="mx-4 sm:w-[500px] xl:mt-2">
                  {errorMessage}
                </Error>
              )}
            </div>
          </fieldset>
        );
      }}
    />
  );
};
