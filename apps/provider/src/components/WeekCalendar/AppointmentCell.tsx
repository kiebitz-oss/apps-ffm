import { Link } from "@impfen/common";
import clsx from "clsx";
import { encodeBase64url } from "vanellus";
import type { AppointmentItem } from "./AppointmentSet";

interface AppointmentCellProps {
  appointmentItem: AppointmentItem;
}

export const AppointmentCell: React.FC<AppointmentCellProps> = ({
  appointmentItem,
}) => {
  const percentage = Math.floor(
    (appointmentItem.appointment.duration / 60) * 100
  );
  const width = Math.floor(100 / (1 + appointmentItem.maxOverlap));
  const top = Math.floor((appointmentItem.startDate.get("minutes") / 60) * 100);

  const i = appointmentItem.overlapsWith.filter(
    (overlappingAppointment) =>
      overlappingAppointment.index < appointmentItem.index
  ).length;

  const left = Math.floor(i * width);
  const tiny = percentage < 33 || width < 50;

  const hexId = encodeBase64url(appointmentItem.appointment.id);

  // if (tiny) {
  //   return null;
  // }

  return (
    <Link
      style={{
        height: `${percentage}%`,
        width: `${width}%`,
        top: `${top}%`,
        left: `${left}%`,
      }}
      href={`/schedule/show/${hexId}`}
      className={clsx("appointment-cell")}
    >
      <h4>
        {appointmentItem.startDate.format("HH:mm")} - <br />
        {appointmentItem.endDate.format("HH:mm")}
      </h4>

      <div>
        {appointmentItem.appointment.bookings.length}/
        {appointmentItem.appointment.slotData.length}
      </div>

      {(appointmentItem.appointment.properties?.vaccine as string) || ""}
    </Link>
  );
};
