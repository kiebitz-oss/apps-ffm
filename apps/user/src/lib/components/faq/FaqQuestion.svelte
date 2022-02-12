<script lang="ts">
  export let question: string;
</script>

<details class="faq-question" {...$$restProps}>
  <summary>
    <strong>
      {question}
    </strong>
  </summary>

  <slot />
</details>

<style lang="postcss">
  details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  summary {
    list-style-position: outside;
    margin-bottom: 0.25rem;
    user-select: none;

    & > strong {
      display: inline;
      font-weight: 500;
      font-size: 1.1rem;
      letter-spacing: 0.05em;
      user-select: none;
    }
  }
</style>
