import type { AppointmentItem } from "./AppointmentSet";

interface AppointmentCellProps {
  appointmentItem: AppointmentItem;
}

export const AppointmentCell: React.FC<AppointmentCellProps> = ({
  appointmentItem,
}) => {
  const height = Math.floor((appointmentItem.appointment.duration / 60) * 100);
  const width = Math.floor(100 / (1 + appointmentItem.maxOverlap));
  const top = Math.floor((appointmentItem.startDate.get("minutes") / 60) * 100);

  const i = appointmentItem.overlapsWith.filter(
    (overlappingAppointment) =>
      overlappingAppointment.index < appointmentItem.index
  ).length;

  const left = Math.floor(i * width);
  // const tiny = height < 33 || width < 50;

  // if (tiny) {
  //   return null;
  // }

  const rand = Math.floor(Math.random() * 100 + 1);

  return (
    <div
      style={{
        height: `${height}%`,
        minHeight: `${height}%`,
        width: `${width}%`,
        top: `${top}%`,
        left: `${left}%`,
        backgroundColor: `hsl(${((100 - rand) / 100) * 120}, 75%, 50%)`,
      }}
      className="overflow-hidden hover:overflow-visible absolute z-10 hover:z-20 flex-col p-2 hover:!w-full hover:!h-auto text-xs hover:text-base opacity-80 hover:opacity-100 transition-all cursor-pointer"
    >
      <h4>
        {appointmentItem.startDate.format("HH:mm")} -
        {appointmentItem.endDate.format("HH:mm")}
      </h4>

      <div>
        {appointmentItem.appointment.properties?.seriesId ? (
          <>SERIE - </>
        ) : null}
        {/* {appointmentItem.appointment.bookings.length}/{appointmentItem.appointment.slotData.length} */}
        {rand}/100
      </div>

      {(appointmentItem.appointment.properties?.vaccine as string) || ""}
    </div>
  );
};
