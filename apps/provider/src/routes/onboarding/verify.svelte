<script lang="ts" context="module">
  import { browser } from "$app/env";
  import { goto } from "$app/navigation";
  import { createProvider } from "$lib/api";
  import { ProviderSummary } from "$lib/components";
  import { newProvider, unverifiedProvider } from "$lib/stores";
  import {
    addNotification,
    NotificationType,
    PageHeader,
  } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<script lang="ts">
  const handleSubmit = async () => {
    await createProvider($newProvider)
      .then((provider) => {
        $newProvider = undefined;

        return provider;
      })
      .catch((error) => {
        console.error(error);

        addNotification(
          $t("provider.onboarding.verify.notification-error"),
          NotificationType.DANGER
        );
      });

    await goto("/onboarding/backup");
  };

  if (!$newProvider && !$unverifiedProvider) {
    if (browser) {
      goto("/onboarding");
    }
  }

  const providerPromise = Promise.resolve($unverifiedProvider);
</script>

<svelte:head
  ><title>{$t("provider.onboarding.verify.page-title")}</title></svelte:head
>

<PageHeader>
  <h1 class="h1">{$t("provider.onboarding.verify.title")}</h1>
</PageHeader>

{#await providerPromise then provider}
  <ProviderSummary {provider} />

  <div class="stack-h">
    <a href="/onboarding" class="button secondary m">
      {$t("provider.onboarding.verify.edit-data")}
    </a>

    <button on:click|preventDefault={handleSubmit} class="button primary m">
      {$t("provider.onboarding.verify.button")}
    </button>
  </div>
{/await}
