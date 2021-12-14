import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import localeData from 'dayjs/plugin/localeData';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { getHexId } from 'helpers/conversion';
import React from 'react';
import type { Appointment } from 'types';
import { Link } from 'ui';
import { Tag } from 'ui/Tag';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(isLeapYear);

dayjs.locale('de');
dayjs.tz.setDefault('Europe/Berlin');

const enrichAppointments = (appointments: Appointment[]) => {
    const sortedAppointments = appointments
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map((oa) => ({ ...oa }));

    let activeAppointments: Appointment[] = [];

    for (const [i, oa] of sortedAppointments
        // .filter((app) => app.slots > 0)
        .entries()) {
        oa.maxOverlap = 0;
        oa.index = i;
        oa.start = new Date(`${oa.timestamp}`);

        // end of appointment (we calculate with 45 minute minimum duration)
        oa.stop = new Date(
            oa.start.getTime() + 1000 * 60 * Math.max(0, oa.duration)
        );

        activeAppointments = activeAppointments.filter(
            (aa) => aa.stop > oa.start
        );

        oa.overlapsWith = [...activeAppointments];

        for (const ova of oa.overlapsWith) {
            ova.overlapsWith.push(oa);
        }

        activeAppointments.push(oa);

        const na = activeAppointments.length - 1;

        for (const aa of activeAppointments) {
            if (na > aa.maxOverlap) aa.maxOverlap = na;
        }
    }

    return sortedAppointments;
};

interface HourRowProps {
    appointments: Appointment[];
    date: Date;
    hour: number;
}

const HourRow: React.FC<HourRowProps> = ({ appointments, date, hour }) => {
    const hourStartDate = new Date(
        date.toLocaleDateString('en-US') +
            ' ' +
            hour.toLocaleString('en-US', { minimumIntegerDigits: 2 }) +
            ':00:00'
    );

    const hourEndDate = new Date(hourStartDate);
    hourEndDate.setHours(hourStartDate.getHours() + 1);

    const relevantAppointments: Appointment[] = [];

    for (const appointment of appointments) {
        // beginning of appointment
        const appointmentDate = appointment.date;

        // end of appointment
        const appointmentEndDate = new Date(
            appointmentDate.getTime() + 1000 * 60 * appointment.duration
        );

        let relevant = false;

        // starts in interval
        if (appointmentDate >= hourStartDate && appointmentDate < hourEndDate) {
            appointment.startsHere = true;
            relevant = true;
        }

        // ends in interval
        if (
            appointmentEndDate > hourStartDate &&
            appointmentEndDate <= hourEndDate
        ) {
            relevant = true;
        }

        // is in interval
        if (
            appointmentDate <= hourStartDate &&
            appointmentEndDate >= hourEndDate
        ) {
            relevant = true;
        }

        if (relevant) {
            relevantAppointments.push(appointment);
        }
    }

    const hasAppointments = relevantAppointments.length > 0;
    const action = 'show';

    return (
        <Link
            href={`/provider/schedule/${action}/new?timestamp=${hourStartDate.toISOString()}`}
            className={clsx('hour-row', {
                'has-appointments': hasAppointments,
            })}
        >
            {hasAppointments && (
                <CalendarAppointments
                    // ots={ots}
                    // ote={ote}
                    appointments={relevantAppointments}
                />
            )}
        </Link>
    );
};

interface HourLabelRowProps {
    hour: number | '-';
}

const HourLabelRow: React.FC<HourLabelRowProps> = ({ hour }) => {
    let content = '';

    if (hour !== '-') {
        content = `${hour.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
        })} - ${(hour + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
        })}`;
    }

    return <div className="hour-row hour-label">{content}</div>;
};

interface DayLabelRowProps {
    date: Date;
}

const DayLabelRow: React.FC<DayLabelRowProps> = ({ date }) => {
    return (
        <div className="hour-row day-label">
            <span className="day">{`day-${date.getDay()}`}</span>
            <span className="date">{date.toLocaleDateString()}</span>
        </div>
    );
};
interface DayColumnProps {
    date: Date;
    fromHour: number;
    toHour: number;
    appointments: Appointment[];
}

const DayColumn: React.FC<DayColumnProps> = ({
    date,
    fromHour,
    toHour,
    appointments,
}) => {
    const hourRows = [<DayLabelRow date={date} key="-" />];

    for (let i = fromHour; i <= toHour; i++) {
        hourRows.push(
            <HourRow
                appointments={appointments}
                hour={i}
                date={date}
                key={`hour-row-${i}`}
            />
        );
    }

    return <div className="day-column">{hourRows}</div>;
};

interface DayLabelPropsColumnProps {
    fromHour: number;
    toHour: number;
}

const DayLabelColumn: React.FC<DayLabelPropsColumnProps> = ({
    fromHour,
    toHour,
}) => {
    const hourRows = [<HourLabelRow hour="-" key="-" />];

    for (let i = fromHour; i <= toHour; i++) {
        hourRows.push(<HourLabelRow hour={i} key={`hour-label-${i}`} />);
    }

    return <div className="day-column day-label">{hourRows}</div>;
};

interface AppointmentItemProps {
    appointment: Appointment;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment }) => {
    const percentage = Math.floor((appointment.duration / 60) * 100);
    const width = Math.floor(100 / (1 + appointment.maxOverlap));
    const top = Math.floor((appointment.date.getMinutes() / 60) * 100);
    const i = 0;
    // appointment.overlapsWith.filter(
    //     (oa) => oa.index < appointment.index
    // ).length;

    const left = Math.floor(i * width);
    const tiny = percentage < 33 || width < 50;

    const hexId = getHexId(appointment.id);
    const action = 'week';

    return (
        <Link
            style={{
                height: `calc(${percentage}% - 5%)`,
                width: `calc(${width}% - 5%)`,
                top: `calc(${top}% + 2.5%)`,
                left: `calc(${left}% + 2.5%)`,
            }}
            href={`/provider/schedule/${action}/show/${hexId}`}
            className={clsx('appointment-item')}
        >
            <Tag className="open" size="sm">
                {appointment.slots.length}
            </Tag>
            <Tag className="booked" size="sm">
                {appointment.bookings.length}
            </Tag>
            <Tag className="vaccine" size="sm">
                {appointment.vaccine}
            </Tag>
            {/* <PropertyTags appointment={appointment} tiny /> */}
        </Link>
    );
};

interface CalendarAppointmentsProps {
    appointments: Appointment[];
}

const CalendarAppointments: React.FC<CalendarAppointmentsProps> = ({
    appointments,
}) => {
    const enrichedAppointments = enrichAppointments(appointments);

    return (
        <div className="appointments">
            {enrichedAppointments
                .filter(
                    (appointment) => appointment.startsHere
                    // && appointment.slots > 0
                )
                .map((appointment) => (
                    <AppointmentItem
                        key={appointment.id}
                        appointment={appointment}
                    />
                ))}
        </div>
    );
};

interface WeekCalendarProps {
    appointments: Appointment[];
    week?: number;
    fromHour?: number;
    toHour?: number;
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
    week,
    appointments,
    fromHour,
    toHour,
}) => {
    const selectedWeekOfYear =
        week && week >= 1 && week <= 52 ? week : dayjs().week();

    const selectedWeek = dayjs().week(selectedWeekOfYear);
    const lastWeek = selectedWeek.subtract(7, 'day').week();
    const nextWeek = selectedWeek.add(7, 'day').week();
    const startDate = selectedWeek.day(1).toDate();

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    appointments.forEach((appointment) => {
        const appStartDate = appointment.date;
        const appEndDate = new Date(
            appointment.date.getTime() + 1000 * 60 * appointment.duration
        );

        if (
            appStartDate < startDate ||
            appStartDate > endDate
            // ||
            // appointment.slots === 0
        ) {
            return;
        }

        const startHours = appStartDate.getHours();
        const endHours = appEndDate.getHours();

        if (fromHour === undefined || startHours < fromHour) {
            fromHour = startHours;
        }
        if (toHour === undefined || endHours > toHour) {
            toHour = endHours;
        }
    });

    if (!fromHour || fromHour > 8) {
        fromHour = 8;
    }

    if (!toHour || toHour < 19) {
        toHour = 19; // hours are inclusive
    }

    return (
        <React.Fragment>
            <div className="flex flex-row justify-between w-full">
                <Link
                    href={`/provider/schedule/week/${
                        lastWeek < 0 ? 52 : lastWeek
                    }`}
                    className="hover"
                >
                    zurück
                </Link>

                <Link
                    href={`/provider/schedule/week/${
                        nextWeek > 52 ? 1 : nextWeek
                    }`}
                    className="hover"
                >
                    vor
                </Link>
            </div>

            <div className="week-calendar">
                <DayLabelColumn fromHour={fromHour} toHour={toHour} key="-" />

                {Array.from(Array(7).keys()).map((dayNr) => {
                    const date = new Date(startDate);

                    return (
                        <DayColumn
                            appointments={appointments}
                            fromHour={fromHour}
                            toHour={toHour}
                            date={
                                new Date(date.setDate(date.getDate() + dayNr))
                            }
                            key={`day-${dayNr}`}
                        />
                    );
                })}
            </div>
        </React.Fragment>
    );
};
