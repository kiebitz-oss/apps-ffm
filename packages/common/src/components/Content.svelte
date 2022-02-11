<script lang="ts">
  import Notifications from "./Notifications.svelte";

  export let size: "s" | "m" | "l" | "" = "";
</script>

<div class:content={true} class={size} {...$$restProps}>
  <Notifications />

  <slot />
</div>
