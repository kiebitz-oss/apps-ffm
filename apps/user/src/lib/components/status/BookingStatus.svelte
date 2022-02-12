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

  let statusPromise = checkBookingStatus(booking).catch(async (error) => {
    console.error(error);

    await goto("/");

    addNotification($t("user.finder.success.notification.booking-not-found"));
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

{#await statusPromise then status}
  <h1>
    {#if status === BookingStatus.VALID}
      {$t("user.finder.success.title-valid")}
    {:else if status === BookingStatus.PROVIDER_CANCELED}
      {$t("user.finder.success.title-provider-canceled")}
    {:else if status === BookingStatus.USER_CANCELED}
      {$t("user.finder.success.title-provider-canceled")}
    {:else}
      {$t("user.finder.success.title-error")}
    {/if}
  </h1>

  <section>
    <div id="booking-details">
      <div id="your-appointment-details">
        <h2 class="book">{$t("user.finder.success.appointment-title")}</h2>

        <AppointmentCard appointment={booking.appointment} border />
      </div>

      <div id="your-appointment-code">
        <h2 class="book">{$t("user.finder.success.your-code")}</h2>

        <div id="appointment-code">
          {booking.token.code.toUpperCase().slice(0, 4)}
        </div>
      </div>
    </div>

    <p class="text-2">
      {$t("user.finder.success.notice-code")}
    </p>

    <p class="text-2">
      {$t("user.finder.success.notice-cancelation")}
    </p>

    <div>
      <button class="button tertiary m" on:click|preventDefault={handleCancel}>
        {$t("user.finder.success.button-cancelation")}
      </button>

      <a class="button tertiary m" href="/logout">
        {$t("user.finder.success.button-logout")}
      </a>
    </div>
  </section>
{/await}

<style lang="postcss">
  section {
    max-width: 40rem;
  }

  #booking-details {
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;
    gap: 2rem;

    & > div {
      flex: 1;
      display: flex;
      flex-direction: column;

      & > div,
      & > :global(article) {
        flex: 1;
        display: grid;
        place-content: center;
        border-radius: var(--radius-m);
        min-width: 250px;
      }

      & > div {
        background-color: black;
        color: white;
        font-size: 3rem;
        font-weight: 900;
        letter-spacing: 0.5ch;
      }
    }
  }
</style>
