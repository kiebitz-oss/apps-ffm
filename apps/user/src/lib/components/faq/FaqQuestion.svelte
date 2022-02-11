<script lang="ts">
  export let question: string;
</script>

<details class="faq-question" {...$$restProps}>
  <summary class="mb-2 list-outside">
    <h4 class="inline text-lg font-semibold cursor-pointer md:text-2xl">
      {question}
    </h4>
  </summary>

  <slot />
</details>
