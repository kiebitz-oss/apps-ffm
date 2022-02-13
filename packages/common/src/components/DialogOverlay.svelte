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

  const handleClick = () => {
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
    display: grid;
    justify-content: center;

    overflow: auto;
    background: rgba(250, 249, 249, 0.4);
    backdrop-filter: blur(4px);

    z-index: 900;

    overscroll-behavior: contain;
    pointer-events: auto;
    visibility: visible;
  }
</style>
