<script lang="ts">
  import { ProviderSummary } from "$lib/components";
  import { unverifiedProvider } from "$lib/stores";
  import { Content, Page, PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { ProviderInput } from "vanellus";
  import { ProviderStatus } from "vanellus";

  const provider: ProviderInput = $unverifiedProvider;
  const providerState: ProviderStatus = ProviderStatus.VERIFIED;
</script>

<Page title="Account">
  <Content class="stack-v gap-l">
    <PageHeader>
      <h1 class="h1">{$t("provider.account.index.title")}</h1>

      <a href="/account/edit" class="button s secondary" slot="actions">
        {$t("provider.account.index.edit-button")}
      </a>
    </PageHeader>

    {#if providerState !== ProviderStatus.VERIFIED}
      <p class="mb-8">
        {$t("provider.account.not-verified-yet")}
      </p>
    {/if}

    <div class="max-w-3xl">
      <ProviderSummary {provider} />
    </div>
  </Content>
</Page>
