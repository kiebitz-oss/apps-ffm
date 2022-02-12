<script lang="ts">
  import { theme } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<svelte:head>
  <title>{$t("mediator.imprint.page-title")}</title>
</svelte:head>

<svelte:component this={theme.content.imprint} />

<style lang="postcss">
  :root {
    --flow-max-width: 40rem;
  }
</style>
