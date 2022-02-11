<script lang="ts">
  import { Questionaire } from "$lib/components";
  import { Content, Page, PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<Page title={$t("user.welcome.page-title")}>
  <Content class="stack-v gap-m flex-1">
    <PageHeader>
      <h1 class="h1">{$t("user.welcome.title")}</h1>
    </PageHeader>

    <p class="text-1">
      {$t("user.welcome.intro-1")}
    </p>

    <p class="text-1" id="questionaire-intro">
      {$t("user.welcome.intro-2")}
    </p>

    <Questionaire />
  </Content>
</Page>
