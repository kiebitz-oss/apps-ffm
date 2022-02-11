<script lang="ts">
  import { createAppointmentSeries } from "$lib/api";
  import {
    addNotification,
    Field,
    vaccines,
    type Vaccine,
  } from "@impfen/common";
  import dayjs from "dayjs";
  import { createEventDispatcher } from "svelte";
  import { locale, t } from "svelte-intl-precompile";
  import type { PublicAppointment } from "vanellus";

  export let onSuccess: () => void | undefined = undefined;

  let startDate = dayjs()
    .utc()
    .add(1, "day")
    .set("hour", 8)
    .set("minute", 0)
    .format("YYYY-MM-DD");
  let hourFrom = "08:00";
  let hourTo = "18:00";
  let slotCount = 5;
  let interval = 15;
  let vaccine: Vaccine;
  let isSubmitting = false;

  const dispatcher = createEventDispatcher<{
    success: PublicAppointment<Vaccine>[];
  }>();

  const handleSubmit = async () => {
    isSubmitting = true;
    const startAt = dayjs(startDate)
      .set("hour", Number(hourFrom.split(":")[0]))
      .set("minute", Number(hourFrom.split(":")[1]));

    const endAt = dayjs(startDate)
      .set("hour", Number(hourTo.split(":")[0]))
      .set("minute", Number(hourTo.split(":")[1]));

    await createAppointmentSeries(
      startAt,
      endAt,
      Number(interval),
      vaccine,
      slotCount
    ).then((result) => {
      addNotification("success");
      dispatcher("success", result);

      isSubmitting = false;

      return result;
    });
  };
</script>

<form
  name="appointment-series-form"
  class="stack-v gap-m"
  on:submit|preventDefault={handleSubmit}
>
  <Field
    name="startDate"
    label={$t("provider.schedule.appointment-series-form.start-at.label")}
    required
    ><input
      type="date"
      name="startDate"
      required
      min={dayjs().format("YYYY-MM-DD")}
      max={dayjs().add(30, "days").format("YYYY-MM-DD")}
      bind:value={startDate}
    /></Field
  >

  <Field
    name="vaccine"
    label={$t("provider.schedule.appointment-series-form.vaccine-label")}
    description={$t(
      "provider.schedule.appointment-series-form.vaccine.description"
    )}
    required
  >
    <select name="vaccine" required bind:value={vaccine}>
      {#each Object.keys(vaccines["de"]) as vaccineKey}
        <option value={vaccineKey}>{vaccines[$locale][vaccineKey].name}</option>
      {/each}
    </select>
  </Field>

  <div class="flex flex-row gap-m">
    <Field
      name="hourFrom"
      label={$t("provider.schedule.appointment-series-form.hour-from.label")}
      required
      ><input
        type="time"
        name="hourFrom"
        required
        bind:value={hourFrom}
      /></Field
    >

    <Field
      name="hourTo"
      label={$t("provider.schedule.appointment-series-form.hour-end.label")}
      required
      ><input type="time" name="hourTo" required bind:value={hourTo} /></Field
    >
  </div>

  <div class="flex flex-row gap-m">
    <!-- {...register("slotCount", {
        valueAsNumber: true,
        required: t({
          id: "provider.schedule.appointment-series-form.slots.error.required",
          message: "Bitte gegen Sie die Anzahl der Impfdosen ein",
        }),
        min: {
          value: 1,
          message: t({
            id: "provider.schedule.appointment-series-form.slots.error.min",
            message:
              "Die minimale Anzahl der Impfdosen pro Termin beträgt 1",
          }),
        },
        max: {
          value: 50,
          message: t({
            id: "provider.schedule.appointment-series-form.slots.error.max",
            message:
              "Die maximale Anzahl der Impfdosen pro Termin beträgt 50",
          }),
        },
      })} -->
    <Field
      name="slotCount"
      label={$t("provider.schedule.appointment-series-form.slots.label")}
      required
      description={$t(
        "provider.schedule.appointment-series-form.slots.description"
      )}
      ><input
        type="number"
        name="slotCount"
        bind:value={slotCount}
        required
        min={1}
        max={50}
      /></Field
    >

    <!-- {...register("interval", {
        valueAsNumber: true,
        required: t({
          id: "provider.schedule.appointment-series-form.duration.error-required",
          message: "Bitte gegen Sie die Anzahl der Impfdosen ein",
        }),
        min: {
          value: 5,
          message: t({
            id: "provider.schedule.appointment-series-form.duration.error.min",
            message:
              "Die minimale Dauer eines Impftermins beträgt 5 Minuten",
          }),
        },
        max: {
          value: 240,
          message: t({
            id: "provider.schedule.appointment-series-form.duration.error.max",
            message:
              "Die maximale Dauer eines Impftermins beträgt 240 Minuten",
          }),
        },
      })} -->

    <Field
      name="interval"
      label={$t("provider.schedule.appointment-series-form.duration.label")}
      required
      description={$t(
        "provider.schedule.appointment-series-form.duration.description"
      )}
    >
      <input type="number" name="interval" required bind:value={interval} />
    </Field>
  </div>

  <!-- <Field
        label={$t("provider.schedule.appointment-series-form.vaccine-label")}
        description={$t("provider.schedule.appointment-series-form.vaccine.description",
          message: "Der verimpfte Impfstoff",
        })}
        required
        {...register("vaccine", {
          required: t({
            id: "provider.schedule.appointment-series-form.vaccine.error-required",
            message: "Bitte gegen Sie den Impfstoff an",
          }),
        })} -->

  <button type="submit" class="button primary m" disabled={isSubmitting}>
    {$t("provider.schedule.appointment-series-form.button")}
  </button>
</form>
