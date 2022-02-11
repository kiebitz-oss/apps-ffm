<script lang="ts">
  import { t } from "svelte-intl-precompile";
  import type { PublicProvider } from "vanellus";
  import IconAccessibility from "~icons/carbon/accessibility";

  export let provider: PublicProvider;
</script>

<article class="provider-card">
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
