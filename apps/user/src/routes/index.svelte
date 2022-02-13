<script lang="ts" context="module">
  import { Questionaire } from "$lib/components";
  import BookingStatus from "$lib/components/status/BookingStatus.svelte";
  import { booking } from "$lib/stores";
  import { PageHeader } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
</script>

<svelte:head><title>{$t("user.welcome.page-title")}</title></svelte:head>

<article>
  {#if $booking}
    <BookingStatus booking={$booking} />
  {:else}
    <PageHeader>
      <h1 class="h1">{$t("user.welcome.title")}</h1>
    </PageHeader>

    <p class="text-1">
      {$t("user.welcome.intro-1")}
    </p>

    <p class="text-1" id="questionaire-intro">
      {$t("user.welcome.intro-2")}
    </p>

    <Questionaire />
  {/if}
</article>

<style lang="postcss">
  article {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 40rem;
  }
</style>
