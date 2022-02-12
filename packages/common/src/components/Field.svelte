<script lang="ts">
  export let name: string;
  export let label: string | undefined = undefined;
  export let description = "";
  export let required = false;
  export let inline = false;
</script>

<div class:field={true} class:inline class:required>
  <slot name="label"
    >{#if label}<label class="label" for={name}>{label}</label>{/if}</slot
  >
  <slot id={name} class="input" {required} />
  <slot name="description"><small>{description}</small></slot>
</div>
