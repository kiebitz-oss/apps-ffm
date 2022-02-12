<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { t } from "svelte-intl-precompile";
  import Privacy from "../content/privacy.mdx";
</script>

<svelte:head><title>{$t("user.privacy.page-title")}</title></svelte:head>

<article>
  <Privacy />
</article>

<style lang="postcss">
  article {
    --flow-max-width: 40rem;
  }
</style>
