import { Button, Vaccine, vaccines } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import clsx from "clsx";
import { useApp } from "lib/AppProvider";
import { Appointment, AppointmentStatus } from "vanellus";

export interface AppointmentCardProps {
  appointment: Appointment;
  className?: string;
  border?: true | undefined;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  children,
  appointment,
  className,
  border = false,
  ...props
}) => {
  const { i18n } = useLingui();
  const { api } = useApp();

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 items-center p-4 font-semibold default-focus",
        {
          ["rounded border-2 border-black"]: border,
        },
        className
      )}
      {...props}
    >
      <time className="flex flex-col font-semibold text-center">
        <div className="text-4xl">
          <Trans id="user.finder.appointment.card.time">
            {appointment.startDate.toLocaleTimeString(i18n.locale, {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            Uhr
          </Trans>
        </div>

        <div className="text-xl">
          <Trans id="user.finder.appointment.card.date">
            am{" "}
            {appointment.startDate.toLocaleDateString(i18n.locale, {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </Trans>
        </div>
      </time>

      <p className="text-center">
        {
          vaccines[i18n.locale || "de"][
            appointment.properties.vaccine as Vaccine
          ].name
        }
      </p>

      <div className="text-center">
        Slots: {appointment.bookings.length}/{appointment.slotData.length} -
        {appointment.status}
        <br />
        {appointment.status !== AppointmentStatus.CANCELED && (
          <Button size="sm" onClick={() => api.cancelAppointment(appointment)}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};
