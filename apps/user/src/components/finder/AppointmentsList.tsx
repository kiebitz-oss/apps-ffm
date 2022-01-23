import { Trans } from "@lingui/macro";
import dayjs from "dayjs";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { getAppointments } from "stores/app";
import { suspend } from "suspend-react";
import type { AggregatedPublicAppointment } from "vanellus";
import { AppointmentCardSelector } from "./AppointmentCardSelector";

interface AppointmentsListProps {
  date?: Date;
  providerId: string;
}

export const AppointmentsList: FC<AppointmentsListProps> = ({
  providerId,
  date = new Date(),
}) => {
  const appointments = suspend(
    async () => {
      return getAppointments(date);
    },
    [date, providerId],
    { lifespan: 5 * 60 * 1000 /* 5 minutes cache in miliseconds */ }
  );

  const [filteredAppointments, setFilteredAppointments] = useState<
    AggregatedPublicAppointment[]
  >([]);

  useEffect(() => {
    setFilteredAppointments(
      appointments.filter(
        (appointment) =>
          appointment.provider.id === providerId &&
          dayjs(appointment.startDate).isAfter(dayjs(date), "minute")
      )
    );
  }, [appointments, providerId, date]);

  if (dayjs(date).isBefore(dayjs(), "minutes")) {
    return (
      <Trans id="user.finder.appointment.date-past">
        Das gewählte Impfdatum liegt in der Vergangenheit.
      </Trans>
    );
  }

  if (filteredAppointments.length < 1) {
    return (
      <Trans id="user.finder.appointment.no-result">
        Es sind keine freien Termine verfügbar.
        <br />
        Bitte versuchen Sie einen späteren Zeitpunkt oder eine andere
        Impfstelle.
      </Trans>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2 lg:grid-cols-3">
      {filteredAppointments.map((appointment) => (
        <AppointmentCardSelector
          appointment={appointment}
          key={appointment.id}
        />
      ))}
    </div>
  );
};
