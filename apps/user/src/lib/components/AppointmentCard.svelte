<script lang="ts">
  import type { Vaccine } from "@impfen/common";
  import { vaccines } from "@impfen/common";
  import dayjs from "dayjs";
  import { date, time } from "svelte-intl-precompile";
  import type { AggregatedPublicAppointment } from "vanellus";

  export let appointment: AggregatedPublicAppointment;
  export let border = false;

  const locale = "de";
  const vaccine = vaccines[locale || "de"][appointment.vaccine as Vaccine];
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
      {$time(dayjs(appointment.startAt).toDate(), {
        format: "short",
      })}{" "}
      Uhr
    </div>

    <div>
      am{" "}
      {$date(dayjs(appointment.startAt).toDate(), {
        format: "short",
      })}
    </div>
  </time>

  <p>
    {vaccine.name}
  </p>

  <slot />
</article>
