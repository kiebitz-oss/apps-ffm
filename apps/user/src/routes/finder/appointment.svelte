<script lang="ts">
  import { getAppointments } from "$lib/api";
  import AppointmentsList from "$lib/components/AppointmentsList.svelte";
  import { vaccine } from "$lib/stores";
  import {
    Content,
    Loading,
    Page,
    PageHeader,
    vaccines,
    type Vaccine,
  } from "@impfen/common";
  import dayjs from "dayjs";
  import { locale, t } from "svelte-intl-precompile";
  import type { AggregatedPublicAppointment } from "vanellus";

  const appointments: Promise<AggregatedPublicAppointment<Vaccine>[]> =
    getAppointments(dayjs());
</script>

<Page title={$t("user.finder.appointment.title")}>
  <Content class="stack-v gap-m">
    <PageHeader>
      <h1 class="h1">{$t("user.finder.appointment.title")}</h1>

      <a class="back-link" slot="backLink" href="/finder"
        >{$t("user.finder.appointment.back-link")}</a
      >
    </PageHeader>

    {#if $vaccine}
      <p class="notice">
        Aus den gemachten Angaben über die zu Impfende Person ergibt sich gemäß
        aktueller Empfehlungen eine Impfung mit <strong
          >{vaccines[$locale][$vaccine].name}</strong
        >. Dies wird bei den Terminvorschlägen berücksichtigt.
      </p>
    {/if}

    {#await appointments}
      <Loading />
    {:then loadedAppointments}
      <AppointmentsList appointments={loadedAppointments} />
    {:catch error}
      <p class="error">
        {error.message}
      </p>
    {/await}
  </Content>
</Page>
