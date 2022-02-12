<script lang="ts">
  import { goto } from "$app/navigation";
  import { bookAppointment } from "$lib/api";
  import { AppointmentCard } from "$lib/components";
  import { appointment } from "$lib/stores";
  import { addNotification, PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";

  $: if (!$appointment) {
    goto("/finder").catch((error) => {
      console.error(error);
    });
  }

  const handleBooking = async () => {
    try {
      await bookAppointment($appointment);

      await goto("/status");

      addNotification($t("user.finder.verify.notification.success"));
    } catch (error) {
      console.error(error);

      addNotification($t("user.finder.verify.notification.error"));
    }
  };
</script>

<svelte:head><title>{$t("user.finder.verify.title")}</title></svelte:head>

{#if $appointment}
  <PageHeader>
    <h1 class="h1">{$t("user.finder.verify.title")}</h1>

    <a slot="backLink" class="back-link" href="/finder/appointment"
      >{$t("user.finder.verify.back-link")}</a
    >

    <p class="text-1" slot="intro">
      {$t("user.finder.verify.intro")}
    </p>
  </PageHeader>

  <div class="appointment-verify">
    <div>
      <h3 class="book">{$t("user.finder.verify.appointment-title")}</h3>

      <AppointmentCard appointment={$appointment} border />
    </div>

    <p class="appointment-description">
      {#if $appointment.provider.description}
        {$appointment.provider.description}
      {/if}
    </p>
  </div>

  <button class="button primary m" on:click|preventDefault={handleBooking}>
    {$t("user.finder.verify.button-submit")}
  </button>
{/if}
