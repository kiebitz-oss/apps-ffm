<script lang="ts">
  export let title: string;
</script>

<section class="faq-section flex flex-col mb-16" {...$$restProps}>
  <h2 class="h3 section mb-5 text-lg font-semibold tracking-wider uppercase">
    {title}
  </h2>

  <div class="faq-questions flex flex-col px-8 md:gap-10 md:px-0 md:ml-6">
    <slot />
  </div>
</section>
