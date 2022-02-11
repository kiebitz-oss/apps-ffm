<script lang="ts">
  import { goto } from "$app/navigation";
  import { AppointmentCard } from "$lib/components";
  import { appointment, provider, vaccine } from "$lib/stores";
  import type { Vaccine } from "@impfen/common";
  import type { Dayjs } from "dayjs";
  import dayjs from "dayjs";
  import { t } from "svelte-intl-precompile";
  import type { AggregatedPublicAppointment } from "vanellus";
  import IconEdit from "~icons/carbon/edit";
  export let appointments: AggregatedPublicAppointment<Vaccine>[];

  let filteredAppointments: AggregatedPublicAppointment<Vaccine>[] =
    appointments;
  let date: Dayjs = dayjs();

  const handleDateChange: svelte.JSX.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    // safeguarding against stupid things browsers may do with datetime-local-inputs...
    try {
      const newDate = dayjs(event.currentTarget.value);

      date = newDate.isValid() ? newDate : dayjs();
    } catch (error) {
      console.error(error);
      date = dayjs();
    }
  };

  const handleSelectAppointment = async (
    chosenAppointment: AggregatedPublicAppointment<Vaccine>
  ) => {
    $appointment = chosenAppointment;

    await goto("/finder/verify");
  };

  $: filteredAppointments = appointments.filter(
    (appointment) =>
      ($provider === true ||
        ($provider?.id && appointment.provider.id === $provider.id)) &&
      appointment.startAt.local().isAfter(date, "minute") &&
      (!$vaccine || $vaccine === appointment.vaccine)
  );
</script>

<form id="filter-bar" class="stack-h mb-m">
  <div style="display: flex; flex-direction: column; align-items: flex-start;">
    <label class="book" for="provider"
      >{$t("user.appointments-list.title-provider")}</label
    >
    <a href="/finder">
      <div class="field-group">
        <input
          name="provider"
          type="text"
          value={$provider !== true && $provider?.name
            ? $provider.name
            : $t("user.appointments-list.any-provider")}
          class="flex-1"
          style:pointer-event="none"
          style:text-decoration="none"
        />
        <span>
          <IconEdit aria-hidden />
        </span>
      </div>
    </a>
  </div>

  <div style="display: flex; flex-direction: column; align-items: flex-start; ">
    <label for="provider" class="book"
      >{$t("user.appointments-list.title-date")}</label
    >
    <input
      name="date"
      type="datetime-local"
      min={dayjs().format("YYYY-MM-DDTHH:mm")}
      max={date.add(30, "days").format("YYYY-MM-DDTHH:mm")}
      value={date.format("YYYY-MM-DDTHH:mm")}
      on:change|preventDefault={handleDateChange}
    />
  </div>
</form>

{#if dayjs(date).isBefore(dayjs().subtract(10, "minutes"), "minutes")}
  <p class="error">{$t("user.appointments-list.date-past")}</p>
{:else if filteredAppointments.length > 0}
  <ul
    id="appointments-list"
    aria-label={$t("user.appointments-list.list-of-appointments")}
  >
    {#each filteredAppointments as appointment}
      {@const handler = () => handleSelectAppointment(appointment)}
      <li>
        <a href="/finder/verify" on:click|preventDefault={handler}>
          <AppointmentCard {appointment} border>
            <button tabIndex={-1} class="button m primary"
              >{$t("user.appointments-list.choose-appointment")}</button
            >
          </AppointmentCard>
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <p class="text-center text-l">
    {#if $provider === true}
      {@html $t("user.appointments-list.no-results-any-provider")}
    {:else}
      {@html $t("user.appointments-list.no-results-specific-provider", {
        values: {
          provider: $provider.name,
        },
      })}
    {/if}
  </p>
{/if}

<style lang="postcss">
</style>
