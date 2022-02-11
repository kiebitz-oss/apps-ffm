<script lang="ts">
  import { goto } from "$app/navigation";
  import { logout } from "$lib/api";
  import { DownloadBackupDataButton, SecretBox } from "$lib/components";
  import { keyPairs, secret, unverifiedProvider } from "$lib/stores";
  import { Content, Page } from "@impfen/common";
  import { t } from "svelte-intl-precompile";

  $: if (!$secret) {
    goto("/").catch((error) => {
      console.error(error);
    });
  }

  const handleLogout: svelte.JSX.EventHandler<
    MouseEvent,
    HTMLButtonElement
  > = async () => {
    await goto("/");
    await logout();
  };
</script>

<Page title={$t("provider.logout.page-title")}>
  <Content class="stack-v m gap-l">
    <h1 class="h1">{$t("provider.logout.title")}</h1>

    <p class="text-1">
      {$t("provider.logout.intro")}
    </p>

    <div>
      <h2 class="book">{$t("provider.logout.step-1")}</h2>
      <SecretBox secret={$secret} copy />
    </div>

    <div>
      <h2 class="book">{$t("provider.logout.step-2")}</h2>
      <DownloadBackupDataButton
        providerName={$unverifiedProvider.name}
        keyPairs={$keyPairs}
        class="block secondary button m"
      >
        {$t("provider.logout.download-backup-data")}
      </DownloadBackupDataButton>
    </div>

    <div>
      <h2 class="book">{$t("provider.logout.step-3")}</h2>

      <button
        class="button primary l"
        type="submit"
        on:click|preventDefault={handleLogout}
        >{$t("provider.logout.button")}</button
      >
    </div>
  </Content>
</Page>
