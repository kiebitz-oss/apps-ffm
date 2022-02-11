<script lang="ts">
  import { createAppointment } from "$lib/api";
  import { Field, vaccines, type Vaccine } from "@impfen/common";
  import dayjs from "dayjs";
  import { locale, t } from "svelte-intl-precompile";
  import type { Appointment } from "vanellus";

  export let appointment: Appointment | undefined = undefined;
  export let onSuccess: () => void | undefined = undefined;

  let startAt = dayjs(appointment?.startAt)
    .add(1, "day")
    .set("hour", 10)
    .set("minute", 0)
    .format("YYYY-MM-DDTHH:mm");
  let slotCount = appointment?.slotData.length || 5;
  let duration = appointment?.duration || 30;
  let vaccine: Vaccine;

  let isValid = true;
  let isSubmitting = false;

  const handleSubmit: svelte.JSX.EventHandler<
    SubmitEvent,
    HTMLFormElement
  > = async () => {
    isSubmitting = true;

    await createAppointment(dayjs(startAt), duration, vaccine, slotCount)
      .then((result) => {
        if (onSuccess) {
          onSuccess();
        }

        return result;
      })
      .catch((error) => {
        console.error(error);
        isValid = false;
      });

    isSubmitting = false;
  };
</script>

<form
  name="appointment-form"
  class="stack-v gap-m"
  on:submit|preventDefault={handleSubmit}
>
  {#if appointment}
    <input name="id" value={appointment.id} type="hidden" />
  {/if}

  <!-- {...register("startAt", {
      // valueAsDate: true,
      required: t({
        id: "provider.appointment-form.start-date.error.required",
        message: "Bitte gegen Sie einen Startdatum an",
      }),
      min: {
        value: dayjs().format("YYYY-MM-DDTHH:mm"),
        message: t({
          id: "provider.appointment-form.start-date.error.min",
          message:
            "Der Impftermin darf nicht in der Vergangenheit liegen",
        }),
      },
      max: {
        value: dayjs().add(30, "days").format("YYYY-MM-DDTHH:mm"),
        message: t({
          id: "provider.appointment-form.start-date.error.max",
          message:
            "Der Impftermin darf maximal 30 Tage in der Zukunft liegen",
        }),
      },
    })} -->
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

  <!-- {...register("vaccine", {
      required: t({
        id: "provider.appointment-form.vaccine.error-required",
        message: "Bitte gegen Sie den Impfstoff an",
      }),
    })} -->
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

  <!-- {...register("slotCount", {
      valueAsNumber: true,
      required: t({
        id: "provider.appointment-form.slots.error.required",
        message: "Bitte gegen Sie die Anzahl der Impfdosen ein",
      }),
      min: {
        value: 1,
        message: t({
          id: "provider.appointment-form.slots.error.min",
          message:
            "Die minimale Anzahl der Impfdosen pro Termin beträgt 1",
        }),
      },
      max: {
        value: 50,
        message: t({
          id: "provider.appointment-form.slots.error.max",
          message:
            "Die maximale Anzahl der Impfdosen pro Termin beträgt 50",
        }),
      },
    })} -->
  <div class="flex flex-row gap-m">
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

    <!-- {...register("duration", {
      valueAsNumber: true,
      required: t({
        id: "provider.appointment-form.duration.error-required",
        message: "Bitte gegen Sie die Anzahl der Impfdosen ein",
      }),
      min: {
        value: 5,
        message: t({
          id: "provider.appointment-form.duration.error.min",
          message:
            "Die minimale Dauer eines Impftermins beträgt 5 Minuten",
        }),
      },
      max: {
        value: 240,
        message: t({
          id: "provider.appointment-form.duration.error.max",
          message:
            "Die maximale Dauer eines Impftermins beträgt 240 Minuten",
        }),
      },
    })} -->
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
