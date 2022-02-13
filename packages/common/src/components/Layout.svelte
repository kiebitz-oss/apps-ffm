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
  <div id="logo"><a href="/"><img src={theme.logoUrl} alt="logo" /></a></div>

  <button
    on:click={() => {
      open = !open;
    }}
  >
    <MenuIcon id="hamburger" />
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
        <h3 class="h4">Informationen</h3>
        <slot name="nav" />
      </section>
    {/if}

    <section>
      <h3 class="h4">Sprache</h3>

      <ul>
        {#each $locales as loc}
          <li>
            <a
              href={$page.url.pathname}
              hreflang={$locale}
              class="link m"
              aria-current={loc === $locale && "current" ? "page" : undefined}
              on:click={() => ($locale = loc)}
              >{loc === "de" ? "Deutsch" : "English"}</a
            >
          </li>
        {/each}
      </ul>
    </section>
  </div>

  <section class="sm:flex-[1]">
    <ul>
      <li><a class="link md" href="/imprint/">Impressum</a></li>
      <li><a class="link md" href="/privacy/">Datenschutz</a></li>
      <li>
        <a
          class="link md"
          rel="noreferrer"
          target="_blank"
          href="https://github.com/impfen">Github</a
        >
      </li>
      <li>
        <a
          class="link md"
          rel="noreferrer"
          target="_blank"
          href="https://kiebitz.eu/">Realisiert mit Kiebitz</a
        >
      </li>
    </ul>
  </section>
  <section />
</footer>
