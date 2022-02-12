<script lang="ts">
  import { t } from "svelte-intl-precompile";
  import type { PublicProvider } from "vanellus";
  import IconAccessibility from "~icons/carbon/accessibility";

  export let provider: PublicProvider;
</script>

<article>
  <div>
    <h2 class="h4">{provider.name}</h2>

    <address>
      {provider.street}, {provider.zipCode}
      {provider.city}
    </address>
  </div>

  {#if provider.accessible}
    <IconAccessibility aria-label={$t("user.provider-card.accessibility")} />
  {/if}
</article>

<style lang="postcss">
  article {
    border: 2px solid var(--color-black);
    border-radius: var(--radius-l);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    &:hover {
      box-shadow: var(--shadow-highlight);
      border: 2px solid var(--color-highlight);
    }
  }
</style>
