<script lang="ts" context="module">
  import { goto } from "$app/navigation";
  import { storeProvider } from "$lib/api";
  import { ProviderForm } from "$lib/components";
  import { unverifiedProvider } from "$lib/stores";
  import {
    addNotification,
    NotificationType,
    PageHeader,
  } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { ProviderInput } from "vanellus";
</script>

<script lang="ts">
  const handleSubmit = async ({ detail }: CustomEvent<ProviderInput>) => {
    try {
      await storeProvider(detail);

      await goto("/account");

      addNotification($t("provider.account.edit.notification-success"));
    } catch (error) {
      console.error(error);

      addNotification(
        $t("provider.account.edit.notification-error"),
        NotificationType.DANGER
      );
    }
  };
</script>

<svelte:head
  ><title>{$t("provider.account.edit.page-title")}</title></svelte:head
>

<PageHeader>
  <h1 class="h1">{$t("provider.account.edit.title")}</h1>

  <a href="/account" class="button s secondary">
    {$t("provider.account.edit.show-button")}
  </a>
</PageHeader>

<ProviderForm provider={$unverifiedProvider} on:submit={handleSubmit} />
