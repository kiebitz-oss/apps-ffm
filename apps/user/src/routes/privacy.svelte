<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { theme } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<svelte:head><title>{$t("user.privacy.page-title")}</title></svelte:head>

<svelte:component this={theme.content.privacy} />
