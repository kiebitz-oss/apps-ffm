<script lang="ts" context="module">
  import { theme } from "@impfen/common";
  import { locale, t } from "svelte-intl-precompile";

  export const prerender = true;
</script>

<svelte:head><title>{$t("user.faq.page-title")}</title></svelte:head>

<article class:flow={true}>
  <svelte:component
    this={$locale === "de" ? theme.content.faqDe : theme.content.faqEn}
  />
</article>

<style lang="postcss">
  article {
    --flow-max-width: 40rem;
  }
</style>
