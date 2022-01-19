export const WeekCalendar: React.FC<{
  appointments: any;
  week?: number;
}> = () => null;

// import { Tag } from "@kiebitz-oss/common";
// import clsx from "clsx";
// import dayjs from "dayjs";
// import "dayjs/locale/de";
// import isLeapYear from "dayjs/plugin/isLeapYear";
// import localeData from "dayjs/plugin/localeData";
// import timezone from "dayjs/plugin/timezone";
// import utc from "dayjs/plugin/utc";
// import weekOfYear from "dayjs/plugin/weekOfYear";
// import { Fragment } from "react";
// import type { Appointment } from "vanellus";
// import { Link } from "../../components/Link";

// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.extend(localeData);
// dayjs.extend(weekOfYear);
// dayjs.extend(isLeapYear);

// dayjs.locale("de");
// dayjs.tz.setDefault("Europe/Berlin");

// interface HourRowProps {
//   appointmentItems: Appointment[];
//   date: Date;
//   hour: number;
// }

// const HourRow: React.FC<HourRowProps> = ({ appointmentItems, date, hour }) => {
//   const hourStartDate = new Date(
//     date.toLocaleDateString("en-US") +
//       " " +
//       hour.toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
//       ":00:00"
//   );

//   const hourEndDate = new Date(hourStartDate);
//   hourEndDate.setHours(hourStartDate.getHours() + 1);

//   const relevantAppointments = appointmentItems.filter((appointmentItem) => {
//     // starts in interval
//     if (
//       appointmentItem.startDate >= hourStartDate &&
//       appointmentItem.startDate < hourEndDate
//     ) {
//       appointmentItem.startsHere = true;
//       return true;
//     }

//     // ends in interval
//     if (
//       appointmentItem.endDate > hourStartDate &&
//       appointmentItem.endDate <= hourEndDate
//     ) {
//       appointmentItem.startsHere = false;
//       return true;
//     }

//     // is in interval
//     if (
//       appointmentItem.startDate <= hourStartDate &&
//       appointmentItem.endDate >= hourEndDate
//     ) {
//       appointmentItem.startsHere = false;
//       return true;
//     }

//     return false;
//   });

//   const hasAppointments = relevantAppointments.length > 0;
//   const action = "show";

//   return (
//     <Link
//       href={`/schedule/${action}/new?timestamp=${hourStartDate.toISOString()}`}
//       className={clsx("hour-row", {
//         "has-appointments": hasAppointments,
//       })}
//     >
//       {hasAppointments && (
//         <CalendarAppointments appointmentItems={relevantAppointments} />
//       )}
//     </Link>
//   );
// };

// interface HourLabelRowProps {
//   hour: number | "-";
// }

// const HourLabelRow: React.FC<HourLabelRowProps> = ({ hour }) => {
//   let content = "";

//   if (hour !== "-") {
//     content = `${hour.toLocaleString("en-US", {
//       minimumIntegerDigits: 2,
//     })} - ${(hour + 1).toLocaleString("en-US", {
//       minimumIntegerDigits: 2,
//     })}`;
//   }

//   return <div className="hour-row hour-label">{content}</div>;
// };

// interface DayLabelRowProps {
//   date: Date;
// }

// const DayLabelRow: React.FC<DayLabelRowProps> = ({ date }) => {
//   return (
//     <div className="hour-row day-label">
//       <span className="day">{`day-${date.getDay()}`}</span>
//       <span className="date">{date.toLocaleDateString()}</span>
//     </div>
//   );
// };
// interface DayColumnProps {
//   date: Date;
//   fromHour: number;
//   toHour: number;
//   appointmentItems: Appointment[];
// }

// const DayColumn: React.FC<DayColumnProps> = ({
//   date,
//   fromHour,
//   toHour,
//   appointmentItems,
// }) => {
//   const hourRows = [<DayLabelRow date={date} key="-" />];

//   for (let i = fromHour; i <= toHour; i++) {
//     hourRows.push(
//       <HourRow
//         appointmentItems={appointmentItems}
//         hour={i}
//         date={date}
//         key={`hour-row-${i}`}
//       />
//     );
//   }

//   return <div className="day-column">{hourRows}</div>;
// };

// interface DayLabelPropsColumnProps {
//   fromHour: number;
//   toHour: number;
// }

// const DayLabelColumn: React.FC<DayLabelPropsColumnProps> = ({
//   fromHour,
//   toHour,
// }) => {
//   const hourRows = [<HourLabelRow hour="-" key="-" />];

//   for (let i = fromHour; i <= toHour; i++) {
//     hourRows.push(<HourLabelRow hour={i} key={`hour-label-${i}`} />);
//   }

//   return <div className="day-column day-label">{hourRows}</div>;
// };

// interface AppointmentCellProps {
//   appointment: Appointment;
// }

// const AppointmentCell: React.FC<AppointmentCellProps> = ({ appointment }) => {
//   const percentage = Math.floor((appointment.duration / 60) * 100);
//   const width = Math.floor(100 / (1 + appointment.maxOverlap));
//   const top = Math.floor((appointment.startDate.getMinutes() / 60) * 100);

//   const i = appointment.overlapsWith.filter(
//     (overlappingAppointment) => overlappingAppointment.index < appointment.index
//   ).length;

//   const left = Math.floor(i * width);
//   const tiny = percentage < 33 || width < 50;

//   const hexId = Buffer.from(appointment.id).toString("hex");
//   const action = "week";

//   return (
//     <Link
//       style={{
//         height: `calc(${percentage}% - 5%)`,
//         width: `calc(${width}% - 5%)`,
//         top: `calc(${top}% + 2.5%)`,
//         left: `calc(${left}% + 2.5%)`,
//       }}
//       href={`/schedule/${action}/show/${hexId}`}
//       className={clsx("appointment-item")}
//     >
//       <Tag className="open" size="sm">
//         {appointment.slotData.length}
//       </Tag>
//       <Tag className="booked" size="sm">
//         {appointment.bookings.length}
//       </Tag>
//       <Tag className="vaccine" size="sm">
//         {appointment.properties.vaccine}
//       </Tag>
//       {/* <PropertyTags appointment={appointment} tiny /> */}
//     </Link>
//   );
// };

// interface CalendarAppointmentsProps {
//   appointments: Appointment[];
// }

// const CalendarAppointments: React.FC<CalendarAppointmentsProps> = ({
//   appointments,
// }) => {
//   return (
//     <div className="appointments">
//       {appointments
//         .filter(
//           (appointment) =>
//             appointment.startsHere && appointment.slotData.length > 0
//         )
//         .map((appointment) => (
//           <AppointmentCell
//             key={appointment.id}
//             appointment={appointment}
//           />
//         ))}
//     </div>
//   );
// };

// interface WeekCalendarProps {
//   appointments: Appointment[];
//   week?: number;
//   fromHour?: number;
//   toHour?: number;
// }

// export const WeekCalendar: React.FC<WeekCalendarProps> = ({
//   week,
//   appointments,
//   fromHour = 8,
//   toHour = 19,
// }) => {
//   const appointmentSet = new AppointmentSeries(appointments);
//   const selectedWeekOfYear =
//     week && week >= 1 && week <= 52 ? week : dayjs().week();

//   const selectedWeek = dayjs().week(selectedWeekOfYear);
//   const lastWeek = selectedWeek.subtract(7, "day").week();
//   const nextWeek = selectedWeek.add(7, "day").week();
//   const startDate = selectedWeek.day(1).toDate();

//   const endDate = new Date(startDate);
//   endDate.setDate(endDate.getDate() + 7);

//   const appointmentItems = appointmentSet.filterBetweenDates(
//     startDate,
//     endDate
//   );

//   return (
//     <Fragment>
//       <div className="flex flex-row justify-between w-full">
//         <Link
//           href={`/schedule/week/${lastWeek < 0 ? 52 : lastWeek}`}
//           className="hover"
//         >
//           zurück
//         </Link>

//         <Link
//           href={`/schedule/week/${nextWeek > 52 ? 1 : nextWeek}`}
//           className="hover"
//         >
//           vor
//         </Link>
//       </div>

//       <div className="week-calendar">
//         <DayLabelColumn fromHour={fromHour} toHour={toHour} key="-" />

//         {Array.from(Array(7).keys()).map((dayNr) => {
//           const date = new Date(startDate);

//           return (
//             <DayColumn
//               appointmentItems={appointmentItems}
//               fromHour={fromHour}
//               toHour={toHour}
//               date={new Date(date.setDate(date.getDate() + dayNr))}
//               key={`day-${dayNr}`}
//             />
//           );
//         })}
//       </div>
//     </Fragment>
//   );
// };
