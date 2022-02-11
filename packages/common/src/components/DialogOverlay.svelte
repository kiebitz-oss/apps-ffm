<script lang="ts">
  import { portal, scrollLock } from "../actions";

  export let onClose: () => void;
  export let ignoreEscape = false;
  export let ignoreClickOutside = false;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && !ignoreEscape) {
      onClose();
    }
  };

  const handleClick = (event: MouseEvent) => {
    if (!ignoreClickOutside) {
      onClose();
    }
  };
</script>

<svelte:body on:keydown={handleKeyDown} />

<div use:portal use:scrollLock on:click|self|stopPropagation={handleClick}>
  <slot />
</div>

<style lang="postcss">
  div {
    position: fixed;
    inset: 0;
    display: flex;
    place-items: center;

    overflow: hidden;
    background: rgba(250, 249, 249, 0.4);
    backdrop-filter: blur(4px);

    z-index: 999;
    overflow-y: auto;

    overscroll-behavior: contain;
    pointer-events: auto;
    visibility: visible;
  }
</style>
