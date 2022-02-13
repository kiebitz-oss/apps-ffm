<script lang="ts" type="context">
  import { browser } from "$app/env";
  import { goto } from "$app/navigation";
  import { keyPairs } from "$lib/stores";

  if (!$keyPairs) {
    if (browser) {
      goto("/");
    }
  }
</script>

<slot />
