import { HourLabelRow } from "./HourLabelRow";

interface DayLabelPropsColumnProps {
  fromHour: number;
  toHour: number;
}

export const DayLabelColumn: React.FC<DayLabelPropsColumnProps> = ({
  fromHour,
  toHour,
}) => {
  const hourRows = [<HourLabelRow hour="-" key="-" />];

  for (let i = fromHour; i <= toHour; i++) {
    hourRows.push(<HourLabelRow hour={i} key={`hour-label-${i}`} />);
  }

  return <div className="day-column day-label">{hourRows}</div>;
};
