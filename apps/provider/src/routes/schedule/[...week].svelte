<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { getProviderAppointments } from "$lib/api";
  import { WeekCalendar } from "$lib/components";
  import AppointmentDetails from "$lib/components/schedule/AppointmentDetails.svelte";
  import AppointmentForm from "$lib/components/schedule/AppointmentForm.svelte";
  import AppointmentSeriesForm from "$lib/components/schedule/AppointmentSeriesForm.svelte";
  import { verified } from "$lib/stores";
  import { Dialog, PageHeader, type Vaccine } from "@impfen/common";
  import dayjs from "dayjs";
  import weekOfYear from "dayjs/plugin/weekOfYear.js";
  import { onMount } from "svelte";
  import { t } from "svelte-intl-precompile";
  import type { Appointment } from "vanellus";

  dayjs.extend(weekOfYear);

  enum Modal {
    CREATE_APPOINTMENT,
    CREATE_SERIES,
    SHOW_APPOINTMENT,
    SHOW_SERIES,
  }

  let selectedDetail;
  let modal: Modal;

  let appointmentPromise: Promise<Appointment<Vaccine>[]>;

  $: selectedWeekOfYear = $page.params.week || dayjs().week();

  onMount(() => {
    if (!$verified) {
      goto("/account");
    }
  });

  $: if (modal === undefined) {
    appointmentPromise = getProviderAppointments(
      dayjs(),
      dayjs().add(13, "days")
    );
  }
</script>

<svelte:head>
  <title>{$t("provider.schedule.page-title")}</title>
</svelte:head>

<PageHeader>
  <h1 class="h1">
    {$t("provider.schedule.title")}
  </h1>

  <div>
    <button
      class="button primary s"
      on:click={() => (modal = Modal.CREATE_APPOINTMENT)}
      >Create Appointment</button
    >
    <button
      class="button primary s"
      on:click={() => (modal = Modal.CREATE_SERIES)}
      >Create Appointment series</button
    >
  </div>
</PageHeader>

{#await appointmentPromise then appointments}
  <WeekCalendar
    week={selectedWeekOfYear}
    {appointments}
    on:open={({ detail }) => {
      selectedDetail = detail;

      if (detail.isSeries === true) {
        modal = Modal.SHOW_SERIES;
      } else {
        modal = Modal.SHOW_APPOINTMENT;
      }
    }}
  />
{/await}

{#if modal === Modal.CREATE_APPOINTMENT}
  <Dialog
    open={modal === Modal.CREATE_APPOINTMENT}
    on:close={() => {
      modal = undefined;
    }}
  >
    <AppointmentForm
      on:success={() => {
        modal = undefined;
      }}
    />
  </Dialog>
  <!-- <CreateAppointmentModal onClose={closeModal} /> -->
{:else if modal === Modal.CREATE_SERIES}
  <Dialog
    open={modal === Modal.CREATE_SERIES}
    on:close={() => {
      modal = undefined;
    }}
  >
    <AppointmentSeriesForm
      on:success={() => {
        modal = undefined;
      }}
    />
  </Dialog>
{:else if modal === Modal.SHOW_APPOINTMENT}
  <Dialog
    open={modal === Modal.SHOW_APPOINTMENT}
    on:close={() => {
      modal = undefined;
    }}
  >
    <AppointmentDetails appointment={selectedDetail.item} />
  </Dialog>
{:else if modal === Modal.SHOW_SERIES}
  <Dialog
    open={modal === Modal.SHOW_SERIES}
    on:close={() => {
      modal = undefined;
    }}
  >
    Appointment series
    <!-- <AppointmentDetails /> -->
  </Dialog>

  <!-- <CreateAppointmentSeriesModal onClose={closeModal} /> -->
{/if}
