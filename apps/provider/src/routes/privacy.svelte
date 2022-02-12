<script lang="ts">
  import { theme } from "@impfen/common";
</script>

<article>
  <svelte:component this={theme.content.privacy} />
</article>

<style lang="postcss">
  article {
    --flow-max-width: 40rem;
  }
</style>
