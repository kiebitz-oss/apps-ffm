<script lang="ts">
  import { Field } from "@impfen/common";
  import { createEventDispatcher } from "svelte";
  import { t } from "svelte-intl-precompile";
  import type { ProviderInput } from "vanellus";

  export let provider: ProviderInput = {
    name: "",
    street: "",
    zipCode: "",
    city: "",
    email: "",
    accessible: false,
    description: "",
    website: undefined,
  };

  const dispatcher = createEventDispatcher<{
    submit: ProviderInput;
  }>();

  const handleSubmit: svelte.JSX.EventHandler<
    SubmitEvent,
    HTMLFormElement
  > = () => {
    dispatcher("submit", provider);
  };
</script>

<form
  id="provider-form"
  name="provider-onboarding"
  class="stack-v gap-l"
  on:submit|preventDefault={handleSubmit}
>
  <fieldset class="fieldset">
    <legend>
      <h2 class="h3">Allgemeine Daten</h2>
    </legend>

    <p class="text">Dies sind die allgemeinen Kontaktdaten.</p>

    <Field label="Vollständiger Name" name="name" required
      ><input
        type="text"
        bind:value={provider.name}
        required
        name="name"
      /></Field
    >

    <Field label="Straße & Hausnummer" name="street" required
      ><input
        type="text"
        bind:value={provider.street}
        required
        name="street"
      /></Field
    >

    <div class="stack-h">
      <Field label="Postleitzahl" name="zipCode" required
        ><input
          type="number"
          bind:value={provider.zipCode}
          required
          name="zipCode"
          min={1}
          max={99999}
          minlength={5}
          maxlength={5}
          pattern={`[0-9]{5}`}
        /></Field
      >

      <div style:flex={1}>
        <Field label="Ort" name="city" required
          ><input
            type="text"
            bind:value={provider.city}
            required
            name="city"
          /></Field
        >
      </div>
    </div>

    <Field label="Webseite" name="website"
      ><input type="url" bind:value={provider.website} name="website" /></Field
    >

    <Field label="Beschreibung" name="description">
      <textarea
        class:textarea={true}
        name="description"
        bind:value={provider.description}
      />

      <small class="hint">
        Informationen für Impfwillige (z.B. wenn Sie einen Impfstoff nur
        bestimmten Gruppen empfehlen)
      </small>
    </Field>

    <Field label="Beschreibung" name="accessible">
      <label>
        <input
          type="checkbox"
          role="switch"
          id="accessible"
          name="accessible"
          value={true}
          bind:checked={provider.accessible}
        />

        Barrierefreier Zugang zur Praxis/zur Impfstelle
      </label>
    </Field>
  </fieldset>

  <fieldset class="fieldset">
    <legend>
      <h2 class="h3">{$t("provider.provider-form.contact-data.title")}</h2>
    </legend>

    <p class="text">
      {$t("provider.provider-form.contact-data.intro")}
    </p>

    <Field label="E-Mail-Adresse" name="email" required>
      <input type="email" name="email" bind:value={provider.email} required />
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
