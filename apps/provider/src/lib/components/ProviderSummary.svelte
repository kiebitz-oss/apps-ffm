<script lang="ts">
  import { t } from "svelte-intl-precompile";
  import type { CreateProviderInput } from "vanellus";

  export let provider: CreateProviderInput;

  const verified = false;
</script>

<div class:provider-data={true} class:verified>
  <dl>
    <dt>
      {$t("provider.provider-data.name.label")}
    </dt>
    <dd>{provider?.name}</dd>

    <dt>
      {$t("provider.provider-data.street")}
      {$t("provider.provider-data.street.label")}
    </dt>
    <dd>{provider?.street}</dd>

    <dt>
      {$t("provider.provider-data.zip-code")}
    </dt>
    <dd>{provider?.zipCode}</dd>

    <dt>
      {$t("provider.provider-data.city.label")}
    </dt>
    <dd>{provider?.city}</dd>

    <dt>
      {$t("provider.provider-data.website.label")}
    </dt>
    <dd>
      {provider?.website || $t("provider.provider-data.not-given")}
    </dd>

    <dt>
      {$t("provider.provider-data.description.label")}
    </dt>
    <dd>
      {provider?.description || $t("provider.provider-data.not-given")}
    </dd>

    <dt>
      {$t("provider.provider-data.email.label")}
    </dt>
    <dd>
      {provider?.email || $t("provider.provider-data.not-given")}
    </dd>

    <dt>
      {$t("provider.provider-data.accessible")}
    </dt>
    <dd>
      {provider?.accessible
        ? $t("provider.provider-data.accessible-yes")
        : $t("provider.provider-data.accessible-no")}
    </dd>
  </dl>
</div>
