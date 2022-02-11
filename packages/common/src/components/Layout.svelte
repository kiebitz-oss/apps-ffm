<script lang="ts" context="module">
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { locale, locales } from "svelte-intl-precompile";
  import MenuIcon from "~icons/carbon/menu";
  import { theme } from "../theme";
</script>

<script lang="ts">
  let open = false;

  afterNavigate(() => {
    open = false;
  });
</script>

<div id="page">
  <header class="navbar">
    <div><a href="/"><img src={theme.logoUrl} alt="logo" /></a></div>

    <button
      on:click={() => {
        open = !open;
      }}
    >
      <MenuIcon />
    </button>

    <nav class:open aria-label="Hauptnavigation">
      <slot name="nav" />
    </nav>
  </header>

  <slot />

  <footer class="hidden gap-8 sm:flex sm:p-8 md:p-16">
    <div class="flex flex-col gap-10 sm:flex-[1] sm:gap-8 ">
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
    <section
      class="hidden flex-col gap-4 items-center mt-auto mb-8 sm:flex sm:flex-[1] sm:justify-center sm:my-0 xl:flex-[2]"
    />
  </footer>
</div>
