<script lang="ts">
  import { cancelAppointment } from "$lib/api";
  import { vaccines, type Vaccine } from "@impfen/common";
  import { date, locale, t, time } from "svelte-intl-precompile";
  import type { Appointment } from "vanellus";
  import { AppointmentStatus } from "vanellus";

  export let appointment: Appointment<Vaccine>;
  export let border: true | undefined = undefined;

  const handleCancelAppointment = async () => {
    await cancelAppointment(appointment);
  };

  const vaccine = vaccines[$locale][appointment.vaccine];
</script>

<div
  class="flex flex-col gap-4 items-center p-4 font-semibold default-focus"
  class:border
>
  <!-- svelte-ignore component-name-lowercase -->
  <time class="flex flex-col font-semibold text-center">
    <div class="text-4xl">
      {$t("provider.schedule.appointment-card.time", {
        values: {
          time: $time(appointment.startAt.local().toDate(), {
            format: "short",
          }),
        },
      })}
    </div>

    <div class="text-xl">
      {$t("provider.schedule.appointment-card.date", {
        values: {
          date: $date(appointment.startAt.local().toDate(), {
            format: "short",
          }),
        },
      })}
    </div>
  </time>

  <p class="text-center">
    {vaccine.name}
  </p>

  <div class="text-center">
    {$t("provider.schedule.appointment-card.slots")}: {appointment.bookings
      .length}/
    {appointment.slotData.length} -{appointment.status}
    <br />
    {#if appointment.status !== AppointmentStatus.CANCELED}
      <button class="button primary s" on:click={handleCancelAppointment}
        >{$t("provider.schedule.appointment-card.button-cancel")}</button
      >
    {/if}
  </div>
</div>
