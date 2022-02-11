<div id="page-header">
  <slot name="backLink" />

  {#if $$slots.actions}
    <div class="stack-h">
      <slot />
      <slot name="actions" />
    </div>
  {:else}
    <slot />
  {/if}

  <slot name="intro" />
</div>
