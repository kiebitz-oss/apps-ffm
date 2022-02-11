<script lang="ts">
  import type { Vaccine } from "@impfen/common";
  import dayjs, { Dayjs } from "dayjs";
  import isBetween from "dayjs/plugin/isBetween";
  import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
  import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
  import weekOfYear from "dayjs/plugin/weekOfYear";
  import { locale } from "svelte-intl-precompile";
  import type { Appointment } from "vanellus";
  import AppointmentCell from "./AppointmentCell.svelte";
  import { CalendarItem } from "./CalendarItem";

  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  dayjs.extend(weekOfYear);
  dayjs.extend(isBetween);

  export let appointments: Appointment<Vaccine>[] = [];
  export let week: number | string | undefined = undefined;
  export let autoAdjustHours = true;
  export let defaultFromHour = 9;
  export let defaultToHour = 16;

  const selectedWeekOfYear = Number(
    week && week >= 1 && week <= 52 ? week : dayjs().week()
  );

  const selectedWeek = dayjs().week(selectedWeekOfYear);

  const lastWeek = selectedWeek.subtract(7, "day").week();
  const nextWeek = selectedWeek.add(7, "day").week();

  const startAt = selectedWeek
    .startOf("week")
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0);

  const endAt = selectedWeek
    .endOf("week")
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.startAt.isBetween(startAt, endAt, "minute", "[)")
  );

  let fromHour = defaultFromHour;
  let toHour = defaultToHour;

  let appointmentsMatrix: Record<string, Record<number, CalendarItem[]>> = {};
  let seriesMatrix: Record<string, CalendarItem> = {};

  let slots = 0;
  let bookedSlots = 0;

  filteredAppointments.forEach((appointment) => {
    const dateIdx = appointment.startAt.local().format("DD-MM");

    if (dateIdx in appointmentsMatrix === false) {
      appointmentsMatrix[dateIdx] = {};
    }

    const hourIdx = Number(appointment.startAt.local().format("H"));

    if (hourIdx in appointmentsMatrix[dateIdx] === false) {
      appointmentsMatrix[dateIdx][hourIdx] = [];
    }

    if (autoAdjustHours || (fromHour <= hourIdx && toHour >= hourIdx)) {
      slots += appointment.slotData.length;
      bookedSlots += appointment.bookings.length;

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

    const endHour = Number(appointment.endAt.format("H"));

    if (autoAdjustHours && toHour <= endHour) {
      toHour = endHour;
    }
  });

  Object.keys(seriesMatrix).forEach((seriesId) => {
    const series = seriesMatrix[seriesId];
    const dateIdx = series.startAt.format("DD-MM");

    if (dateIdx in appointmentsMatrix === false) {
      appointmentsMatrix[dateIdx] = {};
    }

    const hourIdx = Number(series.startAt.format("H"));

    if (hourIdx in appointmentsMatrix[dateIdx] === false) {
      appointmentsMatrix[dateIdx][hourIdx] = [];
    }

    if (autoAdjustHours || (fromHour <= hourIdx && toHour >= hourIdx)) {
      appointmentsMatrix[dateIdx][hourIdx].push(series);
    }

    if (autoAdjustHours && fromHour > hourIdx) {
      fromHour = hourIdx;
    }

    const endHour = Number(series.endAt.format("H"));

    if (autoAdjustHours && toHour <= endHour) {
      toHour = endHour;
    }
  });

  let days: Dayjs[] = [];

  for (let i = 0; i <= 6; i++) {
    days.push(startAt.add(i, "days"));
  }

  let hours: number[] = [];

  for (let i = fromHour; i <= toHour; i++) {
    hours.push(i);
  }
</script>

<section id="week-calendar" class="stack-v gap-m">
  <header id="week-calendar-header" class="stack-v">
    <div class="stack-h">
      <a href={`/schedule/${lastWeek < 0 ? 52 : lastWeek}`}> ❮ zurück </a>

      <h1 class="h1">Impftermine</h1>

      <a href={`/schedule/${nextWeek > 52 ? 1 : nextWeek}`}> vor ❯ </a>
    </div>

    <div class="stack-h">
      <div>
        week: {selectedWeek.week()}
      </div>
      <div>
        start: {startAt.set("hour", fromHour).toDate().toLocaleString($locale)}
      </div>
      <div>
        end: {endAt.set("hour", toHour).toDate().toLocaleString($locale)}
      </div>

      <span
        style:backgroundColor={`hsl(${
          ((100 - bookedSlots / slots) / 100) * 120
        }, 88%, 43%)`}
      >
        stats: {bookedSlots}/{slots}
      </span>
    </div>
  </header>

  <table class="table">
    <thead>
      <tr>
        <th class="w-[75px] border border-gray-300">&nbsp;</th>

        {#each days as day}
          <th scope="row" class="bg-gray-50 border border-gray-300">
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
          <th scope="col" class="bg-gray-50 border border-gray-300">
            {hour}:00
          </th>

          {#each days as day}
            <td class="relative h-[100px] border border-gray-300">
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
  th,
  td {
    border: 1px solid #eee;
  }

  tbody td {
    position: relative;
    height: 100px;
  }
</style>
