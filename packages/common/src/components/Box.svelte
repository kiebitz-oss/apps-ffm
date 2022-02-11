<script lang="ts">
  type BoxSize = "s" | undefined;

  export let narrow = false;
  export let size: BoxSize = undefined;
</script>

<div class:box={true} class:narrow class:s={size === "s"} {...$$restProps}>
  <slot />
</div>

<style lang="postcss"></style>
