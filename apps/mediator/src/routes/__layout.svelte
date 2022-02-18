<script lang="ts" context="module">
  import { browser, dev } from "$app/env";
  import { keyPairs } from "$lib/stores";
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
    init,
    locale,
    register,
    t,
  } from "svelte-intl-precompile";
  import LogoutIcon from "~icons/carbon/logout";
  import SettingsIcon from "~icons/carbon/settings";

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localeData);

  addMessages("de", de);
  register("en", () => import("$locales/en"));
</script>

<script lang="ts">
  init({
    initialLocale: "de",
    fallbackLocale: "de",
  });

  dayjs.locale("de");
  dayjs.tz.setDefault("Europe/Berlin");

  locale.subscribe((l) => {
    dayjs.locale(l);
  });

  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
  // https://w3c.github.io/beacon/#sendbeacon-method
  const handleErrors = (event) => {
    try {
      const { message, filename, lineno, colno, error } = event;
      const body = { message, filename, lineno, colno, error };
      const beaconUrl = import.meta.env.VITE_IMPFEN_BEACON_ENDPOINT as string;

      if (browser && beaconUrl) {
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
    } catch (error) {
      console.error(error);
    }
  };
</script>

<svelte:window on:error={handleErrors} on:unhandledrejection={handleErrors} />

<Layout>
  <svelte:fragment slot="nav">
    {#if $keyPairs}
      <NavLink href="/providers"
        ><SettingsIcon aria-hidden />{$t("mediator.nav.providers")}</NavLink
      >
      <NavLink href="/logout"
        ><LogoutIcon aria-hidden />{$t("mediator.nav.logout")}</NavLink
      >
    {/if}
  </svelte:fragment>

  <slot />
</Layout>
