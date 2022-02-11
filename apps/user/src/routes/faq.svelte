<script lang="ts">
  import { Content, Page } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import Faq from "../content/faq.de.mdx";
</script>

<Page title={$t("user.faq.page-title")}>
  <Content class="">
    <div class="stack-v gap-l max-w-m" id="faq">
      <Faq />
    </div>
  </Content>
</Page>
