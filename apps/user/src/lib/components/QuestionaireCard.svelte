<script lang="ts">
  import { t } from "svelte-intl-precompile";
  import type { Writable } from "svelte/store";

  export let name: string;
  export let value: Writable<boolean | string>;
  export let condition = true;
  export let error = false;
  export let errorMessage = "";
</script>

{#if condition}
  <div>
    <article aria-live="polite">
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
    </article>

    {#if error}
      <div id={`${name}-error`} class="error" aria-live="assertive">
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
  article {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: var(--shadow-box);
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

  .error {
    margin-top: 0.5rem;
  }
</style>
