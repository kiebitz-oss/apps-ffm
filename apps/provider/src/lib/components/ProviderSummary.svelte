<script lang="ts">
  import { t } from "svelte-intl-precompile";
  import type { ProviderInput } from "vanellus";

  export let provider: ProviderInput;

  const verified = false;
</script>

<div class:provider-data={true} class:verified>
  <dl>
    <dt>
      {$t("provider.provider-data.name")}
    </dt>
    <dd>{provider.name}</dd>

    <dt>
      {$t("provider.provider-data.street")}
    </dt>
    <dd>{provider.street}</dd>

    <dt>
      {$t("provider.provider-data.zip-code")}
    </dt>
    <dd>{provider.zipCode}</dd>

    <dt>
      {$t("provider.provider-data.city")}
    </dt>
    <dd>{provider.city}</dd>

    <dt>
      {$t("provider.provider-data.website")}
    </dt>
    <dd>
      {provider.website || $t("provider.provider-data.not-given")}
    </dd>

    <dt>
      {$t("provider.provider-data.description")}
    </dt>
    <dd>
      {provider.description || $t("provider.provider-data.not-given")}
    </dd>

    <dt>
      {$t("provider.provider-data.email")}
    </dt>
    <dd>
      {provider.email || $t("provider.provider-data.not-given")}
    </dd>

    <dt>
      {$t("provider.provider-data.accessible")}
    </dt>
    <dd>
      {provider.accessible
        ? $t("provider.provider-data.accessible-yes")
        : $t("provider.provider-data.accessible-no")}
    </dd>
  </dl>
</div>
