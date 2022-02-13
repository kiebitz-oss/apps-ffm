<script lang="ts" context="module">
  import { goto } from "$app/navigation";
  import { logout } from "$lib/api";
  import { SecretBox } from "$lib/components";
  import { secret } from "$lib/stores";
  import { addNotification } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<script lang="ts">
  const handleLogout: svelte.JSX.EventHandler<
    MouseEvent,
    HTMLButtonElement
  > = async () => {
    await logout();

    await goto("/");

    addNotification($t("user.logout.notification.success"));
  };
</script>

<svelte:head><title>{$t("user.logout.page-title")}</title></svelte:head>

<form>
  <h1 class="h1">{$t("user.logout.title")}</h1>

  <p class="text-1">
    {$t("user.logout.intro")}
  </p>

  <div>
    <h2 class="book">{$t("user.logout.step-1")}</h2>
    <SecretBox secret={$secret} copy />
  </div>

  <div>
    <h2 class="book">{$t("user.logout.step-2")}</h2>

    <button
      class="button primary l"
      type="submit"
      on:click|preventDefault={handleLogout}>{$t("user.logout.button")}</button
    >
  </div>
</form>

<style lang="postcss">
  form {
    --flow-max-width: 40rem;
  }
</style>
