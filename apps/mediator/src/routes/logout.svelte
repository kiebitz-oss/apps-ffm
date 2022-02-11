<script lang="ts">
  import { goto } from "$app/navigation";
  import { logout } from "$lib/api";
  import { addNotification, Content, Page } from "@impfen/common";
  import { t } from "svelte-intl-precompile";

  const handleLogout: svelte.JSX.EventHandler<
    MouseEvent,
    HTMLButtonElement
  > = async () => {
    logout();

    await goto("/")
      .then(() => addNotification($t("mediator.logout.notification.success")))
      .catch((error) => {
        console.error(error);
      });
  };
</script>

<Page title={$t("mediator.logout.page-title")}>
  <Content class="stack-v gap-m m">
    <h1 class="h1">{$t("mediator.logout.title")}</h1>

    <p class="text-2">
      {$t("mediator.logout.intro")}
    </p>

    <button
      class="button primary l"
      type="submit"
      on:click|preventDefault={handleLogout}
    >
      {$t("mediator.logout.button")}
    </button>
  </Content>
</Page>
