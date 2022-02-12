<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { t } from "svelte-intl-precompile";
  import Imprint from "../content/imprint.mdx";
</script>

<svelte:head><title>{$t("user.imprint.page-title")}</title></svelte:head>

<article>
  <Imprint />
</article>

<style lang="postcss">
  article {
    --flow-max-width: 40rem;
  }
</style>
