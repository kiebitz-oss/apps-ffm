<script lang="ts">
  import { Field } from "@impfen/common";
  import { createEventDispatcher } from "svelte";
  import { t } from "svelte-intl-precompile";
  import type { ProviderInput } from "vanellus";

  export let provider: ProviderInput;

  let name = provider?.name || "";
  let street = provider?.street || "";
  let zipCode = provider?.zipCode || "";
  let city = provider?.city || "";
  let email = provider?.email || "";
  let accessible = provider?.accessible || false;
  let description = provider?.description || "";
  let website = provider?.website || undefined;

  const dispatcher = createEventDispatcher<{
    submit: ProviderInput;
  }>();

  const handleSubmit: svelte.JSX.EventHandler<
    SubmitEvent,
    HTMLFormElement
  > = () => {
    dispatcher("submit", {
      name,
      street,
      zipCode,
      city,
      email,
      accessible,
      description,
      website,
    });
  };
</script>

<form
  id="provider-form"
  name="provider-onboarding"
  class="stack-v gap-l"
  on:submit|preventDefault={handleSubmit}
>
  <fieldset class="fieldset">
    <legend>Allgemeine Daten</legend>

    <p class="text">Dies sind die allgemeinen Kontaktdaten.</p>

    <Field label="Vollständiger Name" name="name" required
      ><input type="text" name="name" required bind:value={name} /></Field
    >

    <Field label="Straße & Hausnummer" name="street" required
      ><input type="text" name="street" required bind:value={street} /></Field
    >

    <div class="field-row">
      <Field label="Postleitzahl" name="zipCode" required
        ><input
          type="number"
          name="zipCode"
          required
          min={1}
          max={99999}
          minlength={5}
          maxlength={5}
          pattern={`[0-9]{5}`}
          bind:value={zipCode}
        /></Field
      >

      <div style:flex={1}>
        <Field label="Ort" name="city" required
          ><input type="text" name="city" required bind:value={city} /></Field
        >
      </div>
    </div>

    <Field label="Webseite" name="website"
      ><input type="url" name="website" bind:value={website} /></Field
    >

    <Field label="Beschreibung" name="description">
      <textarea
        name="description"
        class:textarea={true}
        bind:value={description}
      />

      <small class="hint">
        Informationen für Impfwillige (z.B. wenn Sie einen Impfstoff nur
        bestimmten Gruppen empfehlen)
      </small>
    </Field>

    <Field name="accessible">
      <label class="label">
        <input
          id="accessible"
          name="accessible"
          type="checkbox"
          value={true}
          role="switch"
          class="checkbox l"
          bind:checked={accessible}
        />

        Barrierefreier Zugang zur Praxis/zur Impfstelle
      </label>
    </Field>
  </fieldset>

  <fieldset class="fieldset">
    <legend>{$t("provider.provider-form.contact-data.title")}</legend>

    <p class="text">
      {$t("provider.provider-form.contact-data.intro")}
    </p>

    <Field label="E-Mail-Adresse" name="email" required>
      <input type="email" name="email" required bind:value={email} />
    </Field>
  </fieldset>

  <button class="button primary m" type="submit">Speichern und weiter</button>
</form>

<style lang="postcss">
  #provider-form {
    max-width: 40rem;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: none;
  }
</style>
