<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import CloseIcon from "~icons/carbon/close";
  import DialogOverlay from "./DialogOverlay.svelte";

  export let open = false;
  export let ignoreEscape = false;
  export let ignoreClickOutside = false;

  let ref: HTMLDivElement;

  const dispatch = createEventDispatcher<{ close: never }>();

  onMount(() => {
    const focusableElements =
      "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1']):not([disabled]), details:not([disabled]), summary:not(:disabled), [contenteditable]";

    ref.querySelector<HTMLElement>(focusableElements).focus();
  });
</script>

{#if open}
  <DialogOverlay
    onClose={() => dispatch("close")}
    {ignoreEscape}
    {ignoreClickOutside}
  >
    <div
      aria-modal="true"
      role="dialog"
      tabindex="-1"
      bind:this={ref}
      in:fade
      {...$$restProps}
    >
      <button
        type="button"
        aria-label="Schließen"
        on:click={() => dispatch("close")}
      >
        <CloseIcon class="close-icon" aria-hidden />
      </button>

      <slot />
    </div>
  </DialogOverlay>
{/if}

<style lang="postcss">
  div {
    position: relative;

    width: 100%;
    max-width: 65ch;

    margin-top: 5vh;
    box-sizing: content-box;
    margin-bottom: auto;

    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    z-index: 999;

    background: var(--color-white);
    border-radius: var(--radius-m);

    box-shadow: var(--shadow-box);

    & > button {
      position: absolute;
      top: 2rem;
      right: 1rem;
      border: none;
      color: var(--color-black);

      & :global(.close-icon) {
        height: 2rem;
        width: 2rem;

        &:hover {
          color: currentColor;
        }
      }

      &:hover {
        color: var(--color-primary);
      }
    }
  }
</style>
