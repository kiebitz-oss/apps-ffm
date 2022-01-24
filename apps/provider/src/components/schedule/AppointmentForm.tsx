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
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createAppointment } from "stores/app";
import type { Appointment } from "vanellus";

interface FormData {
  id?: string;
  startDate: string;
  slotCount: number;
  duration: number;
  vaccine: Vaccine;
}

interface AppointmentFormProps {
  appointment?: Appointment;
  onSuccess?: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointment,
  onSuccess,
}) => {
  const methods = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      startDate: dayjs(appointment?.startDate)
        .add(1, "day")
        .set("hour", 10)
        .set("minute", 0)
        .format("YYYY-MM-DDTHH:mm"),
      slotCount: appointment?.slotData.length || 5,
      duration: appointment?.duration || 5,
    },
    // resolver,
  });

  const { register, handleSubmit, formState } = methods;

  const onSubmit: SubmitHandler<FormData> = async (data) =>
    createAppointment(
      dayjs(data.startDate),
      data.duration,
      data.vaccine,
      data.slotCount
    ).then((result) => {
      if (onSuccess) {
        onSuccess();
      }

      return result;
    });

  return (
    <FormProvider {...methods}>
      <Form name="appointment-modal" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 w-full">
          {appointment && (
            <input
              {...register("id", {
                value: appointment.id,
              })}
              type="hidden"
            />
          )}

          <InputField
            label={t({
              id: "provider.schedule.appointment-modal.start-date.label",
              message: "Startdatum",
            })}
            type="datetime-local"
            description={t({
              id: "provider.schedule.appointment-modal.start-date.description",
              message: "Das Datum des Impftermins",
            })}
            required
            {...register("startDate", {
              // valueAsDate: true,
              required: t({
                id: "provider.schedule.appointment-modal.start-date.error.required",
                message: "Bitte gegen Sie einen Startdatum an",
              }),
              min: {
                value: dayjs().format("YYYY-MM-DDTHH:mm"),
                message: t({
                  id: "provider.schedule.appointment-modal.start-date.error.min",
                  message:
                    "Der Impftermin darf nicht in der Vergangenheit liegen",
                }),
              },
              max: {
                value: dayjs().add(30, "days").format("YYYY-MM-DDTHH:mm"),
                message: t({
                  id: "provider.schedule.appointment-modal.start-date.error.max",
                  message:
                    "Der Impftermin darf maximal 30 Tage in der Zukunft liegen",
                }),
              },
            })}
          />

          <InputField
            label={t({
              id: "provider.schedule.appointment-modal.slots.label",
              message: "Anzahl Impfdosen",
            })}
            type="number"
            required
            description={t({
              id: "provider.schedule.appointment-modal.slots.description",
              message: "Die verfügbaren Impfdosen pro Zeiteinheit.",
            })}
            {...register("slotCount", {
              valueAsNumber: true,
              required: t({
                id: "provider.schedule.appointment-modal.slots.error.required",
                message: "Bitte gegen Sie die Anzahl der Impfdosen ein",
              }),
              min: {
                value: 1,
                message: t({
                  id: "provider.schedule.appointment-modal.slots.error.min",
                  message:
                    "Die minimale Anzahl der Impfdosen pro Termin beträgt 1",
                }),
              },
              max: {
                value: 50,
                message: t({
                  id: "provider.schedule.appointment-modal.slots.error.max",
                  message:
                    "Die maximale Anzahl der Impfdosen pro Termin beträgt 50",
                }),
              },
            })}
          />

          <InputField
            label={t({
              id: "provider.schedule.appointment-modal.duration.label",
              message: "Vstl. Dauer",
            })}
            type="number"
            description={t({
              id: "provider.schedule.appointment-modal.duration.description",
              message: "Vstl. Dauer pro Impftermin in Minuten",
            })}
            required
            {...register("duration", {
              valueAsNumber: true,
              required: t({
                id: "provider.schedule.appointment-modal.duration.error-required",
                message: "Bitte gegen Sie die Anzahl der Impfdosen ein",
              }),
              min: {
                value: 5,
                message: t({
                  id: "provider.schedule.appointment-modal.duration.error.min",
                  message:
                    "Die minimale Dauer eines Impftermins beträgt 5 Minuten",
                }),
              },
              max: {
                value: 240,
                message: t({
                  id: "provider.schedule.appointment-modal.duration.error.max",
                  message:
                    "Die maximale Dauer eines Impftermins beträgt 240 Minuten",
                }),
              },
            })}
          />

          <SelectField
            label={t({
              id: "provider.schedule.appointment-modal.vaccine-label",
              message: "Impfstoff",
            })}
            options={Object.keys(vaccines.de).map((vaccineKey) => {
              return {
                label: vaccines.de[vaccineKey as Vaccine].name,
                value: vaccineKey,
              };
            })}
            description={t({
              id: "provider.schedule.appointment-modal.vaccine.description",
              message: "Der verimpfte Impfstoff",
            })}
            required
            {...register("vaccine", {
              required: t({
                id: "provider.schedule.appointment-modal.vaccine.error-required",
                message: "Bitte gegen Sie den Impfstoff an",
              }),
            })}
          />

          <Button disabled={!formState.isValid || formState.isSubmitting}>
            <Trans id="provider.schedule.appointment-modal.button">
              Speichern
            </Trans>
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
};
