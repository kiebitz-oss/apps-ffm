interface HourLabelRowProps {
  hour: number | "-";
}

export const HourLabelRow: React.FC<HourLabelRowProps> = ({ hour }) => {
  let content = "";

  if (hour !== "-") {
    content = `${hour.toLocaleString()}:00`;
  }

  return <div className="hour-row hour-label">{content}</div>;
};
