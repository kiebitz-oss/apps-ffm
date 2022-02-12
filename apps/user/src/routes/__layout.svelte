<script lang="ts" context="module">
  import { booking } from "$lib/stores";
  // import de from "$locales/de";
  // import en from "$locales/en";
  import { Layout, NavLink } from "@impfen/common";
  import {
    getLocaleFromNavigator,
    init,
    register,
    t,
  } from "svelte-intl-precompile";
  import CalendarIcon from "~icons/carbon/calendar";
  import HelpIcon from "~icons/carbon/help";
  import LoginIcon from "~icons/carbon/login";
  import LogoutIcon from "~icons/carbon/logout";

  // addMessages("de", de);
  // addMessages("en", en);
  register("en", () => import("$locales/en"));
  register("de", () => import("$locales/de"));

  init({
    initialLocale: getLocaleFromNavigator(),
    fallbackLocale: "de",
  });
</script>

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
