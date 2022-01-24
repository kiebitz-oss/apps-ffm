import { Link } from "@impfen/common";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";
import type { Appointment } from "vanellus";
import { AppointmentCell } from "./AppointmentCell";
import { AppointmentSet } from "./AppointmentSet";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);

interface WeekCalendarProps {
  appointments: Appointment[];
  week?: number;
  fromHour?: number;
  toHour?: number;
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  week,
  appointments,
  fromHour = 8,
  toHour = 18,
}) => {
  const selectedWeekOfYear =
    week && week >= 1 && week <= 52 ? week : dayjs().week();

  const selectedWeek = dayjs().week(selectedWeekOfYear);

  const lastWeek = selectedWeek.subtract(7, "day").week();
  const nextWeek = selectedWeek.add(7, "day").week();

  const startDate = selectedWeek
    .startOf("week")
    .set("hour", fromHour)
    .set("minute", 0)
    .set("second", 0);

  const endDate = selectedWeek
    .endOf("week")
    .set("hour", toHour)
    .set("minute", 59)
    .set("second", 59);

  const appointmentSet = new AppointmentSet(appointments);
  const filteredAppointments = appointmentSet.filterBetweenDates(
    startDate,
    endDate
  );

  let days: Dayjs[] = [];

  for (let i = 0; i <= 6; i++) {
    days.push(startDate.add(i, "days"));
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
        start: {startDate.toDate().toLocaleString()}
        <br />
        end: {endDate.toDate().toLocaleString()}
      </header>

      <div className="flex flex-row justify-between w-full">
        <Link
          href={`/schedule/${lastWeek < 0 ? 52 : lastWeek}`}
          className="hover"
        >
          zurück
        </Link>

        <Link
          href={`/schedule/${nextWeek > 52 ? 1 : nextWeek}`}
          className="hover"
        >
          vor
        </Link>
      </div>

      <table className="w-full border border-gray-300 border-collapse table-fixed">
        <thead>
          <tr>
            <th className="w-[75px] border border-gray-300">&nbsp;</th>

            {days.map((day) => (
              <th
                scope="row"
                className="border border-gray-300"
                key={day.toISOString()}
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
              <th scope="col" className="border border-gray-300">
                {hour}:00
              </th>

              {days.map((day) => (
                <td
                  key={`${hour}-${day.format("DD-MM")}`}
                  className="h-[100px] border border-gray-300 appointments"
                >
                  {appointmentSet
                    .filterBetweenDates(
                      day.set("hour", hour),
                      day.set("hour", hour + 1)
                    )
                    .map((appointment) => (
                      <AppointmentCell
                        key={appointment.appointment.id}
                        appointmentItem={appointment}
                      />
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
