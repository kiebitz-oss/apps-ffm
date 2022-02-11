<script lang="ts">
  import { page } from "$app/stores";
  import { getProviderAppointments } from "$lib/api";
  import { WeekCalendar } from "$lib/components";
  import AppointmentDetails from "$lib/components/schedule/AppointmentDetails.svelte";
  import AppointmentForm from "$lib/components/schedule/AppointmentForm.svelte";
  import AppointmentSeriesForm from "$lib/components/schedule/AppointmentSeriesForm.svelte";
  import { Content, Dialog, Page } from "@impfen/common";
  import dayjs from "dayjs";

  let appointmentPromise = getProviderAppointments(
    dayjs(),
    dayjs().add(13, "days")
  );

  enum Modal {
    CREATE_APPOINTMENT,
    CREATE_SERIES,
    SHOW_APPOINTMENT,
    SHOW_SERIES,
  }

  let selectedDetail;

  let modal: Modal;
</script>

<Page title="Impftermine">
  <Content>
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

    {#await appointmentPromise then appointments}
      <WeekCalendar
        week={$page.params.week}
        {appointments}
        on:open={({ detail }) => {
          selectedDetail = detail;
          console.log(detail.isSeries);

          if (detail.isSeries === true) {
            modal = Modal.SHOW_SERIES;
          } else {
            modal = Modal.SHOW_APPOINTMENT;
          }
        }}
      />
    {/await}
  </Content>
</Page>

{#if modal === Modal.CREATE_APPOINTMENT}
  <Dialog
    open={modal === Modal.CREATE_APPOINTMENT}
    on:close={() => {
      modal = undefined;
    }}
  >
    <AppointmentForm />
  </Dialog>
  <!-- <CreateAppointmentModal onClose={closeModal} /> -->
{:else if modal === Modal.CREATE_SERIES}
  <Dialog
    open={modal === Modal.CREATE_SERIES}
    on:close={() => {
      modal = undefined;
    }}
  >
    <AppointmentSeriesForm />
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
