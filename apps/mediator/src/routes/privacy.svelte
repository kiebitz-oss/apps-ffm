<script lang="ts">
  import { theme } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<svelte:head>
  <title>{$t("mediator.privacy.page-title")}</title>
</svelte:head>

<svelte:component this={theme.content.privacy} />
