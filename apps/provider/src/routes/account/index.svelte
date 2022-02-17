<script lang="ts" context="module">
  import { ProviderSummary } from "$lib/components";
  import { unverifiedProvider, verified } from "$lib/stores";
  import { PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { UpdateProviderInput } from "vanellus";
</script>

<script lang="ts">
  const provider: UpdateProviderInput = $unverifiedProvider;

  // getVerifiedProvider()
  //   .then((verifiedProvider) => {
  //     console.log($verified, verifiedProvider);

  //     return verifiedProvider;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
</script>

<svelte:head><title>{$t("provider.account.index.title")}</title></svelte:head>

<PageHeader>
  <h1 class="h1">{$t("provider.account.index.title")}</h1>

  <a href="/account/edit" class="button s secondary">
    {$t("provider.account.index.edit-button")}
  </a>
</PageHeader>

{#if !$verified}
  <p class="mb-8">
    {$t("provider.account.not-verified-yet")}
  </p>
{/if}

<ProviderSummary {provider} />
