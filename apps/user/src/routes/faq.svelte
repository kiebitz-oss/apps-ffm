<script lang="ts" context="module">
  import { t } from "svelte-intl-precompile";
  import Faq from "../content/faq.de.mdx";

  export const prerender = true;
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
