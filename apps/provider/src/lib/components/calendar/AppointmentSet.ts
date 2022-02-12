import type { Dayjs } from "dayjs";
import type { Appointment } from "vanellus";

export class AppointmentItem {
  public appointment: Appointment;
  public startAt: Dayjs;
  public endAt: Dayjs;
  public overlapsWith: AppointmentItem[] = [];
  public maxOverlap = 0;
  public index = 0;

  constructor(appointment: Appointment) {
    this.appointment = appointment;
    this.startAt = this.appointment.startAt;
    this.endAt = this.appointment.endAt;
  }
}

export class AppointmentSet {
  public appointmentItems: AppointmentItem[];

  constructor(appointments: Appointment[]) {
    let activeAppointmentItems: AppointmentItem[] = [];

    this.appointmentItems = appointments
      // sort by startAt
      // .sort(
      //   (a, b) =>
      //     a.startAt.toDate().getTime() - b.startAt.toDate().getTime()
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
            appointmentItem.startAt.isBefore(activeAppointmentItem.endAt)
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
