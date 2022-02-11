<script lang="ts">
  interface $$Props extends HTMLInputElement {
    name: string;
    error: string | undefined;
    hint: string | undefined;
  }

  export let name: string;
  export let hint: string | undefined = undefined;

  let error: string | undefined = undefined;
  let ref: HTMLInputElement;

  const handleBlur: svelte.JSX.EventHandler<FocusEvent, HTMLInputElement> = (
    event
  ) => {
    if (event.currentTarget.checkValidity()) {
      error = undefined;
    } else {
      error = ref?.validationMessage;
    }
  };
</script>

<input
  type="text"
  placeholder={error ? undefined : " "}
  {...$$restProps}
  on:blur={handleBlur}
  bind:this={ref}
  aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
/>

<slot id="error">
  {#if error}
    <div id={`${name}-error`} class="error" aria-live="polite">{error}</div>
  {/if}
</slot>

<slot id="hint">
  {#if !error && hint}
    <small id={`${name}-hint`} class="hint">{hint}</small>
  {/if}
</slot>

<style lang="postcss">
  input {
    margin-block-end: 2px;
  }

  .error,
  .hint {
    font-size: smaller;
  }
</style>
