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
    margin: 10vh auto;
    width: 100%;
    padding: 2rem;
    display: flex;
    place-items: center;
    max-width: 65ch;

    z-index: 99;
    position: relative;

    background: #ffffff;
    border-radius: 15px;

    overflow-y: auto;
    overscroll-behavior: contain;

    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    & > button {
      position: absolute;
      top: 1rem;
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
