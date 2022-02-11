<script lang="ts">
  type ButtonVariants = "primary" | "secondary";

  interface $$Props extends HTMLButtonElement {
    variant: ButtonVariants | undefined;
    block: boolean;
    invalid: boolean;
  }

  export let variant: ButtonVariants | undefined = undefined;
  export let block = false;
  export let invalid = false;
</script>

<button
  class:button={true}
  class:variant
  class:invalid
  class:block
  {...$$restProps}
  on:click><slot /></button
>

<style lang="postcss">
  .button {
    background-color: var(--primary);

    &.block {
      display: block;
    }
  }
</style>
