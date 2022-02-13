<script lang="ts" context="module">
  import { DownloadBackupDataButton, SecretBox } from "$lib/components";
  import { secret, unverifiedProvider } from "$lib/stores";
  import { PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<script lang="ts">
  const providerPromise = Promise.resolve($unverifiedProvider);
</script>

{#await providerPromise then provider}
  <section>
    <PageHeader>
      <h1 class="h1">{$t("provider.onboarding.backup.title")}</h1>
    </PageHeader>

    <p class="text-1">
      {$t("provider.onboarding.backup.intro")}
    </p>

    <div>
      <h2 class="book">{$t("provider.onboarding.backup.step-1")}</h2>
      <SecretBox secret={$secret} copy />
    </div>

    <div>
      <h2 class="book">{$t("provider.onboarding.backup.step-2")}</h2>
      <DownloadBackupDataButton
        providerName={provider.name}
        class="block secondary button m"
      >
        {$t("provider.onboarding.backup.download-keypairs")}
      </DownloadBackupDataButton>
    </div>

    <a href="/schedule" class="button primary m">
      {$t("provider.onboarding.backup.next")}
    </a>
  </section>
{/await}

<style lang="postcss">
  section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 40rem;
  }
</style>
