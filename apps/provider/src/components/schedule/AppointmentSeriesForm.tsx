import {
  Button,
  Form,
  InputField,
  SelectField,
  Vaccine,
  vaccines,
} from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { createAppointmentSeries, publishAppointments } from "actions";
import dayjs from "dayjs";
import {
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface FormData {
  startAt: string;
  endAt: string;
  interval: number;
  slotCount: number;
  vaccine: Vaccine;
}

const resolver: Resolver<FormData> = async (values) => {
  const errors: any = {};

  if (values.slotCount > 50) {
    errors.slots = t({
      id: "provider.schedule.create-appointment-modal.too-many-slots",
    });
  }

  if (values.slotCount < 1) {
    errors.slots = t({
      id: "provider.schedule.create-appointment-modal.too-few-slots",
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
      startAt: dayjs()
        .utc()
        .set("hour", 8)
        .set("minute", 0)
        .format("YYYY-MM-DDThh:mm"),
      endAt: dayjs()
        .utc()
        .set("hour", 18)
        .set("minute", 0)
        .format("YYYY-MM-DDThh:mm"),
      slotCount: 5,
    },
    resolver,
  });

  const { register, handleSubmit, formState } = methods;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await createAppointmentSeries(
      dayjs(data.startAt).utc().toDate(),
      dayjs(data.endAt).utc().toDate(),
      Number(data.interval),
      data.vaccine,
      data.slotCount
    )
      .then((appointmentSeries) =>
        publishAppointments(appointmentSeries.appointments)
      )
      .then((result) => {
        if (onSuccess) {
          onSuccess();
        }

        return result;
      });
  };

  return (
    <FormProvider {...methods}>
      <Form name="appointment-modal" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 w-full">
          <InputField
            label={t({
              id: "provider.schedule.create.appointment-series-modal.start-at.label",
              message: "Beginn",
            })}
            type="datetime-local"
            className="grow"
            {...register("startAt", {
              required: true,
              valueAsDate: true,
            })}
          />

          <InputField
            label={t({
              id: "provider.schedule.create.appointment-series-modal.end-at.label",
              message: "Ende",
            })}
            type="datetime-local"
            className="grow"
            {...register("endAt", {
              required: true,
              valueAsDate: true,
            })}
          />

          <InputField
            label={t({
              id: "provider.schedule.create.appointment-series-modal.slots.label",
              message: "Anzahl Impfdosen",
            })}
            type="number"
            step={1}
            min={1}
            max={50}
            {...register("slotCount", {
              required: true,
            })}
          />

          <SelectField
            label={t({
              id: "provider.schedule.create.appointment-series-modal.duration-label",
              message: "Vstl. Dauer",
            })}
            options={[
              5, 10, 15, 20, 30, 45, 60, 90, 120, 150, 180, 210, 240,
            ].map((duration) => ({
              label: t({
                id: "provider.schedule.create.appointment-series-modal.duration-value",
                message: `Dauer: ${duration} Minuten`,
              }),
              value: duration,
            }))}
            {...register("interval", {
              required: true,
            })}
          />

          <SelectField
            label={t({
              id: "provider.schedule.create.appointment-series-modal.vaccine-label",
              message: "Impfstoff",
            })}
            options={Object.keys(vaccines.de).map((vaccineKey) => {
              return {
                label: vaccines.de[vaccineKey as Vaccine].name,
                value: vaccineKey,
              };
            })}
            {...register("vaccine", {
              required: true,
            })}
          />

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
