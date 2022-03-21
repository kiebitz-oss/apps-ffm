<script lang="ts">
  import { cancelAppointment } from "$lib/api";
  import { vaccines } from "@impfen/common";
  import { createEventDispatcher } from "svelte";
  import { date, locale, t, time } from "svelte-intl-precompile";
  import { AppointmentStatus } from "vanellus";
  import type { CalendarItem } from "../calendar/CalendarItem";

  export let item: CalendarItem;

  const dispatch = createEventDispatcher<{ close: never }>();

  const handleCancelAppointment = async () => {
    await cancelAppointment(item.item);
    dispatch("close");
  };

  const vaccine = vaccines[$locale][item.vaccine];
</script>

<h1 class="h2">{$t("provider.schedure.appointment-details.title")}</h1>

<dl>
  <dt>{$t("provider.schedure.appointment-details.start-at")}</dt>
  <dd>
    {$date(item.startAt.local().toDate(), {
      format: "short",
    })}, {$time(item.startAt.local().toDate(), {
      format: "short",
    })}
    {$t("provider.schedure.appointment-details.o-clock")}
  </dd>

  <dt>{$t("provider.schedure.appointment-details.end-at")}</dt>
  <dd>
    {$date(item.endAt.local().toDate(), {
      format: "short",
    })}, {$time(item.endAt.local().toDate(), {
      format: "short",
    })}
    {$t("provider.schedure.appointment-details.o-clock")}
  </dd>

  <dt>{$t("provider.schedure.appointment-details.vaccine")}</dt>
  <dd>
    {vaccine.name}
  </dd>

  <dt>
    {$t("provider.schedure.appointment-details.slots")}
    <small
      >({$t("provider.schedure.appointment-details.slots-description")})</small
    >
  </dt>
  <dd>
    {item.bookedSlots}/{item.slots}
  </dd>

  <dt>{$t("provider.schedure.appointment-details.utilization")}</dt>
  <dd>
    {item.percentUsed}%
  </dd>

  <dt>{$t("provider.schedure.appointment-details.status")}</dt>
  <dd>
    {item.status}
  </dd>
</dl>

<div>
  {#if item.status !== AppointmentStatus.CANCELED}
    <button class="button primary s" on:click={handleCancelAppointment}
      >{$t("provider.schedure.appointment-details.button-cancel")}</button
    >
  {/if}
</div>
