<script lang="ts" context="module">
  /** eslint-disable @typescript-eslint/no-unsafe-call */
  /** eslint-disable @typescript-eslint/no-unsafe-call */

  import { browser } from "$app/env";
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { supportedBrowsers } from "@impfen/browserslist-config/supported-browsers";
  import { locale, locales } from "svelte-intl-precompile";
  import MenuIcon from "~icons/carbon/menu";
  import { theme } from "../theme";
  import Notifications from "./Notifications.svelte";

  // stupid hack to make ts happy...
  if (
    browser &&
    !((supportedBrowsers as RegExp) || /.*/).test(navigator.userAgent)
  ) {
    alert("Your browser is supported.");
  }
</script>

<script lang="ts">
  export let title = "de";
  export let lang = "en";
  export let dir = "ltr";

  let open = false;

  afterNavigate(() => {
    open = false;
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

<header id="navbar">
  <div id="logo">
    <a href="/"><img src={theme.logoUrl} alt={theme.logoAlt} /></a>
  </div>

  <button
    on:click={() => {
      open = !open;
    }}
    aria-label="Navigation öffnen"
  >
    <MenuIcon id="hamburger" aria-hidden />
  </button>

  <nav class:open aria-label="Hauptnavigation">
    <slot name="nav" />
  </nav>
</header>

<main id="content" class="content flow">
  <Notifications />

  <slot />
</main>

<footer id="footer">
  <div>
    {#if $$slots.nav}
      <section>
        <strong class="h4">Informationen</strong>
        <slot name="nav" />
      </section>
    {/if}

    <section>
      <strong class="h4">Sprache</strong>

      <ul>
        {#each $locales as loc}
          <li>
            <a
              href={$page.url.pathname}
              hreflang={$locale}
              class="link"
              aria-current={loc === $locale && "current" ? "page" : undefined}
              on:click={() => ($locale = loc)}
              >{loc === "de" ? "Deutsch" : "English"}</a
            >
          </li>
        {/each}
      </ul>
    </section>
  </div>

  <section>
    <ul>
      <li><a class="link" href="/imprint/">Impressum</a></li>
      <li>
        <a
          class="link"
          href="https://frankfurt.de/service-und-rathaus/verwaltung/aemter-und-institutionen/gesundheitsamt/informationen-zum-neuartigen-coronavirus-sars-cov-2/datenschutz-information-des-gesundheitsamtes"
          rel="noreferrer">Datenschutz</a
        >
      </li>

      <li>
        <a
          class="link"
          rel="noreferrer"
          target="_blank"
          href="https://github.com/impfen">Github</a
        >
      </li>
      <li>
        <a
          class="link"
          rel="noreferrer"
          target="_blank"
          href="https://kiebitz.eu/">Realisiert mit Kiebitz</a
        >
      </li>
    </ul>
  </section>
  <section />
</footer>
