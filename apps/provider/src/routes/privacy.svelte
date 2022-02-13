<script lang="ts" context="module">
  import { theme } from "@impfen/common";
  import { t } from "svelte-intl-precompile";

  export const prerender = true;
</script>

<svelte:head>
  <title>{$t("provider.privacy.page-title")}</title>
</svelte:head>

<article class:flow={true}>
  <svelte:component this={theme.content.privacy} />
</article>

<style lang="postcss">
  article {
    --flow-max-width: 40rem;
  }
</style>
