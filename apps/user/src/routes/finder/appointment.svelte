<script lang="ts" context="module">
  import { browser } from "$app/env";
  import { getAppointments } from "$lib/api";
  import AppointmentsList from "$lib/components/AppointmentsList.svelte";
  import { vaccine } from "$lib/stores";
  import { PageHeader, vaccines, type Vaccine } from "@impfen/common";
  import dayjs from "dayjs";
  import { locale, t } from "svelte-intl-precompile";
  import type { AggregatedPublicAppointment } from "vanellus";
</script>

<script lang="ts">
  let appointmentsPromise: Promise<AggregatedPublicAppointment<Vaccine>[]> =
    Promise.resolve([]);

  if (browser) {
    appointmentsPromise = getAppointments(dayjs());
  }
</script>

<svelte:head><title>{$t("user.finder.appointment.title")}</title></svelte:head>

<PageHeader>
  <h1 class="h1">
    {$t("user.finder.appointment.title")}
  </h1>

  <a slot="backLink" href="/finder" class="back-link">
    {$t("user.finder.appointment.back-link")}
  </a>
</PageHeader>

{#if $vaccine && vaccines?.[$locale]?.[$vaccine]?.name}
  <p>
    {$t("user.finder.appointment.info", {
      values: {
        vaccine: vaccines[$locale][$vaccine].name,
      },
    })}
  </p>
{/if}

{#await appointmentsPromise then appointments}
  <AppointmentsList {appointments} />
{:catch error}
  <p class="error">
    {error.message}
  </p>
{/await}
