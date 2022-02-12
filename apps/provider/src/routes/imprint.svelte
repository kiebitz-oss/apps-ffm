<script lang="ts">
  import { theme } from "@impfen/common";
</script>

<article class:flow={true}>
  <svelte:component this={theme.content.imprint} />
</article>

<style lang="postcss">
  article {
    --flow-max-width: 40rem;
  }
</style>
