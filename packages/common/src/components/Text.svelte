<script lang="ts">
  type TextVariants = "book" | "text-1" | "text-2";

  interface $$Props extends HTMLParagraphElement {
    variant: TextVariants | undefined;
  }

  export let variant: TextVariants | undefined = undefined;
</script>

<p class:text={true} class:variant {...$$restProps}><slot /></p>
