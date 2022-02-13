<script lang="ts" context="module">
  import { goto } from "$app/navigation";
  import { login } from "$lib/api";
  import {
    addNotification,
    NotificationType,
    PageHeader,
  } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<script lang="ts">
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

<svelte:head><title>{$t("user.login.page-title")}</title></svelte:head>

<PageHeader><h1 class="h1">{$t("user.login.title")}</h1></PageHeader>

<p class="text-1">{$t("user.login.intro")}</p>

<form name="login" on:submit|preventDefault={handleSubmit}>
  <div class="field">
    <label for="secret" class="label">{$t("user.login.label-secret")}</label>
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

  <button type="submit" class="button primary m"
    >{$t("user.welcome.button-submit")}</button
  >
</form>

<style lang="postcss">
  form {
    --flow-max-width: 40rem;
  }
</style>
