<script lang="ts" context="module">
  import { browser } from "$app/env";
  import { supportedBrowsers } from "@impfen/browserslist-config/supported-browsers";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import { locale } from "svelte-intl-precompile";
  import { theme } from "../theme";

  dayjs.extend(utc);

  if (browser && !supportedBrowsers.test(navigator.userAgent)) {
    alert("Your browser is supported.");
  }
</script>

<script lang="ts">
  export let title: string;

  export const lang = "en";
  export const dir = "ltr";

  locale.subscribe((l) => {
    dayjs.locale(l);
  });
</script>

<svelte:head>
  <html {lang} {dir} />

  {#if title}
    <title>{title} - {theme.title}</title>
  {:else}
    <title>{theme.title}</title>
  {/if}
</svelte:head>

<main {...$$restProps}><slot /></main>
