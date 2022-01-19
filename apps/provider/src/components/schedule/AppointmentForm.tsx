import {
  Button,
  Form,
  InputField,
  SelectField,
  Vaccine,
  vaccines,
} from "@kiebitz-oss/common";
import { t, Trans } from "@lingui/macro";
import dayjs from "dayjs";
import { useApp } from "lib/AppProvider";
import {
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Appointment } from "vanellus";

interface FormData {
  id?: string;
  startDate: string;
  slotCount: number;
  duration: number;
  vaccine: Vaccine;
}

const resolver: Resolver<FormData> = async (values) => {
  const errors: any = {};

  // if (values.date === undefined) {
  //     errors.date = t({
  //         id: 'provider.schedule.create-appointment-modal.please-enter-date',
  //     });
  // } else if (values.time === undefined) {
  //     errors.time = t({
  //         id: 'provider.schedule.create-appointment-modal.please-enter-time',
  //     });
  // } else {
  //     values.startdate = new Date(`${values.date} ${values.time}`);

  //     if (values.startdate < new Date()) {
  //         errors.date = t({
  //             id: 'provider.schedule.create-appointment-modal.in-the-past',
  //         });
  //     }

  //     // we allow appointments max. 30 days in the future
  //     if (
  //         values.startdate >
  //         new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30)
  //     ) {
  //         errors.date = t({
  //             id: 'provider.schedule.create-appointment-modal.too-far-in-the-future',
  //             message:
  //                 'Bitte wählen Sie Termine die maximal 30 Tage in der Zukunft liegen',
  //         });
  //     }
  // }

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
    defaultValues: {
      startDate: dayjs(appointment?.startDate).toISOString().substring(16, 0),
      slotCount: appointment?.slotData.length || 5,
      duration: appointment?.duration || 5,
    },
    resolver,
  });

  const { register, handleSubmit, formState } = methods;
  const { api } = useApp();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await api
      .createAppointment(
        new Date(data.startDate),
        data.duration,
        data.vaccine,
        data.slotCount
      )
      .then((appointment) => api.publishAppointments([appointment]))
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
              id: "provider.schedule.create.appointment-modal.date.label",
              message: "Datum",
            })}
            type="datetime-local"
            className="grow"
            {...register("startDate", {
              required: true,
              valueAsDate: true,
            })}
          />

          <InputField
            label={t({
              id: "provider.schedule.create.appointment-modal.slots.label",
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
              id: "provider.schedule.create.appointment-modal.duration-label",
              message: "Vstl. Dauer",
            })}
            options={[
              5, 10, 15, 20, 30, 45, 60, 90, 120, 150, 180, 210, 240,
            ].map((duration) => ({
              label: t({
                id: "provider.schedule.create.appointment-modal.duration-value",
                message: `Dauer: ${duration} Minuten`,
              }),
              value: duration,
            }))}
            {...register("duration", {
              required: true,
            })}
          />

          <SelectField
            label={t({
              id: "provider.schedule.create.appointment-modal.vaccine-label",
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
            <Trans id="provider.schedule.create.appointment-modal.button">
              Speichern
            </Trans>
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
};
