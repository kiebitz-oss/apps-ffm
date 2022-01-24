import dayjs, { Dayjs } from "dayjs";
import type { Appointment } from "vanellus";

export class AppointmentItem {
  public appointment: Appointment;
  public startDate: Dayjs;
  public endDate: Dayjs;
  public overlapsWith: AppointmentItem[] = [];
  public maxOverlap = 0;
  public index = 0;

  constructor(appointment: Appointment) {
    this.appointment = appointment;
    this.startDate = dayjs(this.appointment.startDate);
    this.endDate = dayjs(this.appointment.endDate);
  }
}

export class AppointmentSet {
  public appointmentItems: AppointmentItem[];

  constructor(appointments: Appointment[]) {
    let activeAppointmentItems: AppointmentItem[] = [];

    this.appointmentItems = appointments
      // sort by startDate
      // .sort(
      //   (a, b) =>
      //     a.startDate.toDate().getTime() - b.startDate.toDate().getTime()
      // )
      // map to AppointmentItem
      .map((appointment, i) => {
        const appointmentItem =
          appointment instanceof AppointmentItem
            ? appointment
            : new AppointmentItem(appointment);

        appointmentItem.index = i;

        activeAppointmentItems = activeAppointmentItems.filter(
          (activeAppointmentItem) =>
            appointmentItem.startDate.isBefore(activeAppointmentItem.endDate)
        );

        appointmentItem.overlapsWith = [...activeAppointmentItems];

        appointmentItem.overlapsWith.forEach((overlappingAppointmentItem) =>
          overlappingAppointmentItem.overlapsWith.push(appointmentItem)
        );

        activeAppointmentItems.push(appointmentItem);

        const nextAppointmentItIndex = activeAppointmentItems.length - 1;

        activeAppointmentItems.forEach((appointmentItem) => {
          if (nextAppointmentItIndex > appointmentItem.maxOverlap) {
            appointmentItem.maxOverlap = nextAppointmentItIndex;
          }
        });

        return appointmentItem;
      });
  }
}
