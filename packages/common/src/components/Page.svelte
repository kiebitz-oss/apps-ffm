<script lang="ts" context="module">
  /** eslint-disable @typescript-eslint/no-unsafe-call */
  /** eslint-disable @typescript-eslint/no-unsafe-call */

  import { supportedBrowsers } from "@impfen/browserslist-config/supported-browsers";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import { locale } from "svelte-intl-precompile";
  import { theme } from "../theme";

  dayjs.extend(utc);

  // stupid hack to make ts happy...
  const forcedSupportedBrowsers: string = (supportedBrowsers as string) || "";

  // if (browser && !forcedSupportedBrowsers.test(navigator.userAgent)) {
  //   alert("Your browser is supported.");
  // }
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
