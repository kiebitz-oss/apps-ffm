<script lang="ts">
  import { Content, Page, theme } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<Page title={$t("provider.imprint.page-title")}>
  <Content>
    <div class="stack-v gap-m max-w-m">
      <svelte:component this={theme.content.imprint} />
    </div>
  </Content>
</Page>
