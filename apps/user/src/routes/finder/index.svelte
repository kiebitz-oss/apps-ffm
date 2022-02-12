<script lang="ts">
  import { getProviders } from "$lib/api";
  import ProvidersList from "$lib/components/ProvidersList.svelte";
  import { Loading, PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { PublicProvider } from "vanellus";

  const providers: Promise<PublicProvider[]> = getProviders();
</script>

<svelte:head><title>{$t("user.finder.location.page-title")}</title></svelte:head
>

<PageHeader>
  <h1 class="h1 mb-s">{$t("user.finder.location.title")}</h1>

  <a href="/" slot="backLink" class="back-link"
    >{$t("user.finder.location.back-link")}</a
  >
  <p slot="intro" class="text-1">{$t("user.finder.location.intro")}</p>
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
