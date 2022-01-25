import {
  Button,
  Form,
  InputField,
  SelectField,
  Vaccine,
  vaccines,
} from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import dayjs from "dayjs";
import {
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { createAppointmentSeries } from "stores/app";

interface FormData {
  startDate: string;
  hourFrom: string;
  hourTo: string;
  interval: number;
  slotCount: number;
  vaccine: Vaccine;
}

const resolver: Resolver<FormData> = async (values) => {
  const errors: any = {};

  if (values.slotCount > 50) {
    errors.slots = t({
      id: "provider.schedule.create-appointment-series-modal.too-many-slots",
    });
  }

  if (values.slotCount < 1) {
    errors.slots = t({
      id: "provider.schedule.create-appointment-series-modal.too-few-slots",
    });
  }

  return {
    values,
    errors,
  };
};

interface AppointmentSeriesFormProps {
  onSuccess?: () => void;
}

export const AppointmentSeriesForm: React.FC<AppointmentSeriesFormProps> = ({
  onSuccess,
}) => {
  const methods = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      startDate: dayjs()
        .utc()
        .add(1, "day")
        .set("hour", 8)
        .set("minute", 0)
        .format("YYYY-MM-DD"),
      hourFrom: "08:00",
      hourTo: "18:00",
      slotCount: 5,
      interval: 15,
    },
    resolver,
  });

  const { register, handleSubmit, formState } = methods;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const startAt = dayjs(data.startDate)
      .set("hour", Number(data.hourFrom.split(":")[0]))
      .set("minute", Number(data.hourFrom.split(":")[1]));
    const endAt = dayjs(data.startDate)
      .set("hour", Number(data.hourTo.split(":")[0]))
      .set("minute", Number(data.hourTo.split(":")[1]));
    await createAppointmentSeries(
      startAt,
      endAt,
      Number(data.interval),
      data.vaccine,
      data.slotCount
    ).then((result) => {
      if (onSuccess) {
        onSuccess();
      }

      return result;
    });
  };

  return (
    <FormProvider {...methods}>
      <Form name="appointment-series-modal" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-6">
            <InputField
              label={t({
                id: "provider.schedule.create.appointment-series-modal.start-at.label",
                message: "Datum",
              })}
              required
              type="date"
              {...register("startDate", {
                required: true,
                valueAsDate: true,
              })}
            />

            <InputField
              label={t({
                id: "provider.schedule.create.appointment-series-modal.hour-from.label",
                message: "Von",
              })}
              required
              type="time"
              {...register("hourFrom", {
                required: true,
              })}
            />

            <InputField
              label={t({
                id: "provider.schedule.create.appointment-series-modal.hour-end.label",
                message: "Bis",
              })}
              required
              type="time"
              {...register("hourTo", {
                required: true,
              })}
            />
          </div>

          <div className="flex flex-row gap-6">
            <InputField
              label={t({
                id: "provider.schedule.appointment-series-modal.slots.label",
                message: "Anzahl Impfdosen",
              })}
              type="number"
              required
              description={t({
                id: "provider.schedule.appointment-series-modal.slots.description",
                message: "Die verfügbaren Impfdosen pro Zeiteinheit.",
              })}
              {...register("slotCount", {
                valueAsNumber: true,
                required: t({
                  id: "provider.schedule.appointment-series-modal.slots.error.required",
                  message: "Bitte gegen Sie die Anzahl der Impfdosen ein",
                }),
                min: {
                  value: 1,
                  message: t({
                    id: "provider.schedule.appointment-series-modal.slots.error.min",
                    message:
                      "Die minimale Anzahl der Impfdosen pro Termin beträgt 1",
                  }),
                },
                max: {
                  value: 50,
                  message: t({
                    id: "provider.schedule.appointment-series-modal.slots.error.max",
                    message:
                      "Die maximale Anzahl der Impfdosen pro Termin beträgt 50",
                  }),
                },
              })}
            />

            <InputField
              label={t({
                id: "provider.schedule.appointment-series-modal.duration.label",
                message: "Vstl. Dauer",
              })}
              type="number"
              required
              description={t({
                id: "provider.schedule.appointment-series-modal.duration.description",
                message: "Vstl. Dauer pro Impftermin in Minuten",
              })}
              {...register("interval", {
                valueAsNumber: true,
                required: t({
                  id: "provider.schedule.appointment-series-modal.duration.error-required",
                  message: "Bitte gegen Sie die Anzahl der Impfdosen ein",
                }),
                min: {
                  value: 5,
                  message: t({
                    id: "provider.schedule.appointment-series-modal.duration.error.min",
                    message:
                      "Die minimale Dauer eines Impftermins beträgt 5 Minuten",
                  }),
                },
                max: {
                  value: 240,
                  message: t({
                    id: "provider.schedule.appointment-series-modal.duration.error.max",
                    message:
                      "Die maximale Dauer eines Impftermins beträgt 240 Minuten",
                  }),
                },
              })}
            />
          </div>

          <div className="flex flex-row gap-6">
            <SelectField
              label={t({
                id: "provider.schedule.appointment-series-modal.vaccine-label",
                message: "Impfstoff",
              })}
              options={Object.keys(vaccines.de).map((vaccineKey) => {
                return {
                  label: vaccines.de[vaccineKey as Vaccine].name,
                  value: vaccineKey,
                };
              })}
              description={t({
                id: "provider.schedule.appointment-series-modal.vaccine.description",
                message: "Der verimpfte Impfstoff",
              })}
              required
              {...register("vaccine", {
                required: t({
                  id: "provider.schedule.appointment-series-modal.vaccine.error-required",
                  message: "Bitte gegen Sie den Impfstoff an",
                }),
              })}
            />
          </div>

          <Button disabled={!formState.isValid || formState.isSubmitting}>
            <Trans id="provider.schedule.create.appointment-series-modal.button">
              Speichern
            </Trans>
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
};
