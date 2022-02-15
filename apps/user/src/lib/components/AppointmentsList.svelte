<script lang="ts">
  import { goto } from "$app/navigation";
  import { AppointmentCard } from "$lib/components";
  import { accessible, appointment, provider, vaccine } from "$lib/stores";
  import type { Vaccine } from "@impfen/common";
  import dayjs from "dayjs";
  import { t } from "svelte-intl-precompile";
  import type { AggregatedPublicAppointment } from "vanellus";
  import IconEdit from "~icons/carbon/edit";

  export let appointments: AggregatedPublicAppointment<Vaccine>[];

  let filteredAppointments: AggregatedPublicAppointment<Vaccine>[] =
    appointments;

  let date = dayjs().format("YYYY-MM-DD");
  let time = "08:00";

  const handleSelectAppointment = async (
    chosenAppointment: AggregatedPublicAppointment<Vaccine>
  ) => {
    $appointment = chosenAppointment;

    await goto("/finder/verify");
  };

  $: console.log(time);
  $: console.log(date);
  $: console.log(
    dayjs(date)
      .set("hour", Number(time.split(":")[0]))
      .toString()
  );

  $: filteredAppointments = appointments.filter(
    (appointment) =>
      ($accessible !== true || appointment.provider.accessible === true) &&
      ($provider === true ||
        ($provider?.id && appointment.provider.id === $provider.id)) &&
      appointment.startAt.local().isAfter(dayjs(), "minute") &&
      appointment.startAt
        .local()
        .isAfter(
          dayjs(date).set("hour", Number(time.split(":")[0])),
          "minute"
        ) &&
      ($vaccine === appointment.vaccine ||
        (!$vaccine && appointment.vaccine !== "biontechchildren"))
  );
</script>

<form id="appointment-filter" name="filter">
  <div>
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
        />
        <span>
          <IconEdit aria-hidden />
        </span>
      </div>
    </a>
  </div>

  <div>
    <label for="provider" class="book"
      >{$t("user.appointments-list.title-date")}</label
    >
    <input
      name="date"
      type="date"
      min={dayjs().format("YYYY-MM-DD")}
      max={dayjs().add(30, "days").format("YYYY-MM-DD")}
      bind:value={date}
    />
  </div>

  <div>
    <label for="provider" class="book"
      >{$t("user.appointments-list.title-time")}</label
    >
    <input name="date" type="time" bind:value={time} />
  </div>
</form>

<hr />

{#if dayjs(date).isBefore(dayjs().subtract(1, "day"), "day")}
  <p class="error">{$t("user.appointments-list.date-past")}</p>
{:else if filteredAppointments.length > 0}
  <ul aria-label={$t("user.appointments-list.list-of-appointments")}>
    {#each filteredAppointments as appointment}
      {@const handler = () => handleSelectAppointment(appointment)}
      <li>
        <a href="/finder/verify" on:click|preventDefault={handler}>
          <AppointmentCard {appointment}>
            <button tabIndex={-1} class="button m primary"
              >{$t("user.appointments-list.choose-appointment")}</button
            >
          </AppointmentCard>
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <p class="notice">
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
  form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    max-width: 100%;

    & > div {
      display: flex;
      flex-direction: column;
      min-width: 300px;
    }

    & .field-group {
      color: var(--color-black);
      text-decoration: none;

      & input[type] {
        pointer-events: none;

        &:focus,
        &:focus-visible {
          outline: none;
        }
      }
    }

    & input[type="date"]:hover,
    & input[type="time"]:hover {
      border-color: var(--color-highlight);
    }
  }

  ul {
    --min: 25ch;
    --gap: 2rem;

    display: grid;
    grid-gap: var(--gap);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));

    list-style-type: none;
    margin: 0;
    padding: 0;

    & :global(article) {
      box-shadow: var(--shadow-appointment);

      transition: all var(--duration-1) cubic-bezier(0.4, 0, 0.2, 1);
    }

    & a:hover :global(article) {
      border-color: var(--color-highlight);

      @media (--motionOK) {
        box-shadow: var(--shadow-highlight);
      }
    }
  }
</style>
