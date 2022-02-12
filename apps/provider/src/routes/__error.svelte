<script lang="ts" context="module">
  import { dev } from "$app/env";
  import type { ErrorLoad } from "@sveltejs/kit";

  export const load: ErrorLoad = ({ error, status }) => {
    return {
      props: { error, status },
    };
  };
</script>

<script lang="ts">
  export let error: Error;
  export let status: number;
</script>

<h1 class="h1">{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
