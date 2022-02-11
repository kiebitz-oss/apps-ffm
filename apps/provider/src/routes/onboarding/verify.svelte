<script lang="ts">
  import { goto } from "$app/navigation";
  import { register } from "$lib/api";
  import { ProviderSummary } from "$lib/components";
  import { unverifiedProvider } from "$lib/stores";
  import { addNotification, Content, Page, PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";

  const handleSubmit = async () => {
    await register($unverifiedProvider);
    await goto("/onboarding/backup");
  };

  $: if (!$unverifiedProvider) {
    goto("/onboarding").catch((error) => {
      console.error(error);

      addNotification($t("provider.onboarding.verify.notification-error"));
    });
  }
</script>

<Page title={$t("provider.onboarding.verify.page-title")}>
  <Content size="l">
    <PageHeader>
      <h1>{$t("provider.onboarding.verify.title")}</h1>
    </PageHeader>

    <ProviderSummary provider={$unverifiedProvider} />

    <div class="flex justify-between">
      <a href="/onboarding" class="button secondary m">
        {$t("provider.onboarding.verify.edit-data")}
      </a>

      <button on:click|preventDefault={handleSubmit} class="button primary m">
        {$t("provider.onboarding.verify.button")}
      </button>
    </div>
  </Content>
</Page>
