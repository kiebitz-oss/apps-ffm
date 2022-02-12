<script lang="ts">
  import { getAppointments } from "$lib/api";
  import AppointmentsList from "$lib/components/AppointmentsList.svelte";
  import { vaccine } from "$lib/stores";
  import { Loading, PageHeader, vaccines, type Vaccine } from "@impfen/common";
  import dayjs from "dayjs";
  import { locale, t } from "svelte-intl-precompile";
  import type { AggregatedPublicAppointment } from "vanellus";

  const appointmentsPromise: Promise<AggregatedPublicAppointment<Vaccine>[]> =
    getAppointments(dayjs());
</script>

<svelte:head><title>{$t("user.finder.appointment.title")}</title></svelte:head>

<PageHeader>
  <h1 class="h1">{$t("user.finder.appointment.title")}</h1>

  <a class="back-link" slot="backLink" href="/finder"
    >{$t("user.finder.appointment.back-link")}</a
  >
</PageHeader>

{#if $vaccine}
  <p class="notice">
    {$t("user.finder.appointment.info", {
      values: {
        vaccine: vaccines[$locale][$vaccine].name,
      },
    })}
  </p>
{/if}

{#await appointmentsPromise}
  <Loading />
{:then appointments}
  <AppointmentsList {appointments} />
{:catch error}
  <p class="error">
    {error.message}
  </p>
{/await}
