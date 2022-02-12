<script lang="ts">
  import { theme } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<svelte:head>
  <title>{$t("mediator.privacy.page-title")}</title>
</svelte:head>

<article>
  <svelte:component this={theme.content.privacy} />
</article>

<style lang="postcss">
  article {
    --flow-max-width: 40rem;
  }
</style>
