<script lang="ts">
  import { cancelAppointmentSeries } from "$lib/api";
  import { vaccines } from "@impfen/common";
  import { createEventDispatcher } from "svelte";
  import { date, locale, t, time } from "svelte-intl-precompile";
  import { AppointmentStatus } from "vanellus";
  import type { CalendarItem } from "../calendar/CalendarItem";

  export let item: CalendarItem;

  const dispatch = createEventDispatcher<{ close: never }>();

  const handleCancelAppointmentSeries = async () => {
    await cancelAppointmentSeries(item.id);

    dispatch("close");
  };

  const vaccine = vaccines[$locale][item.vaccine];
</script>

<h1 class="h2">Impfterminserie</h1>

<dl>
  <dt>Beginn</dt>
  <dd>
    {$date(item.startAt.local().toDate(), {
      format: "short",
    })}, {$time(item.startAt.local().toDate(), {
      format: "short",
    })} Uhr
  </dd>

  <dt>Ende</dt>
  <dd>
    {$date(item.endAt.local().toDate(), {
      format: "short",
    })}, {$time(item.endAt.local().toDate(), {
      format: "short",
    })} Uhr
  </dd>

  <dt>Impfstoff</dt>
  <dd>
    {vaccine.name}
  </dd>

  <dt>Plätze <small>(belegt/gesamt)</small></dt>
  <dd>
    {item.bookedSlots}/
    {item.slots}
  </dd>

  <dt>Auslastung</dt>
  <dd>
    {item.percentUsed}%
  </dd>

  <dt>Status</dt>
  <dd>
    {item.status}
  </dd>
</dl>

<div>
  {#if item.status !== AppointmentStatus.CANCELED}
    <button class="button primary s" on:click={handleCancelAppointmentSeries}
      >{$t("user.finder.appointment-series.card.button-cancel")}</button
    >
  {/if}
</div>
