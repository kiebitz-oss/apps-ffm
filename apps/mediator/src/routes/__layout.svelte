<script lang="ts" context="module">
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
</script>

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
