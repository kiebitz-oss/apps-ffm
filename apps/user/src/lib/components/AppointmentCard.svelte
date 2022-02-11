<script lang="ts">
  import type { Vaccine } from "@impfen/common";
  import { vaccines } from "@impfen/common";
  import dayjs from "dayjs";
  import { date, locale, time } from "svelte-intl-precompile";
  import type { AggregatedPublicAppointment } from "vanellus";

  export let appointment: AggregatedPublicAppointment;
  export let border = false;

  $: console.log($locale);

  const vaccine = vaccines[$locale][appointment.vaccine as Vaccine];
</script>

<article
  class="appointment-card"
  class:border
  on:click
  tabIndex={-1}
  {...$$restProps}
>
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
