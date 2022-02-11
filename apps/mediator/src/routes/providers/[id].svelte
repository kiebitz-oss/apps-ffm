<script lang="ts">
  import { page } from "$app/stores";
  import { confirmProvider, getProvider } from "$lib/api";
  import {
    addNotification,
    Content,
    Loading,
    Page,
    PageHeader,
  } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import { decodeBase64url, ProviderStatus, type Provider } from "vanellus";

  const id = decodeBase64url($page.params.id);

  let provider = getProvider(id);

  const handleConfirm = async (unverifiedProvider: Provider) => {
    if (confirm($t("mediator.providers.details.confirm-question"))) {
      await confirmProvider(unverifiedProvider)
        .then(() => {
          return addNotification(
            $t("mediator.providers.details.notification.success")
          );
        })
        .catch((error) => {
          console.error(error);
          addNotification($t("mediator.providers.details.notification.error"));
        });

      provider = getProvider(id);
    }
  };
</script>

<Page title={$t("mediator.providers.details.page-title")}>
  <Content class="stack-v gap-l">
    {#await provider}
      <Loading />
    {:then { status, unverifiedProvider, verifiedProvider }}
      {@const doHandleConfirm = () => handleConfirm(unverifiedProvider)}

      <PageHeader>
        <h1 class="h1 w-full">
          {$t("mediator.providers.details.provider")} "{unverifiedProvider.name}"
          <small class="badge">{status}</small>
        </h1>

        <a href="/" slot="backLink" class="back-link"
          >{$t("mediator.providers.details.back-link")}</a
        >
      </PageHeader>

      <div class:provider-data={true}>
        <dl>
          <dt>
            {$t("mediator.providers.show.name")}
          </dt>
          <dd>{unverifiedProvider.name}</dd>

          <dt>
            {$t("mediator.providers.show.street")}
          </dt>
          <dd>{unverifiedProvider.street}</dd>

          <dt>
            {$t("mediator.providers.show.zip-code")}
          </dt>
          <dd>{unverifiedProvider.zipCode}</dd>

          <dt>
            {$t("mediator.providers.show.city")}
          </dt>
          <dd>{unverifiedProvider.city}</dd>

          <dt>
            {$t("mediator.providers.show.website")}
          </dt>
          <dd>
            {unverifiedProvider.website ||
              $t("mediator.providers.show.not-given")}
          </dd>

          <dt>
            {$t("mediator.providers.show.description")}
          </dt>
          <dd>
            {unverifiedProvider.description ||
              $t("mediator.providers.show.not-given")}
          </dd>

          <dt>
            {$t("mediator.providers.show.email")}
          </dt>
          <dd>
            {unverifiedProvider.email ||
              $t("mediator.providers.show.not-given")}
          </dd>

          <dt>
            {$t("mediator.providers.show.accessible")}
          </dt>
          <dd>
            {unverifiedProvider.accessible
              ? $t("mediator.providers.show.accessible-yes")
              : $t("mediator.providers.show.accessible-no")}
          </dd>
        </dl>
      </div>

      {#if status !== ProviderStatus.VERIFIED}
        <button
          class="button primary m"
          on:click|preventDefault={doHandleConfirm}
          >{$t("mediator.providers.show.button-confirm")}</button
        >
      {/if}
    {:catch error}
      <p class="error">{error}</p>
    {/await}
  </Content>
</Page>
