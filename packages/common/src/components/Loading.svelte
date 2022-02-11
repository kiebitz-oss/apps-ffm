<script lang="ts">
  import { onMount } from "svelte";

  let show = false;

  onMount(() => {
    setTimeout(() => {
      show = true;
    }, 250);
  });
</script>

{#if show}
  <div aria-busy>Loading...</div>
{/if}
