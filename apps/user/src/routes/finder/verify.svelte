<script lang="ts">
  import { goto } from "$app/navigation";
  import { bookAppointment } from "$lib/api";
  import { AppointmentCard } from "$lib/components";
  import { appointment } from "$lib/stores";
  import { Page, PageHeader } from "@impfen/common";
  import Content from "@impfen/common/src/components/Content.svelte";

  $: if (!$appointment) {
    goto("/finder").catch((error) => {
      console.error(error);
    });
  }

  const handleBooking = async () => {
    await bookAppointment($appointment)
      .then(() => goto("/status"))
      .catch((error) => {
        console.error(error);
      });
  };
</script>

{#if $appointment}
  <Page title="">
    <Content class="stack-v gap-l">
      <PageHeader>
        <h1 class="h1">Übersicht</h1>

        <a slot="backLink" class="back-link" href="/finder/appointment"
          >Zurück zur Terminauswahl</a
        >

        <p class="text-1 max-w-m" slot="intro">
          Hier ist Ihr gewählt er Termin. Prüfen Sie bitte genau, ob alles
          stimmt. Anschließend können Sie den Termin endgültig buchen.
        </p>
      </PageHeader>

      <div class="appointment-verify">
        <div>
          <h3 class="book">Ihr Termin</h3>

          <AppointmentCard appointment={$appointment} border />
        </div>

        <p class="appointment-description">
          {#if $appointment.provider.description}
            {$appointment.provider.description}
          {/if}
        </p>
      </div>

      <div class="ml-4 sm:mt-0">
        <a
          class="button primary m"
          href="/finder/success"
          on:click|preventDefault={handleBooking}
        >
          Termin jetzt buchen
        </a>
      </div>
    </Content>
  </Page>
{/if}
