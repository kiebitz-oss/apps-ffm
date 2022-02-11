<!-- <script lang="ts">
  type TitleVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "book";

  export let variant: TitleVariant = "h1";
  export let as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1";
</script>

<svelte:component this={as} {...$$restProps} class={variant}>
  <slot />
</svelte:component> -->

<h1><slot /></h1>
