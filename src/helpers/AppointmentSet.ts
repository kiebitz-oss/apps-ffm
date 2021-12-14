import type { Appointment } from 'types';

export class AppointmentItem {
    public appointment: Appointment;
    public startDate: Date;
    public endDate: Date;
    public overlapsWith: AppointmentItem[] = [];
    public maxOverlap = 0;
    public index = 0;
    public startsHere = false;

    constructor(appointment: Appointment) {
        this.appointment = appointment;
        this.startDate = this.appointment.date;
        this.endDate = new Date(
            this.appointment.date.getTime() +
                1000 * 60 * Math.max(0, appointment.duration)
        );
    }
}

export class AppointmentSet implements Iterable<AppointmentItem> {
    protected appointmentItems: AppointmentItem[];

    constructor(appointments: Appointment[]) {
        let activeAppointmentItems: AppointmentItem[] = [];

        this.appointmentItems = appointments
            // filter appointments without slots
            .filter((app) => app.slots.length > 0)
            // sort by startDate
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            // map to AppointmentItem
            .map((appointment, i) => {
                const appointmentItem =
                    appointment instanceof AppointmentItem
                        ? appointment
                        : new AppointmentItem(appointment);

                appointmentItem.index = i;

                activeAppointmentItems = activeAppointmentItems.filter(
                    (activeAppointmentItem) =>
                        activeAppointmentItem.endDate >
                        appointmentItem.startDate
                );

                appointmentItem.overlapsWith = [...activeAppointmentItems];

                for (const overlappingAppointmentItem of appointmentItem.overlapsWith) {
                    overlappingAppointmentItem.overlapsWith.push(
                        appointmentItem
                    );
                }

                activeAppointmentItems.push(appointmentItem);

                const nextAppointmentItIndex =
                    activeAppointmentItems.length - 1;

                for (const appointmentItem of activeAppointmentItems) {
                    if (nextAppointmentItIndex > appointmentItem.maxOverlap) {
                        appointmentItem.maxOverlap = nextAppointmentItIndex;
                    }
                }

                return appointmentItem;
            });
    }

    public filterBetweenDates(
        from: Date,
        to: Date,
        appointmentItems?: AppointmentItem[]
    ) {
        return (appointmentItems || this.appointmentItems).filter(
            (appointmentItem) => {
                return (
                    appointmentItem.startDate > from &&
                    appointmentItem.endDate < to &&
                    appointmentItem.appointment.slots.length >= 0
                );
            }
        );
    }

    public filterRelevantAppointmentItems(
        from: Date,
        to: Date,
        appointmentItems?: AppointmentItem[]
    ) {
        return (appointmentItems || this.appointmentItems).filter(
            (appointmentItem) => {
                // starts in interval
                if (
                    appointmentItem.startDate >= from &&
                    appointmentItem.startDate < to
                ) {
                    appointmentItem.startsHere = true;
                    return true;
                }

                // ends in interval
                if (
                    appointmentItem.endDate > from &&
                    appointmentItem.endDate <= to
                ) {
                    appointmentItem.startsHere = false;
                    return true;
                }

                // is in interval
                if (
                    appointmentItem.startDate <= from &&
                    appointmentItem.endDate >= to
                ) {
                    appointmentItem.startsHere = false;
                    return true;
                }

                return false;
            }
        );
    }

    [Symbol.iterator]() {
        // Use a new index for each iterator. This makes multiple
        // iterations over the iterable safe for non-trivial cases,
        // such as use of break or nested looping over the same iterable.
        let index = 0;

        return {
            next: () => {
                if (index < this.appointmentItems.length) {
                    return {
                        value: this.appointmentItems[index++],
                        done: false,
                    };
                }

                return { value: this.appointmentItems[index++], done: true };
            },
        };
    }
}
