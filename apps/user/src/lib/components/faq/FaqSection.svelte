<script lang="ts">
  export let title: string;
</script>

<section {...$$restProps}>
  <h2 class="h3 section mb-5 text-lg font-semibold tracking-wider uppercase">
    {title}
  </h2>

  <div class="faq-questions flex flex-col px-8 md:gap-10 md:px-0 md:ml-6">
    <slot />
  </div>
</section>

<style lange="postcss">
  section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  h2 {
    font-weight: 500;
    font-size: 1.25rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-left: 1rem;
  }
</style>
