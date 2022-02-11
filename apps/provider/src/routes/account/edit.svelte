<script lang="ts">
  import { goto } from "$app/navigation";
  import { storeProvider } from "$lib/api";
  import { ProviderForm } from "$lib/components";
  import { unverifiedProvider } from "$lib/stores";
  import { addNotification, Content, Page, PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { ProviderInput } from "vanellus";

  const handleSubmit = async ({ detail }: CustomEvent<ProviderInput>) => {
    try {
      await storeProvider(detail);

      await goto("/account");

      addNotification("Saved data..");
    } catch (error) {
      console.error(error);
      addNotification("Saved data..");
    }
  };
</script>

<Page title={$t("provider.account.index.page-title")}>
  <Content class="stack-v gap-l">
    <PageHeader>
      <h1 class="h1">{$t("provider.account.index.title")}</h1>

      <a href="/account" class="button s secondary" slot="actions">
        {$t("provider.account.index.show-button")}
      </a>
    </PageHeader>

    <ProviderForm provider={$unverifiedProvider} on:submit={handleSubmit} />
  </Content>
</Page>
