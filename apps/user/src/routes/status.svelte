<script lang="ts">
  import { goto } from "$app/navigation";
  import { BookingStatus } from "$lib/components";
  import { booking } from "$lib/stores";
  import {
    addNotification,
    Content,
    Page,
    vaccines,
    type VaccineData,
  } from "@impfen/common";
  import { locale, t } from "svelte-intl-precompile";
  import GeneratePdf from "~icons/carbon/edit";

  const vaccine: VaccineData = vaccines[$locale]["mrna"]; // vaccines[locale][booking.appointment.vaccine as Vaccine];

  $: if (!$booking) {
    goto("/").catch((error) => {
      console.error(error);
      addNotification("BOOKING NOT FOUND");
    });
  }
</script>

{#if $booking}
  <Page title={$t("user.status.page-title")}>
    <Content>
      <article class="stack-v gap-m max-w-m">
        <BookingStatus booking={$booking} />

        <section class="stack-v gap-m">
          <h3>Das müssen Sie zur Impfung gegen COVID-19 mitbringen:</h3>

          <ul class="stack-v gap-s">
            <li>
              <strong>Ein amtliches Ausweisdokument</strong>
              <br />
              <i>(Personalausweis, Reisepass)</i>
            </li>

            <li>
              <strong>Impfpass</strong>
              <br />
              <i>
                (wenn nicht vorhanden, erhalten Sie eine Ersatzbescheinigung.)
              </i>
            </li>

            <li>
              <strong>FFP2-Maske</strong>
              <br />
              <i>(zur Einhaltung der Hygienemaßnahmen)</i>
            </li>
          </ul>
        </section>

        <section class="stack-v gap-m">
          <h3 class="h2">Impfvorbereitungen</h3>

          <ul class="grid grid-flow-row gap-4 pb-6">
            {#each vaccine.pdfs as pdf}
              <li>
                <a href={pdf.url} class="button tertiary m external">
                  <GeneratePdf aria-hidden />
                  <span class="break-all">{pdf.label}</span>
                </a>
              </li>
            {/each}
          </ul>

          <p class="text-2">
            {vaccine.pdfDescription}
          </p>
        </section>

        <section class="stack-v gap-m">
          <h3 class="h4">
            Mit den folgenden Schritten können Sie sich zusätzlich auf Ihren
            Impftermin vorbereiten:
          </h3>

          <ul class="flex flex-col gap-4">
            <li>An- und Rückfahrt planen und organisieren</li>

            <li>
              Zeit für <strong>Nachbeobachtung</strong> einplanen.
              <br />
              <i>
                (ca. 15 Minuten, bei bestimmten Vorerkrankungen gegebenenfalls
                auch etwas länger)
              </i>
            </li>

            <li>
              Gedanken zur eigenen <strong>Krankheitsgeschichte</strong>{" "}
              <i>(zum Beispiel Allergien, Ohnmachtsanfälle)</i> machen, um diese
              der Ärztin oder dem Arzt bei der Impfung mitteilen und mögliche Risiken
              der Impfung abwägen zu können.
            </li>
          </ul>
        </section>
      </article>
    </Content>
  </Page>
{/if}
