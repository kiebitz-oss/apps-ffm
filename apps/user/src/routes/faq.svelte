<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { t } from "svelte-intl-precompile";
  import Faq from "../content/faq.de.mdx";
</script>

<svelte:head><title>{$t("user.faq.page-title")}</title></svelte:head>

<article class:flow={true}>
  <Faq />
</article>

<style lang="postcss">
  article {
    --flow-max-width: 40rem;
  }
</style>
