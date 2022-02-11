<script lang="ts">
  import { DownloadBackupDataButton, SecretBox } from "$lib/components";
  import { secret, unverifiedProvider } from "$lib/stores";
  import { Content, Page, PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<Page title="">
  <Content class="stack-v gap-l m">
    <PageHeader>
      <h1>{$t("provider.onboarding.backup.title")}</h1>
    </PageHeader>

    <p class="text-2">
      {$t("provider.onboarding.backup.intro")}
    </p>

    <div>
      <h2 class="book">{$t("provider.onboarding.backup.step-1")}</h2>
      <SecretBox secret={$secret} copy />
    </div>

    <div>
      <h2 class="book">{$t("provider.onboarding.backup.step-2")}</h2>
      <DownloadBackupDataButton
        providerName={$unverifiedProvider.name}
        class="block secondary button m"
      >
        {$t("provider.onboarding.backup.download-keypairs")}
      </DownloadBackupDataButton>
    </div>

    <a href="/schedule" class="button primary l">
      {$t("provider.onboarding.backup.next")}
    </a>
  </Content>
</Page>
