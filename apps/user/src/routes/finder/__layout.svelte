<script lang="ts" type="context">
  import { goto } from "$app/navigation";
  import { booking } from "$lib/stores";

  if ($booking) {
    goto("/status");
  }
</script>

<slot />
