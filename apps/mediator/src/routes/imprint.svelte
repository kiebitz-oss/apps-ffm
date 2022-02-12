<script lang="ts">
  import { theme } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<svelte:head>
  <title>{$t("mediator.imprint.page-title")}</title>
</svelte:head>

<article>
  <svelte:component this={theme.content.imprint} />
</article>

<style lang="postcss">
  article {
    --flow-max-width: 40rem;
  }
</style>
