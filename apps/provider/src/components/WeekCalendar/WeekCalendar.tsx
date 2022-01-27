import { Link, Vaccine } from "@impfen/common";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";
import type { Appointment } from "vanellus";
import { AppointmentCell } from "./AppointmentCell";
import { CalendarItem } from "./CalendarItem";

dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);

interface WeekCalendarProps {
  appointments: Appointment<Vaccine>[];
  week?: number;
  autoAdjustHours?: boolean;
  defaultFromHour?: number;
  defaultToHour?: number;
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  week,
  appointments,
  autoAdjustHours = true,
  defaultFromHour = 9,
  defaultToHour = 16,
}) => {
  const selectedWeekOfYear =
    week && week >= 1 && week <= 52 ? week : dayjs().week();

  const selectedWeek = dayjs().week(selectedWeekOfYear);

  const lastWeek = selectedWeek.subtract(7, "day").week();
  const nextWeek = selectedWeek.add(7, "day").week();

  const startAt = selectedWeek
    .startOf("week")
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0);

  const endAt = selectedWeek
    .endOf("week")
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.startAt.isBetween(startAt, endAt, "minute", "[)")
  );

  let fromHour = defaultFromHour;
  let toHour = defaultToHour;

  let appointmentsMatrix: Record<string, Record<number, CalendarItem[]>> = {};
  let seriesMatrix: Record<string, CalendarItem> = {};

  let slots = 0;
  let bookedSlots = 0;

  filteredAppointments.forEach((appointment) => {
    const dateIdx = appointment.startAt.local().format("DD-MM");

    if (dateIdx in appointmentsMatrix === false) {
      appointmentsMatrix[dateIdx] = {};
    }

    const hourIdx = Number(appointment.startAt.local().format("H"));

    if (hourIdx in appointmentsMatrix[dateIdx] === false) {
      appointmentsMatrix[dateIdx][hourIdx] = [];
    }

    if (autoAdjustHours || (fromHour <= hourIdx && toHour >= hourIdx)) {
      slots += appointment.slotData.length;
      bookedSlots += appointment.bookings.length;

      if (!appointment.properties?.seriesId) {
        const item = new CalendarItem(appointment);

        appointmentsMatrix[dateIdx][hourIdx].push(item);
      } else {
        if (
          (appointment.properties.seriesId as string) in seriesMatrix ===
          false
        ) {
          seriesMatrix[appointment.properties.seriesId as string] =
            new CalendarItem(appointment);
        } else {
          seriesMatrix[appointment.properties.seriesId as string].add(
            appointment
          );
        }
      }
    }

    if (autoAdjustHours && fromHour > hourIdx) {
      fromHour = hourIdx;
    }

    const endHour = Number(appointment.endAt.format("H"));

    if (autoAdjustHours && toHour <= endHour) {
      toHour = endHour;
    }
  });

  Object.keys(seriesMatrix).forEach((seriesId) => {
    const series = seriesMatrix[seriesId];
    const dateIdx = series.startAt.format("DD-MM");

    if (dateIdx in appointmentsMatrix === false) {
      appointmentsMatrix[dateIdx] = {};
    }

    const hourIdx = Number(series.startAt.format("H"));

    if (hourIdx in appointmentsMatrix[dateIdx] === false) {
      appointmentsMatrix[dateIdx][hourIdx] = [];
    }

    if (autoAdjustHours || (fromHour <= hourIdx && toHour >= hourIdx)) {
      appointmentsMatrix[dateIdx][hourIdx].push(series);
    }

    if (autoAdjustHours && fromHour > hourIdx) {
      fromHour = hourIdx;
    }

    const endHour = Number(series.endAt.format("H"));

    if (autoAdjustHours && toHour <= endHour) {
      toHour = endHour;
    }
  });

  let days: Dayjs[] = [];

  for (let i = 0; i <= 6; i++) {
    days.push(startAt.add(i, "days"));
  }

  let hours: number[] = [];

  for (let i = fromHour; i <= toHour; i++) {
    hours.push(i);
  }

  return (
    <section id="week-calendar">
      <header id="week-calendar-header">
        week: {selectedWeek.week()}
        <br />
        start: {startAt.set("hour", fromHour).toDate().toLocaleString()}
        <br />
        end: {endAt.set("hour", toHour).toDate().toLocaleString()}
        <br />
        <span
          style={{
            backgroundColor: `hsl(${
              ((100 - bookedSlots / slots) / 100) * 120
            }, 88%, 43%)`,
          }}
        >
          stats: {bookedSlots}/{slots}
        </span>
      </header>

      <div className="flex flex-row justify-between my-4 w-full">
        <Link
          href={`/schedule/${lastWeek < 0 ? 52 : lastWeek}`}
          className="text-4xl font-medium hover"
        >
          ❮ zurück
        </Link>

        <Link
          href={`/schedule/${nextWeek > 52 ? 1 : nextWeek}`}
          className="text-4xl font-medium hover"
        >
          vor ❯
        </Link>
      </div>

      <table className="overflow-x-auto overflow-y-hidden w-full border border-gray-300 table-fixed">
        <thead>
          <tr>
            <th className="w-[75px] border border-gray-300">&nbsp;</th>

            {days.map((day) => (
              <th
                scope="row"
                className="bg-gray-50 border border-gray-300"
                key={day.format("DD.MM.")}
              >
                {day.format("dd")}
                <br />
                {day.format("DD.MM.")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <th scope="col" className="bg-gray-50 border border-gray-300">
                {hour}:00
              </th>

              {days.map((day) => (
                <td
                  key={`${hour}-${day.format("DD-MM")}`}
                  className="relative h-[100px] border border-gray-300"
                >
                  {appointmentsMatrix[day.format("DD-MM")]?.[hour]?.map(
                    (item) => (
                      <AppointmentCell key={item.id} item={item} />
                    )
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
