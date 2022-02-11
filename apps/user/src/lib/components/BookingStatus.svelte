<script lang="ts">
  import { goto } from "$app/navigation";
  import { cancelBooking, checkBookingStatus } from "$lib/api";
  import { AppointmentCard } from "$lib/components";
  import type { Vaccine } from "@impfen/common";
  import { addNotification } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { Booking } from "vanellus";
  import { BookingStatus } from "vanellus";

  export let booking: Booking<Vaccine>;

  let status: BookingStatus;

  checkBookingStatus(booking)
    .then((newStatus) => {
      status = newStatus;

      return status;
    })
    .catch(async (error) => {
      console.error(error);

      await goto("/");
      addNotification("APPOINTMENT NOT FOUND");
    });

  const handleCancel: svelte.JSX.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    if (confirm($t("user.finder.success.cancelation-confirm"))) {
      await cancelBooking(booking);

      await goto("/");

      addNotification("Buchung abgesagt");
    }
  };
</script>

<h1 class="mx-4 mb-4 md:mx-0">
  {#if status === BookingStatus.VALID}
    Ihr Termin ist gebucht!
  {:else if status === BookingStatus.PROVIDER_CANCELED}
    Ihr Termin ist abgesagt!
  {:else if status === BookingStatus.USER_CANCELED}
    Du hast den Termin abgesagt!
  {:else}
    Fishy!
  {/if}
</h1>

{#if status}
  <section class="stack-v gap-m">
    <div class="booking-details">
      <div class="flex flex-col flex-1">
        <h2 class="book">Ihr Termin</h2>

        <AppointmentCard appointment={booking.appointment} border />
      </div>

      <div class="flex flex-col flex-1">
        <h2 class="book">Ihr Buchungscode</h2>

        <div class="appointment-code">
          {booking.token.code.toUpperCase().slice(0, 4)}
        </div>
      </div>
    </div>

    <p class="text-2 mx-4 md:mx-0">
      <strong>Wichtig:</strong> Bitte notieren Sie sich den untenstehenden Code und
      bringen ihn unbedingt zur Impfung mit.
    </p>

    <div class="flex flex-col gap-4 mx-4 md:mx-0">
      <p class="text-2">
        Sollte Sie Ihren Termin nicht wahrnehmen können, stornieren Sie ihn
        bitte mit nachstehendem Button.
      </p>

      <div class="stack-h gap-s">
        <button
          class="button tertiary m"
          on:click|preventDefault={handleCancel}
        >
          Termin absagen
        </button>

        <a class="button tertiary m" href="/logout">
          Abschließen und weiteren Termin buchen
        </a>
      </div>
    </div>
  </section>
{/if}
