<script lang="ts">
  import { backup } from "$lib/api";
  import dayjs from "dayjs";

  export let providerName: string;

  let isValid: boolean;
  let sanitizedProviderName = "";

  try {
    sanitizedProviderName = providerName
      .replace(/[^a-z\d-]/gi, "") // remove every special char
      .replace(/\s+/g, "-") // remove every whitespace
      .toLowerCase();
  } catch (error) {
    console.error(error);
  }

  const formattedDate = dayjs().format("YYYY-MM-DD-HH-mm");

  const filename =
    `backup-${formattedDate}-${sanitizedProviderName}.enc`.toLowerCase();

  let download: string;

  backup()
    .then((backupData) => {
      download = URL.createObjectURL(
        new Blob([new TextEncoder().encode(JSON.stringify(backupData))], {
          type: "application/octet-stream",
        })
      );

      isValid = true;

      return download;
    })
    .catch((error) => {
      console.error(error);
      isValid = false;
    });
</script>

<a
  class="button secondary s"
  href={download}
  download={filename}
  disabled={!download || isValid !== true}
  on:click
  {...$$restProps}
>
  <slot />
</a>
