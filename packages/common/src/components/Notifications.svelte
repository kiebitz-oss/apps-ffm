<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { notifications } from "../stores/notification";
  import Notification from "./Notification.svelte";

  afterNavigate(() => {
    if ($notifications) {
      notifications.set(null);
    }
  });

  notifications.subscribe((m) => {
    if (m) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
</script>

{#if $notifications?.message}
  <Notification
    type={$notifications.type}
    on:close={() => notifications.set(null)}
    >{$notifications.message}</Notification
  >
{/if}
