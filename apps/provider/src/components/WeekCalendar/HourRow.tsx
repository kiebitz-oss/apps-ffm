import clsx from "clsx";
import type { Dayjs } from "dayjs";
import type { AppointmentItem } from "./AppointmentSet";
import { CalendarAppointments } from "./CalendarAppointments";

interface HourRowProps {
  appointmentItems: AppointmentItem[];
  date: Dayjs;
  hour: number;
}

export const HourRow: React.FC<HourRowProps> = ({
  appointmentItems,
  date,
  hour,
}) => {
  const hourStartDate = date.set("hour", hour);
  const hourEndDate = hourStartDate.add(1, "hour");

  const relevantAppointments = appointmentItems.filter((appointmentItem) => {
    // starts in interval;
    return appointmentItem.startDate.isBetween(
      hourStartDate,
      hourEndDate,
      "minute",
      "[)"
    );
  });

  const hasAppointments = relevantAppointments.length > 0;

  return (
    <div
      className={clsx("hour-row", {
        "has-appointments": hasAppointments,
      })}
    >
      {hasAppointments && (
        <CalendarAppointments appointmentItems={relevantAppointments} />
      )}
    </div>
  );
};
