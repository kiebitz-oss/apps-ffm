<script lang="ts">
  import { goto } from "$app/navigation";
  import { login } from "$lib/api";
  import {
    addNotification,
    Content,
    NotificationType,
    Page,
    PageHeader,
  } from "@impfen/common";
  import { t } from "svelte-intl-precompile";

  let secret: string;

  const handleSubmit = async () => {
    await login(secret)
      .then(() => goto("/status"))
      .catch(() => {
        addNotification(
          $t("user.login.notification.error"),
          NotificationType.DANGER
        );
      });
  };
</script>

<Page title={$t("user.login.page-title")}>
  <Content class="stack-v gap-m s">
    <PageHeader><h1 class="h1">{$t("user.login.title")}</h1></PageHeader>

    <form
      name="login"
      class="stack-v gap-m"
      on:submit|preventDefault={handleSubmit}
    >
      <div class="field">
        <label for="secret" class="label">{$t("user.login.label-secret")}</label
        >
        <input
          type="text"
          id="secret"
          name="secret"
          bind:value={secret}
          on:paste
          required
          minlength={16}
          maxlength={16}
          pattern={`[a-zA-Z0-9]{16}`}
          style:width="20ch"
        />
      </div>

      <button type="submit" class="button primary l"
        >{$t("user.welcome.button-submit")}</button
      >
    </form>
  </Content>
</Page>
