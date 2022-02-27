<script lang="ts">
  import type { Vaccine } from "@impfen/common";
  import dayjs, { type Dayjs } from "dayjs";
  import isBetween from "dayjs/plugin/isBetween.js";
  import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";
  import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
  import utc from "dayjs/plugin/utc.js";
  import weekOfYear from "dayjs/plugin/weekOfYear.js";
  import type { Appointment } from "vanellus";
  import AppointmentCell from "./AppointmentCell.svelte";
  import { CalendarItem } from "./CalendarItem";

  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  dayjs.extend(weekOfYear);
  dayjs.extend(isBetween);
  dayjs.extend(utc);

  export let appointments: Appointment<Vaccine>[] = [];
  export let week = 10;
  export let autoAdjustHours = true;
  export let defaultFromHour = 7;
  export let defaultToHour = 16;

  // let filteredAppointments: Appointment<Vaccine>[] = [];
  let selectedWeek = dayjs().week(week);
  let fromHour = defaultFromHour;
  let toHour = defaultToHour;
  let days: Dayjs[] = [];
  let hours: number[] = [];
  let startAt = selectedWeek;

  let appointmentsMatrix: Record<string, Record<number, CalendarItem[]>> = {};

  $: selectedWeek = dayjs().week(week);
  $: startAt = selectedWeek
    .startOf("week")
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0);

  const processAppointments = (appointments) => {
    const appointmentsMatrix: Record<
      string,
      Record<number, CalendarItem[]>
    > = {};
    const seriesMatrix: Record<string, CalendarItem> = {};
    let fromHour = defaultFromHour;
    let toHour = defaultToHour;

    appointments.forEach((appointment) => {
      const dateIdx = appointment.startAt.local().format("DD-MM");

      if (dateIdx in appointmentsMatrix === false) {
        appointmentsMatrix[dateIdx] = {};
      }

      const hourIdx = Number(appointment.startAt.local().format("H"));

      if (hourIdx in appointmentsMatrix[dateIdx] === false) {
        appointmentsMatrix[dateIdx][hourIdx] = [];
      }

      if (autoAdjustHours || (fromHour <= hourIdx && toHour >= hourIdx)) {
        if (!appointment.properties?.seriesId) {
          const item = new CalendarItem(appointment);

          appointmentsMatrix[dateIdx][hourIdx].push(item);
        } else {
          if (
            (appointment.properties.seriesId as string) in seriesMatrix ===
            false
          ) {
            seriesMatrix[appointment.properties.seriesId as string] =
              new CalendarItem(appointment);
          } else {
            seriesMatrix[appointment.properties.seriesId as string].add(
              appointment
            );
          }
        }
      }

      if (autoAdjustHours && fromHour > hourIdx) {
        fromHour = hourIdx;
      }

      const endHour = Number(appointment.endAt.local().format("H"));

      if (autoAdjustHours && toHour <= endHour) {
        toHour = endHour;
      }
    });

    Object.keys(seriesMatrix).forEach((seriesId) => {
      const series = seriesMatrix[seriesId];
      const dateIdx = series.startAt.local().format("DD-MM");

      if (dateIdx in appointmentsMatrix === false) {
        appointmentsMatrix[dateIdx] = {};
      }

      const hourIdx = Number(series.startAt.local().format("H"));

      if (hourIdx in appointmentsMatrix[dateIdx] === false) {
        appointmentsMatrix[dateIdx][hourIdx] = [];
      }

      if (autoAdjustHours || (fromHour <= hourIdx && toHour >= hourIdx)) {
        appointmentsMatrix[dateIdx][hourIdx].push(series);
      }

      if (autoAdjustHours && fromHour > hourIdx) {
        fromHour = hourIdx;
      }

      const endHour = Number(series.endAt.local().format("H"));

      if (autoAdjustHours && toHour <= endHour) {
        toHour = endHour;
      }
    });

    return { fromHour, toHour, appointmentsMatrix };
  };

  $: {
    ({ fromHour, toHour, appointmentsMatrix } =
      processAppointments(appointments));
  }

  const fillDays = (startAtDay) => {
    const days = [];

    for (let i = 0; i <= 6; i++) {
      days.push(startAtDay.add(i, "days"));
    }

    return days;
  };

  $: days = fillDays(startAt);

  $: for (let i = fromHour; i <= toHour; i++) {
    hours.push(i);
  }
</script>

<section id="week-calendar">
  <header id="week-calendar-header" class="stack-v">
    <button
      on:click|preventDefault={() => {
        week = week - 1;
      }}
    >
      ❮ zurück
    </button>

    <h3 class="h4">Woche {selectedWeek.week()}</h3>

    <button on:click|preventDefault={() => (week = week + 1)}> vor ❯ </button>
  </header>

  <table class="table">
    <thead>
      <tr>
        <th>&nbsp;</th>

        {#each days as day}
          <th scope="row">
            {day.format("dd")}
            <br />
            {day.format("DD.MM.")}
          </th>
        {/each}
      </tr>
    </thead>

    <tbody>
      {#each hours as hour}
        <tr>
          <th scope="col">
            {hour}:00
          </th>

          {#each days as day}
            <td>
              {#each appointmentsMatrix[day.format("DD-MM")]?.[hour] || [] as item}
                <AppointmentCell on:open {item} />
              {/each}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style lang="postcss">
  header {
    display: flex;
    justify-content: space-between;
  }

  th,
  td {
    border: 1px solid #eee;
  }

  tbody td {
    position: relative;
    height: 100px;
  }
</style>
