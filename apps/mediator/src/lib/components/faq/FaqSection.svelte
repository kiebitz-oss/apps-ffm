<script lang="ts">
  export let title: string;
</script>

<section {...$$restProps}>
  <h2 class="h3">
    {title}
  </h2>

  <div class="faq-questions">
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
