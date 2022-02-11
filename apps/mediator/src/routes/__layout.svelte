<script lang="ts" context="module">
  import { keyPairs } from "$lib/stores";
  import de from "$locales/de";
  import en from "$locales/en";
  import { Layout, NavLink } from "@impfen/common";
  import { addMessages, init, t } from "svelte-intl-precompile";
  import LogoutIcon from "~icons/carbon/logout";
  import SettingsIcon from "~icons/carbon/settings";

  addMessages("de", de);
  addMessages("en", en);

  init({
    initialLocale: "de",
    fallbackLocale: "de",
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
