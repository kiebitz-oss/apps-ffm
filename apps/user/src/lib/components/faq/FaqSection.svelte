<script lang="ts">
  export let title: string;
</script>

<section class="faq-section" {...$$restProps}>
  <h2 class="h3">
    {title}
  </h2>

  <div class="faq-questions">
    <slot />
  </div>
</section>

<style lange="postcss">
  .faq-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  h2,
  .faq-section :global(h3),
  .faq-section :global(h4) {
    font-weight: 500;
    font-size: 1.25rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .faq-section :global(h3) {
    margin-top: 2rem;
    font-size: 1.125rem;
  }

  .faq-section :global(h4) {
    font-size: 1rem;
  }

  .faq-section :global(h3),
  .faq-section :global(h4),
  .faq-section :global(p) {
    margin-bottom: 1rem;
  }

  .faq-section :global(p) {
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  .faq-section :global(ul) {
    list-style-position: inside;
    margin-bottom: 1.5rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-left: 1rem;
  }
</style>
