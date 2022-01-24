import { AppointmentCell } from "./AppointmentCell";
import type { AppointmentItem } from "./AppointmentSet";

interface CalendarAppointmentsProps {
  appointmentItems: AppointmentItem[];
}

export const CalendarAppointments: React.FC<CalendarAppointmentsProps> = ({
  appointmentItems,
}) => {
  return (
    <div className="appointments">
      {appointmentItems.map((appointmentItem) => (
        <AppointmentCell
          key={appointmentItem.appointment.id}
          appointmentItem={appointmentItem}
        />
      ))}
    </div>
  );
};
