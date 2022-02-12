<script lang="ts">
  import { currentLink } from "../actions/currentLink";

  export let href: string;
  // export let exact: boolean = false;
</script>

<a use:currentLink class:link={true} {href} {...$$restProps}><slot /></a>
