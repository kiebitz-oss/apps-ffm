<script lang="ts" context="module">
  import { getProviders } from "$lib/api";
  import { PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { MediatorProviderView } from "vanellus";
  import { encodeBase64url, ProviderStatus } from "vanellus";
</script>

<script lang="ts">
  let unverified = true;
  let providersPromise: Promise<MediatorProviderView[]>;

  $: providersPromise = getProviders();
</script>

<svelte:head>
  <title>{$t("mediator.providers.index.page-title")}</title>
</svelte:head>

<PageHeader>
  <h1 class="h1">{$t("mediator.providers.index.title")}</h1>

  <div>
    <a
      class="button s"
      class:primary={unverified === true}
      class:secondary={unverified === false}
      href="/providers/"
      on:click|preventDefault={() => {
        unverified = true;
      }}
    >
      {$t("mediator.providers.button.unverified-providers")}
    </a>
    <a
      class="button s"
      class:primary={unverified === false}
      class:secondary={unverified === true}
      href="/providers/"
      on:click|preventDefault={() => {
        unverified = false;
      }}
    >
      {$t("mediator.providers.button.verified-providers")}
    </a>
  </div>
</PageHeader>

{#await providersPromise then providers}
  <table id="providers-list" class="table striped">
    <caption class="sr-only">
      {$t("mediator.providers.index.table.caption")}
    </caption>

    <thead>
      <tr>
        <th scope="col">{$t("mediator.providers.index.table.head.name")}</th>
        <th scope="col">{$t("mediator.providers.index.table.head.adress")}</th>
        <th scope="col">{$t("mediator.providers.index.table.head.status")}</th>
        <th scope="col">
          <span class="sr-only"
            >{$t("mediator.providers.index.table.head.actions")}</span
          >
        </th>
      </tr>
    </thead>

    <tbody>
      {#each providers as provider, id}
        {@const link = `/providers/${encodeBase64url(provider.id)}`}

        <tr>
          <th scope="row" id={`provider-${id}`}>
            <a href={link} class="link">
              {provider.name}
            </a>
          </th>

          <td>
            <address>
              {provider.street}
              <br />
              {provider.zipCode}
              {provider.city}
            </address>
          </td>

          <td>
            <small
              class:tag={true}
              class:warning={provider.status === ProviderStatus.UNVERIFIED}
              class:info={provider.status !== ProviderStatus.UNVERIFIED}
            >
              {#if provider.status !== ProviderStatus.UNVERIFIED}
                {$t("mediator.provider-row.valid")}
              {:else}
                {$t("mediator.provider-row.invalid")}
              {/if}
            </small>
          </td>

          <td class:actions={true}>
            <a href={link} class="button tertiary s">
              {$t("mediator.providers.index.table.row.show-details")}
            </a>
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="4" class="notice">
            {$t("mediator.providers.index.table.row.no-data")}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:catch error}
  <p class="error">
    {error.message}
  </p>
{/await}

<style lang="postcss">
  .actions {
    text-align: right;
    vertical-align: middle;
  }
</style>
