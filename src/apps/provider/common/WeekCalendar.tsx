import dayjs from 'dayjs';
import 'dayjs/locale/de';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import localeData from 'dayjs/plugin/localeData';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import React from 'react';
import type { Appointment } from 'types';
import { Link } from 'ui';
import './weekCalendar.css';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(isLeapYear);

dayjs.locale('de');
dayjs.tz.setDefault('Europe/Berlin');

const HourRow: React.FC = ({ appointments, date, day, hour }) => {
    const ots = new Date(
        date.toLocaleDateString('en-US') +
            ' ' +
            hour.toLocaleString('en-US', { minimumIntegerDigits: 2 }) +
            ':00:00'
    );
    const ote = new Date(ots);
    ote.setHours(ots.getHours() + 1);
    const relevantAppointments = [];
    for (const oa of appointments) {
        // beginning of appointment
        const oas = new Date(`${oa.timestamp}`);
        // end of appointment
        const oae = new Date(oas.getTime() + 1000 * 60 * oa.duration);
        let startsHere = false;
        let relevant = false;
        // starts in interval
        if (oas >= ots && oas < ote) {
            startsHere = true;
            relevant = true;
        }
        // ends in interval
        if (oae > ots && oae <= ote) relevant = true;

        // is in interval
        if (oas <= ots && oae >= ote) relevant = true;

        if (relevant)
            relevantAppointments.push({
                startsHere: startsHere,
                appointment: oa,
            });
    }

    const showNewAppointment = () => {
        // const query = urlEncode({ timestamp: ots.toISOString() });
        // navigate(`/provider/schedule/${action}/new#${query}`);
    };

    const hasAppointments = relevantAppointments.length > 0;

    return (
        <div
            onClick={showNewAppointment}
            className={
                'kip-hour-row' +
                (hasAppointments ? ' kip-has-appointments' : '')
            }
        >
            {/* {hasAppointments && (
                <CalendarAppointments
                    ots={ots}
                    ote={ote}
                    appointments={relevantAppointments}
                />
            )} */}
        </div>
    );
};

const HourLabelRow: React.FC<{ hour: number | '-' }> = ({ hour }) => {
    let content;

    if (hour !== '-') {
        content = (
            <React.Fragment>
                {hour.toLocaleString('en-US', { minimumIntegerDigits: 2 })} -{' '}
                {(hour + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                })}
            </React.Fragment>
        );
    }

    return <div className="kip-hour-row kip-is-hour-label">{content}</div>;
};

const DayLabelRow: React.FC<{ day: number; date: Date }> = ({ day, date }) => {
    return (
        <div className="kip-hour-row kip-is-day-label">
            <span className="kip-day">{`day-${day + 1}`}</span>
            <span className="kip-date">{date.toLocaleDateString()}</span>
        </div>
    );
};

const DayColumn: React.FC<{
    day: number;
    date: Date;
    fromHour: number;
    toHour: number;
}> = ({ day, date, fromHour, toHour, appointments }) => {
    const hourRows = [
        <DayLabelRow
            // appointments={appointments}
            date={date}
            day={day}
            key="-"
        />,
    ];
    for (let i = fromHour; i <= toHour; i++) {
        hourRows.push(
            <HourRow
                appointments={appointments}
                key={i}
                hour={i}
                day={day}
                date={date}
            />
        );
    }
    return <div className="kip-day-column">{hourRows}</div>;
};

const DayLabelColumn: React.FC<{ fromHour: number; toHour: number }> = ({
    fromHour,
    toHour,
}) => {
    const hourRows = [<HourLabelRow hour="-" key="-" />];
    for (let i = fromHour; i <= toHour; i++) {
        hourRows.push(<HourLabelRow hour={i} key={i} />);
    }
    return <div className="kip-day-column kip-is-day-label">{hourRows}</div>;
};

interface WeekCalendarProps {
    appointments: Appointment[];
    week?: number;
    fromHour?: number;
    toHour?: number;
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({ week }) => {
    const selectedWeekOfYear =
        week && week >= 1 && week <= 52 ? week : dayjs().week();

    const selectedWeek = dayjs().week(selectedWeekOfYear);
    const lastWeek = selectedWeek.subtract(7, 'day').week();
    const nextWeek = selectedWeek.add(7, 'day').week();
    const startDate = selectedWeek.day(1).toDate();

    let fromHour;
    let toHour;

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    // appointments.forEach(app => {
    //     const appStartDate = new Date(app.timestamp);
    //     const appEndDate = new Date(
    //         new Date(app.timestamp).getTime() + 1000 * 60 * app.duration
    //     );
    //     if (
    //         appStartDate < startDate ||
    //         appStartDate > endDate ||
    //         app.slots === 0
    //     )
    //         return;
    //     const startHours = appStartDate.getHours();
    //     const endHours = appEndDate.getHours();
    //     if (fromHour === undefined || startHours < fromHour)
    //         fromHour = startHours;
    //     if (toHour === undefined || endHours > toHour) toHour = endHours;
    // });
    if (fromHour === undefined || fromHour > 8) fromHour = 8;
    if (toHour === undefined || toHour < 19) toHour = 19; // hours are inclusive

    const appointments = [];

    const dayColumns = [
        <DayLabelColumn
            fromHour={fromHour}
            toHour={toHour}
            key="-"
            appointments={appointments}
        />,
    ];
    const date = new Date(startDate);
    for (let i = 0; i < 7; i++) {
        dayColumns.push(
            <DayColumn
                appointments={appointments}
                fromHour={fromHour}
                toHour={toHour}
                date={new Date(date)}
                day={i}
                key={i}
            />
        );
        date.setDate(date.getDate() + 1);
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

            <div className="kip-week-calendar">{dayColumns}</div>
        </React.Fragment>
    );

    // if (fromHour > toHour || toHour > 23 || fromHour < 1) {
    //     fromHour = 8;
    //     toHour = 19;
    // }

    // // const dayColumns = [
    // //     <DayLabelColumn
    // //         fromHour={fromHour}
    // //         toHour={toHour}
    // //         key="-"
    // //         appointments={appointments}
    // //     />,
    // // ];
    // // const date = new Date(startDate);
    // for (let i = 0; i < 7; i++) {
    //     dayColumns.push(
    //         <DayColumn
    //             appointments={appointments}
    //             secondaryAction={secondaryAction}
    //             action={action}
    //             id={id}
    //             fromHour={fromHour}
    //             toHour={toHour}
    //             date={new Date(date)}
    //             day={i}
    //             key={i}
    //         />
    //     );
    //     date.setDate(date.getDate() + 1);
    // }

    // return (
    //     <div className="w-full">
    //         <Title variant="h3" as="h2">
    //             Calendar
    //         </Title>
    //         <div className="flex flex-row justify-between w-full">
    //             <Link
    //                 href={`/provider/schedule/week/${
    //                     lastWeek < 0 ? 52 : lastWeek
    //                 }`}
    //             >
    //                 zurück
    //             </Link>
    //             <Link
    //                 href={`/provider/schedule/week/${
    //                     nextWeek > 52 ? 1 : nextWeek
    //                 }`}
    //             >
    //                 vor
    //             </Link>
    //         </div>
    //         Week: {dayjs().locale()}
    //         <br />
    //         Week: {selectedWeekOfYear}
    //         <br />
    //         Week: {selectedWeek.format()}
    //         <br />
    //         first:{' '}
    //         {selectedWeek.day(dayjs().localeData().firstDayOfWeek()).format()}
    //         <br />
    //         last: {selectedWeek.day(7).format()}
    //         <div className="calendar-container">
    //             <div className="calendar-header">
    //                 <h1>
    //                     November
    //                     <button>▾</button>
    //                 </h1>
    //                 <p>2018</p>
    //             </div>

    //             <div className="calendar">
    //                 <span className="day-name">Mon</span>
    //                 <span className="day-name">Tue</span>
    //                 <span className="day-name">Wed</span>
    //                 <span className="day-name">Thu</span>
    //                 <span className="day-name">Fri</span>
    //                 <span className="day-name">Sat</span>
    //                 <span className="day-name">Sun</span>
    //                 <div className="day day--disabled">30</div>
    //                 <div className="day day--disabled">31</div>
    //                 <div className="day">1</div>
    //                 <div className="day">2</div>
    //                 <div className="day">3</div>
    //                 <div className="day">4</div>
    //                 <div className="day">5</div>
    //                 <div className="day">6</div>
    //                 <div className="day">7</div>
    //                 <div className="day">8</div>
    //                 <div className="day">9</div>
    //                 <div className="day">10</div>
    //                 <div className="day">11</div>
    //                 <div className="day">12</div>
    //                 <div className="day">13</div>
    //                 <div className="day">14</div>
    //                 <div className="day">15</div>
    //                 <div className="day">16</div>
    //                 <div className="day">17</div>
    //                 <div className="day">18</div>
    //                 <div className="day">19</div>
    //                 <div className="day">20</div>
    //                 <div className="day">21</div>
    //                 <div className="day">22</div>
    //                 <div className="day">23</div>
    //                 <div className="day">24</div>
    //                 <div className="day">25</div>
    //                 <div className="day">26</div>
    //                 <div className="day">27</div>
    //                 <div className="day">28</div>
    //                 <div className="day">29</div>
    //                 <div className="day">30</div>
    //                 <div className="day">31</div>
    //                 <div className="day day--disabled">1</div>
    //                 <div className="day day--disabled">2</div>
    //             </div>
    //         </div>
    //     </div>
    // );
};
