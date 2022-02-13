<script lang="ts">
  import IconCopy from "~icons/carbon/copy";

  export let secret = "123456789";
  export let copy: undefined | true = undefined;

  const secretChunks = secret.match(/.{1,4}/g);

  const handleCopy: svelte.JSX.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      // eslint-disable-next-line compat/compat
      await navigator.clipboard.writeText(secret);
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line compat/compat
  const supportsClipboard = false; // typeof navigator?.clipboard === "object";
</script>

<section {...$$restProps}>
  <div aria-label={secret}>
    {#each secretChunks as chunk}
      <span aria-hidden>{chunk}</span>
    {/each}
  </div>

  {#if copy && supportsClipboard}
    <button
      aria-label="Secret in Zwischenablage kopieren"
      on:click|preventDefault={handleCopy}><IconCopy aria-hidden /></button
    >
  {/if}
</section>

<style lang="postcss">
  section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;

    background-color: var(--color-black);
    border-radius: var(--radius-m);
    padding: 1rem;
    text-align: center;
    color: white;
    font-size: var(--font-size-1);
    font-weight: 600;

    & div {
      user-select: all;

      & ::selection {
        background-color: yellow;
        color: black;
      }
    }
  }

  span {
    &:before {
      content: "·";
      margin: 0 0.25rem;
    }

    &:first-of-type:before {
      content: "";
      margin: 0;
    }
  }

  button {
    /* appearance: none;
    background-color: transparent;
    color: currentColor;
    padding: 0; */
  }
</style>
