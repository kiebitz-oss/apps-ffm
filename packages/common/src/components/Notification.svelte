<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import CloseIcon from "~icons/carbon/close";
  import { NotificationType } from "../stores";

  export let type: NotificationType = NotificationType.SUCCESS;

  const dispatch = createEventDispatcher<{ close: never }>();
</script>

<div
  role="status"
  aria-atomic="true"
  aria-live="polite"
  {...$$restProps}
  class:notification={true}
  class:warning={type === NotificationType.WARNING}
  class:info={type === NotificationType.INFO}
  class:danger={type === NotificationType.DANGER}
  class:success={type === NotificationType.SUCCESS}
  transition:fade={{ duration: 250 }}
>
  <p>
    <slot />
  </p>

  <button
    type="button"
    aria-label="Schließen"
    on:click={() => dispatch("close")}
  >
    <CloseIcon class="close-icon" aria-hidden focusable={false} />
  </button>
</div>
