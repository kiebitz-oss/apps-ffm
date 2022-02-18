<script lang="ts" context="module">
  import { browser, dev } from "$app/env";
  import { booking } from "$lib/stores";
  import de from "$locales/de";
  import { Layout, NavLink } from "@impfen/common";
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
  import HelpIcon from "~icons/carbon/help";
  import LoginIcon from "~icons/carbon/login";
  import LogoutIcon from "~icons/carbon/logout";

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localeData);

  addMessages("de", de);
  register("en", () => import("$locales/en"));

  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
  // https://w3c.github.io/beacon/#sendbeacon-method
  const handleErrors = (event) => {
    // try {
    const { message, filename, lineno, colno, error } = event;
    const body = { message, filename, lineno, colno, error };
    const beaconUrl = "https://beacon.dev-cd.impfterm.in/response";

    if (browser) {
      if (dev) {
        console.log("[beacon]", JSON.stringify(body, null, 2));
      }

      const blob = new Blob(
        [new URLSearchParams(JSON.stringify(body)).toString()],
        {
          // This content type is necessary for `sendBeacon`:
          type: "application/x-www-form-urlencoded",
        }
      );

      if (navigator.sendBeacon) {
        navigator.sendBeacon(beaconUrl, blob);
      } else
        fetch(beaconUrl, {
          body: blob,
          method: "POST",
          credentials: "omit",
          keepalive: true,
        });
    }
    // } catch (error) {
    //   console.error(error);
    // }
  };
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
</script>

<svelte:window on:error={handleErrors} on:unhandledrejection={handleErrors} />

<Layout>
  <svelte:fragment slot="nav">
    {#if $booking}
      <NavLink href="/status"
        ><CalendarIcon aria-hidden />{$t("user.menu.booking-status")}</NavLink
      >
    {:else}
      <NavLink href="/finder"
        ><CalendarIcon aria-hidden />{$t("user.menu.book-appointment")}</NavLink
      >
    {/if}
    <NavLink href="/faq"><HelpIcon aria-hidden />{$t("user.menu.faq")}</NavLink>
    {#if $booking}
      <NavLink href="/logout"
        ><LogoutIcon aria-hidden />{$t("user.menu.logout")}</NavLink
      >
    {:else}
      <NavLink href="/login"
        ><LoginIcon aria-hidden />{$t("user.menu.booking-status")}</NavLink
      >
    {/if}
  </svelte:fragment>

  <slot />
</Layout>
