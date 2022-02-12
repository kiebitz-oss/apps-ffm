<div id="page-header">
  <slot name="backLink" />

  {#if $$slots.actions}
    <div class="actions">
      <slot />
      <slot name="actions" />
    </div>
  {:else}
    <div class="actions">
      <slot />
    </div>
  {/if}

  <slot name="intro" />
</div>
