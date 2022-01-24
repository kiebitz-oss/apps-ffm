import type { Dayjs } from "dayjs";
import type { AppointmentItem } from "./AppointmentSet";
import { DayLabelRow } from "./DayLabelRow";
import { HourRow } from "./HourRow";

interface DayColumnProps {
  date: Dayjs;
  fromHour: number;
  toHour: number;
  appointmentItems: AppointmentItem[];
}

export const DayColumn: React.FC<DayColumnProps> = ({
  date,
  fromHour,
  toHour,
  appointmentItems,
}) => {
  const hourRows = [<DayLabelRow date={date} key="-" />];

  for (let i = fromHour; i <= toHour; i++) {
    hourRows.push(
      <HourRow
        appointmentItems={appointmentItems}
        hour={i}
        date={date}
        key={`hour-row-${i}`}
      />
    );
  }

  return <div className="day-column">{hourRows}</div>;
};
