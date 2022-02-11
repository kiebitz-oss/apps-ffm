<script lang="ts">
  import { goto } from "$app/navigation";
  import { logout } from "$lib/api";
  import { SecretBox } from "$lib/components";
  import { secret } from "$lib/stores";
  import { Content, Page } from "@impfen/common";
  import { t } from "svelte-intl-precompile";

  // $: if (!$secret) {
  //   goto("/");
  // }

  const handleLogout: svelte.JSX.EventHandler<
    MouseEvent,
    HTMLButtonElement
  > = async () => {
    await logout();

    await goto("/");
  };
</script>

<Page title={$t("user.logout.page-title")}>
  <Content class="stack-v m gap-l">
    <h1 class="h1">{$t("user.logout.title")}</h1>

    <p class="text-2">
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
        on:click|preventDefault={handleLogout}
        >{$t("user.logout.button")}</button
      >
    </div>
  </Content>
</Page>
