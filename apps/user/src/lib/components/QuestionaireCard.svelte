<script lang="ts">
  import { t } from "svelte-intl-precompile";
  import type { Writable } from "svelte/store";

  export let name: string;
  export let value: Writable<boolean | string>;
  export let condition = true;
  export let error = false;
  export let errorMessage = "";
</script>

<!-- class={clsx(
  "flex flex-col gap-5 py-3 px-4 font-semibold bg-white rounded shadow-box sm:w-[500px]",
  {
    ["border-2 border-error"]: error,
  }
)} -->

{#if condition}
  <div class="questionaire-card" aria-live="polite">
    <fieldset aria-errormessage={error ? `${name}-error` : undefined}>
      <legend class="h4"><slot /></legend>

      <slot name="options">
        <div>
          <label class="label">
            <input
              class="radio black l"
              type="radio"
              id={`${name}-yes`}
              {name}
              value={true}
              bind:group={$value}
              required
            />
            {$t("user.questionaire.yes")}
          </label>

          <label class="label">
            <input
              class="radio black l"
              type="radio"
              id={`${name}-no`}
              {name}
              value={false}
              bind:group={$value}
              required
            />
            {$t("user.questionaire.no")}
          </label>
        </div>
      </slot>
    </fieldset>

    {#if error}
      <div
        class="mx-4 sm:w-[500px] xl:mt-2"
        id={`${name}-error`}
        aria-live="assertive"
      >
        {#if errorMessage}
          {errorMessage}
        {:else}
          {$t("user.questionaire.error.default")}
        {/if}
      </div>
    {/if}
  </div>
{/if}

<style lang="postcss">
  .questionaire-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    --tw-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    --tw-shadow-colored: 0px 2px 6px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

    border-radius: var(--radius-m);
    padding: 1rem;
  }

  fieldset {
    border: none;

    & > div {
      display: inline-flex;
      align-items: center;
      gap: 1rem;

      & legend {
        font-weight: 700;
      }
    }
  }
</style>
