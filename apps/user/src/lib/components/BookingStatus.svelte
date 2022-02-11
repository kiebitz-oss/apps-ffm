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

      addNotification(
        $t("user.finder.success.cancelation.notification.success")
      );
    }
  };
</script>

<h1 class="mx-4 mb-4 md:mx-0">
  {#if status === BookingStatus.VALID}
    {$t("user.finder.success.title-valid")}
  {:else if status === BookingStatus.PROVIDER_CANCELED}
    {$t("user.finder.success.title-provider-canceled")}
  {:else if status === BookingStatus.USER_CANCELED}
    {$t("user.finder.success.title-provider-canceled")}
  {:else}
    Fishy!
    {$t("user.finder.success.title-error")}
  {/if}
</h1>

{#if status}
  <section class="stack-v gap-m">
    <div class="booking-details">
      <div class="flex flex-col flex-1">
        <h2 class="book">{$t("user.finder.success.appointment-title")}</h2>

        <AppointmentCard appointment={booking.appointment} border />
      </div>

      <div class="flex flex-col flex-1">
        <h2 class="book">{$t("user.finder.success.your-code")}</h2>

        <div class="appointment-code">
          {booking.token.code.toUpperCase().slice(0, 4)}
        </div>
      </div>
    </div>

    <p class="text-2 mx-4 md:mx-0">
      {$t("user.finder.success.notice-code")}
    </p>

    <div class="flex flex-col gap-4 mx-4 md:mx-0">
      <p class="text-2">
        {$t("user.finder.success.notice-cancelation")}
      </p>

      <div class="stack-h gap-s">
        <button
          class="button tertiary m"
          on:click|preventDefault={handleCancel}
        >
          {$t("user.finder.success.button-cancelation")}
        </button>

        <a class="button tertiary m" href="/logout">
          {$t("user.finder.success.button-logout")}
        </a>
      </div>
    </div>
  </section>
{/if}
