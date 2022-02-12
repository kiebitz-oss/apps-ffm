<script lang="ts">
  import type { Vaccine } from "@impfen/common";
  import { vaccines } from "@impfen/common";
  import dayjs from "dayjs";
  import { date, locale, time } from "svelte-intl-precompile";
  import type { AggregatedPublicAppointment } from "vanellus";

  export let appointment: AggregatedPublicAppointment;
  export let border = false;

  const vaccine = vaccines[$locale][appointment.vaccine as Vaccine];
</script>

<article class:border on:click tabIndex={-1} {...$$restProps}>
  <address>
    <h3>
      {appointment.provider.name}
    </h3>

    {appointment.provider.street},
    <br />
    {appointment.provider.zipCode}
    {appointment.provider.city}
  </address>

  <!-- svelte-ignore component-name-lowercase -->
  <time>
    <div>
      {$date(dayjs(appointment.startAt).toDate(), {
        weekday: "short",
        day: "2-digit",
        month: "short",
      })}
    </div>

    <div>
      um
      {$time(dayjs(appointment.startAt).toDate(), {
        hour: "2-digit",
        minute: "2-digit",
      })}
      Uhr
    </div>
  </time>

  <p>
    {vaccine.name}
  </p>

  <slot />
</article>

<style lang="postcss">
  article {
    text-align: center;
    padding: 1rem;
    color: var(--color-black);
    font-weight: 500;
    max-width: 25rem;

    & time {
      font-size: var(--font-size-4);
      font-weight: 700;
    }

    & > p {
      word-break: break-word;
    }

    border: 1px solid var(--color-black);
    border-radius: var(--radius-m);
  }
</style>
