<script lang="ts">
  import { createAppointment } from "$lib/api";
  import {
    addNotification,
    Field,
    vaccines,
    type Vaccine,
  } from "@impfen/common";
  import dayjs from "dayjs";
  import { createEventDispatcher } from "svelte";
  import { locale, t } from "svelte-intl-precompile";
  import type { Appointment, PublicAppointment } from "vanellus";

  export let appointment: Appointment | undefined = undefined;

  let startAt = dayjs(appointment?.startAt)
    .add(1, "day")
    .set("hour", 10)
    .set("minute", 0)
    .format("YYYY-MM-DDTHH:mm");
  let slotCount = appointment?.slotData.length || 5;
  let duration = appointment?.duration || 30;
  let vaccine: Vaccine;
  let isSubmitting = false;

  const dispatcher = createEventDispatcher<{
    success: PublicAppointment<Vaccine>[];
  }>();

  const handleSubmit: svelte.JSX.EventHandler<
    SubmitEvent,
    HTMLFormElement
  > = async () => {
    isSubmitting = true;

    await createAppointment(dayjs(startAt), duration, vaccine, slotCount)
      .then((result) => {
        addNotification("success");
        dispatcher("success", result);

        return result;
      })
      .catch((error) => {
        console.error(error);
      });

    isSubmitting = false;
  };
</script>

<h1 class="h2">{$t("provider.appointment-form.title")}</h1>

<form
  name="appointment-form"
  class="stack-v gap-m"
  on:submit|preventDefault={handleSubmit}
>
  {#if appointment}
    <input name="id" value={appointment.id} type="hidden" />
  {/if}

  <Field
    name="startAt"
    label={$t("provider.schedule.appointment-form.start-date.label")}
    description={$t(
      "provider.schedule.appointment-form.start-date.description"
    )}
    required
    ><input
      type="datetime-local"
      name="startAt"
      bind:value={startAt}
      min={dayjs().format("YYYY-MM-DDTHH:mm")}
      max={dayjs().add(30, "days").format("YYYY-MM-DDTHH:mm")}
    /></Field
  >

  <Field
    name="vaccine"
    label={$t("provider.schedule.appointment-form.vaccine-label")}
    description={$t("provider.schedule.appointment-form.vaccine.description")}
    required
  >
    <select name="vaccine" required bind:value={vaccine}>
      {#each Object.keys(vaccines["de"]) as vaccineKey}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        <option value={vaccineKey}>{vaccines[$locale][vaccineKey].name}</option>
      {/each}
    </select>
  </Field>

  <div class="field-row">
    <Field
      name="slotCount"
      label={$t("provider.schedule.appointment-form.slots.label")}
      required
      description={$t("provider.schedule.appointment-form.slots.description")}
      ><input
        type="number"
        name="slotCount"
        bind:value={slotCount}
        min={1}
        max={50}
        required
      /></Field
    >

    <Field
      name="duration"
      label={$t("provider.schedule.appointment-form.duration.label")}
      description={$t(
        "provider.schedule.appointment-form.duration.description"
      )}
      required
      ><input
        type="number"
        name="duration"
        bind:value={duration}
        min={5}
        max={240}
        required
      /></Field
    >
  </div>

  <button type="submit" class="button primary m" disabled={isSubmitting}>
    {$t("provider.schedule.appointment-form.button")}
  </button>
</form>
