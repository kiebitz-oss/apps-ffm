<script lang="ts" context="module">
  import { browser } from "$app/env";
  import { isVerified } from "$lib/api";
  import { keyPairs, verified } from "$lib/stores";
  import de from "$locales/de";
  import {
    addNotification,
    handleErrors,
    Layout,
    NavLink,
    NotificationType,
  } from "@impfen/common";
  import dayjs from "dayjs";
  import "dayjs/locale/de.js";
  import "dayjs/locale/en.js";
  import localeData from "dayjs/plugin/localeData.js";
  import timezone from "dayjs/plugin/timezone.js";
  import utc from "dayjs/plugin/utc.js";
  import {
    addMessages,
    getLocaleFromNavigator,
    init,
    locale,
    register,
    t,
  } from "svelte-intl-precompile";
  import CalendarIcon from "~icons/carbon/calendar";
  import LoginIcon from "~icons/carbon/login";
  import LogoutIcon from "~icons/carbon/logout";
  import SettingsIcon from "~icons/carbon/settings";

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localeData);

  addMessages("de", de);
  register("en", () => import("$locales/en"));
</script>

<script lang="ts">
  const defaultLocale = "de";

  const userLocale = getLocaleFromNavigator(defaultLocale).substring(0, 2);

  init({
    initialLocale:
      userLocale === "de" || userLocale === "en" ? userLocale : defaultLocale,
    fallbackLocale: defaultLocale,
  });

  dayjs.locale(defaultLocale);
  dayjs.tz.setDefault("Europe/Berlin");

  locale.subscribe((l) => {
    dayjs.locale(l);
  });

  let firstRun = true;

  const runEveryXseconds = 15;

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
    if (browser) {
      checkVerified();
    }
  }
</script>

<svelte:window on:error={handleErrors} on:unhandledrejection={handleErrors} />

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
