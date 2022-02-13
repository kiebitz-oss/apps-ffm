<script lang="ts" context="module">
  import { t } from "svelte-intl-precompile";
  import Imprint from "../content/imprint.mdx";

  export const prerender = true;
</script>

<svelte:head><title>{$t("user.imprint.page-title")}</title></svelte:head>

<article class:flow={true}>
  <Imprint />
</article>

<style lang="postcss">
  article {
    --flow-max-width: 40rem;
  }
</style>
