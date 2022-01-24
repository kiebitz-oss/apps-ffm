import { Link } from "@impfen/common";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";
import type { Appointment } from "vanellus";
import { AppointmentSet } from "./AppointmentSet";
import { DayColumn } from "./DayColumn";
import { DayLabelColumn } from "./DayLabelColumn";

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

      <div className=" week-calendar">
        <DayLabelColumn fromHour={fromHour} toHour={toHour} key="-" />

        {Array.from(Array(7).keys()).map((dayNr) => {
          const date = startDate.add(dayNr, "days");

          return (
            <DayColumn
              appointmentItems={filteredAppointments}
              fromHour={fromHour}
              toHour={toHour}
              date={date}
              key={`day-${dayNr}`}
            />
          );
        })}
      </div>
    </section>
  );
};
