<script lang="ts" context="module">
  import { isVerified } from "$lib/api";
  import { keyPairs, verified } from "$lib/stores";
  import de from "$locales/de";
  import en from "$locales/en";
  import {
    addNotification,
    Layout,
    NavLink,
    NotificationType,
  } from "@impfen/common";
  import { addMessages, init, t } from "svelte-intl-precompile";
  import CalendarIcon from "~icons/carbon/calendar";
  import LoginIcon from "~icons/carbon/login";
  import LogoutIcon from "~icons/carbon/logout";
  import SettingsIcon from "~icons/carbon/settings";

  addMessages("de", de);
  addMessages("en", en);

  init({
    initialLocale: "de",
    fallbackLocale: "de",
  });
</script>

<script lang="ts">
  let firstRun = true;

  const runEveryXseconds = 5;

  const checkVerified = () => {
    isVerified()
      .then((isVerified) => {
        if (!isVerified) {
          setTimeout(() => {
            checkVerified();
          }, runEveryXseconds * 1000);
        } else {
          verified.set(isVerified);

          if (!firstRun) {
            addNotification(
              $t("provider.global.notification.verified"),
              NotificationType.SUCCESS
            );
          }
        }

        firstRun = false;

        return isVerified;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  $: if ($keyPairs) {
    checkVerified();
  }
</script>

<Layout>
  <svelte:fragment slot="nav">
    {#if $keyPairs}
      {#if $verified}
        <NavLink href="/schedule"
          ><CalendarIcon aria-hidden />{$t("provider.nav.schedule")}</NavLink
        >
      {/if}
      <NavLink href="/account"
        ><SettingsIcon aria-hidden />{$t("provider.nav.account")}</NavLink
      >
      <NavLink href="/logout"
        ><LogoutIcon aria-hidden />{$t("provider.nav.logout")}</NavLink
      >
    {:else}
      <NavLink href="/onboarding"
        ><SettingsIcon aria-hidden />{$t("provider.nav.onboarding")}</NavLink
      >
      <NavLink href="/" exact
        ><LoginIcon aria-hidden />{$t("provider.nav.login")}</NavLink
      >
    {/if}
  </svelte:fragment>

  <slot />
</Layout>
