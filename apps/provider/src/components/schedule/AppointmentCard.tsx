import { Button, Vaccine, vaccines } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { cancelAppointment } from "stores/app";
import type { Appointment } from "vanellus";
import { AppointmentStatus } from "vanellus";

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
  let [actualAppointment, setActualAppointment] =
    useState<Appointment>(appointment);

  const handleCancelAppointment = useCallback(async () => {
    cancelAppointment(appointment).then(setActualAppointment);
  }, [appointment]);

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
            {i18n.date(actualAppointment.startDate, {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            Uhr
          </Trans>
        </div>

        <div className="text-xl">
          <Trans id="user.finder.appointment.card.date">
            am{" "}
            {i18n.date(actualAppointment.startDate, {
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
            actualAppointment.properties.vaccine as Vaccine
          ].name
        }
      </p>

      <div className="text-center">
        Slots: {actualAppointment.bookings.length}/
        {actualAppointment.slotData.length} -{actualAppointment.status}
        <br />
        {actualAppointment.status !== AppointmentStatus.CANCELED && (
          <Button size="sm" onClick={handleCancelAppointment}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};
