<script lang="ts">
  import { goto } from "$app/navigation";
  import { ProviderCard } from "$lib/components";
  import { provider } from "$lib/stores";
  import { t } from "svelte-intl-precompile";
  import type { PublicProvider } from "vanellus";

  export let providers: PublicProvider[];

  let filteredProviders: PublicProvider[] = [];
  let accessible = false;

  const handleAccessibleChange: svelte.JSX.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    accessible = !!event.currentTarget.checked;
  };

  const handleSelectProvider = async (
    chosenProvider: PublicProvider | true
  ) => {
    $provider = chosenProvider;
    await goto("/finder/appointment");
  };

  $: filteredProviders =
    Array.isArray(providers) && accessible === true
      ? providers.filter((provider) => provider.accessible === true)
      : providers;
</script>

<form id="providers-filter">
  <label class="label">
    <input
      type="checkbox"
      name="accessible"
      class="checkbox primary l"
      checked={accessible}
      on:change|preventDefault={handleAccessibleChange}
    />
    {$t("user.finder.location.accessible.label")}
  </label>
</form>

<ul
  id="providers-list"
  aria-label={$t("user.finder.location.providers-list.title")}
>
  <li aria-label={$t("user.finder.location.any-provider")}>
    <a
      href="/finder/appointment"
      class="block"
      on:click={() => handleSelectProvider(true)}
    >
      <article class="provider-card">
        <h2 class="h4">
          {$t("user.finder.location.any-provider")}
        </h2>
      </article>
    </a>
  </li>

  {#each filteredProviders as provider, id (provider.id)}
    <li aria-label={provider.name}>
      <a
        href="/finder/appointment"
        class="block"
        on:click={() => handleSelectProvider(provider)}
      >
        <ProviderCard {provider} />
      </a>
    </li>
  {:else}
    <li>
      <p>{$t("user.finder.location.no-results")}</p>
    </li>
  {/each}
</ul>

<style lang="postcss">
  #providers-filter {
    margin: 0 2rem;
  }

  #providers-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style-type: none;
    padding-left: 0;
    max-width: 40rem;

    & a {
      color: var(--black);
      text-decoration: none;
    }
  }
</style>
