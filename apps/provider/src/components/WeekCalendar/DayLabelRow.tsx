import type { Dayjs } from "dayjs";

interface DayLabelRowProps {
  date: Dayjs;
}

export const DayLabelRow: React.FC<DayLabelRowProps> = ({ date }) => {
  return (
    <div className="hour-row day-label">
      <span className="day">{date.format("dd")}</span>
      <span className="date">{date.local().format("DD.MM")}</span>
    </div>
  );
};
