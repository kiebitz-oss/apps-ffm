<script lang="ts">
  import { goto } from "$app/navigation";
  import { logout } from "$lib/api";
  import { addNotification } from "@impfen/common";
  import { t } from "svelte-intl-precompile";

  const handleLogout: svelte.JSX.EventHandler<
    MouseEvent,
    HTMLButtonElement
  > = async () => {
    logout();

    await goto("/").catch((error) => {
      console.error(error);
    });

    addNotification($t("mediator.logout.notification.success"));
  };
</script>

<svelte:head>
  <title>{$t("mediator.welcome.page-title")}</title>
</svelte:head>

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

<style lang="postcss">
  :root {
    --flow-max-width: 40rem;
  }
</style>
