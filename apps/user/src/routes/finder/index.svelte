<script lang="ts" context="module">
  import { getProviders } from "$lib/api";
  import ProvidersList from "$lib/components/ProvidersList.svelte";
  import { Loading, PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { PublicProvider } from "vanellus";
</script>

<script lang="ts">
  const providers: Promise<PublicProvider[]> = getProviders();
</script>

<svelte:head><title>{$t("user.finder.location.page-title")}</title></svelte:head
>

<PageHeader>
  <h1 class="h1">{$t("user.finder.location.title")}</h1>

  <a slot="backLink" href="/" class="back-link">
    {$t("user.finder.location.back-link")}
  </a>

  <p slot="intro">
    {$t("user.finder.location.intro")}
  </p>
</PageHeader>

{#await providers}
  <Loading />
{:then loadedProviders}
  <ProvidersList providers={loadedProviders} />
{:catch error}
  <p class="error">
    {error.message}
  </p>
{/await}
