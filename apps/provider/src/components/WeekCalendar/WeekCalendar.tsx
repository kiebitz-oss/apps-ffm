import { Link } from "@impfen/common";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";
import type { Appointment } from "vanellus";
import { AppointmentCell } from "./AppointmentCell";
import { AppointmentItem, AppointmentSet } from "./AppointmentSet";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);

interface WeekCalendarProps {
  appointments: Appointment[];
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

  const startDate = selectedWeek
    .startOf("week")
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0);

  const endDate = selectedWeek
    .endOf("week")
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.startDate.isBetween(startDate, endDate, "minute", "[)")
  );

  const appointmentSet = new AppointmentSet(filteredAppointments);

  let fromHour = defaultFromHour;
  let toHour = defaultToHour;

  let appointmentsMatrix: Record<
    string,
    Record<number, AppointmentItem[]>
  > = {};

  appointmentSet.appointmentItems.forEach((appointmentItem) => {
    const dateIdx = appointmentItem.startDate.format("DD-MM");

    if (dateIdx in appointmentsMatrix === false) {
      appointmentsMatrix[dateIdx] = {};
    }

    const hourIdx = Number(appointmentItem.startDate.format("H"));

    if (hourIdx in appointmentsMatrix[dateIdx] === false) {
      appointmentsMatrix[dateIdx][hourIdx] = [];
    }

    if (autoAdjustHours || (fromHour <= hourIdx && toHour >= hourIdx))
      appointmentsMatrix[dateIdx][hourIdx].push(appointmentItem);

    if (autoAdjustHours && fromHour > hourIdx) {
      fromHour = hourIdx;
    }

    if (autoAdjustHours && toHour <= hourIdx) {
      toHour = hourIdx;
    }
  });

  let days: Dayjs[] = [];

  for (let i = 0; i <= 6; i++) {
    days.push(startDate.add(i, "days"));
  }

  let hours: number[] = [];

  for (let i = fromHour; i <= toHour; i++) {
    hours.push(i);
  }

  console.log(appointmentsMatrix);

  return (
    <section id="week-calendar">
      <header id="week-calendar-header">
        week: {selectedWeek.week()}
        <br />
        start: {startDate.set("hour", fromHour).toDate().toLocaleString()}
        <br />
        end: {endDate.set("hour", toHour).toDate().toLocaleString()}
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

      <table className="overflow-x-auto overflow-y-hidden w-full border border-gray-300 border-collapse table-fixed">
        <thead>
          <tr>
            <th className="w-[75px] border border-gray-300">&nbsp;</th>

            {days.map((day) => (
              <th
                scope="row"
                className="border border-gray-300"
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
              <th scope="col" className="border border-gray-300">
                {hour}:00
              </th>

              {days.map((day) => (
                <td
                  key={`${hour}-${day.format("DD-MM")}`}
                  className="  border border-gray-300"
                >
                  <div className="relative h-auto min-h-[100px]">
                    {appointmentsMatrix[day.format("DD-MM")]?.[hour]?.map(
                      (appointmentItem) => (
                        <AppointmentCell
                          key={appointmentItem.appointment.id}
                          appointmentItem={appointmentItem}
                        />
                      )
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
