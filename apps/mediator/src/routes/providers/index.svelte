<script lang="ts">
  import { goto } from "$app/navigation";
  import { getPendingProviders, getVerifiedProviders } from "$lib/api";
  import { keyPairs } from "$lib/stores";
  import { Loading, PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { Provider } from "vanellus";
  import { encodeBase64url } from "vanellus";

  $: if (!$keyPairs) {
    goto("/");
  }

  let unverified = true;
  let providersPromise: Promise<Provider[]>;

  $: providersPromise = unverified
    ? getPendingProviders()
    : getVerifiedProviders();
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
      on:click={(e) => {
        e.preventDefault();
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
      on:click={(e) => {
        e.preventDefault();
        unverified = false;
      }}
    >
      {$t("mediator.providers.button.verified-providers")}
    </a>
  </div>
</PageHeader>

{#await providersPromise}
  <Loading />
{:then providers}
  <table id="providers-list" class="table striped">
    <caption class="sr-only">
      {$t("mediator.providers.index.table.caption")}
    </caption>

    <thead>
      <tr>
        <th scope="col">{$t("mediator.providers.index.table.head.name")}</th>
        <th scope="col">{$t("mediator.providers.index.table.head.adress")}</th>
        <!-- <th scope="col">{$t("mediator.providers.index.table.head.status")}</th> -->
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
            <a href={link} class:text-l={true}>
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

          <!-- <td>
              <Tag variant={provider.verified ? "success" : "warning"}>
                {provider.verified ? (
                  <Trans id="mediator.provider-row.valid">bestätigt</Trans>
                ) : (
                  <Trans id="mediator.provider-row.invalid">unbestätigt</Trans>
                )}
              </Tag>
            </td>  -->

          <td class:actions={true}>
            <a href={link} class="button tertiary s">
              {$t("mediator.providers.index.table.row.show-details")}
            </a>
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="4" class="font-medium text-center">
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
