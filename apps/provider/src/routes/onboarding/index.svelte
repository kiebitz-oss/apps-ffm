<script lang="ts">
  import { goto } from "$app/navigation";
  import { ProviderForm } from "$lib/components";
  import { unverifiedProvider } from "$lib/stores";
  import { PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { ProviderInput } from "vanellus";

  const handleSubmit = async ({ detail }: CustomEvent<ProviderInput>) => {
    $unverifiedProvider = detail;

    await goto("/onboarding/verify");
  };
</script>

<svelte:head
  ><title>{$t("provider.onboarding.index.page-title")}</title></svelte:head
>

<PageHeader>
  <h1 class="h1">{$t("provider.onboarding.index.title")}</h1>
</PageHeader>

<ProviderForm on:submit={handleSubmit} provider={$unverifiedProvider} />
