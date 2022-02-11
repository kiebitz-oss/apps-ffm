<script lang="ts">
  import { NotificationType } from "../stores";

  export let type: NotificationType = NotificationType.SUCCESS;

  // export let notification: Notification;
  // const typeClass = `type-${type}`;
</script>

<div
  role="status"
  aria-live="polite"
  class:notification={true}
  class:warning={type === NotificationType.WARNING}
  class:info={type === NotificationType.INFO}
  class:danger={type === NotificationType.DANGER}
  class:success={type === NotificationType.SUCCESS}
>
  <slot />
</div>

<style lang="postcss">
  :where(.notification) {
    padding: 1rem;
    border: 1px solid transparent;

    &.warning {
      background-color: var(--orange-2);
      color: var(--orange-9);
      border-color: var(--orange-9);
    }

    &.info {
      background-color: var(--blue-2);
      color: var(--blue-9);
      border-color: var(--blue-9);
    }

    &.danger {
      background-color: var(--red-2, #fca4a4);
      color: var(--red-9, red);
      border-color: var(--red-9, darkred);
    }

    &.success {
      background-color: var(--green-2, lightgreen);
      color: var(--green-9, darkgreen);
      border-color: var(--green-9, darkgreen);
    }
  }
</style>
