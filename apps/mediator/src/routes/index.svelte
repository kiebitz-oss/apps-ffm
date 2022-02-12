<script lang="ts">
  import { goto } from "$app/navigation";
  import { login } from "$lib/api";
  import { keyPairs } from "$lib/stores";
  import { addNotification, NotificationType } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { MediatorKeyPairs } from "vanellus";

  let files: FileList;
  let uploadedKeyPairs: MediatorKeyPairs;

  const handleSubmit: svelte.JSX.EventHandler<
    SubmitEvent,
    HTMLFormElement
  > = () => {
    if (files[0]) {
      const reader = new FileReader();

      reader.addEventListener("loadend", async () => {
        try {
          uploadedKeyPairs = JSON.parse(
            reader.result.toString()
          ) as MediatorKeyPairs;
        } catch (error) {
          addNotification("JSON-ERROR...");
          console.error(error);
        }

        try {
          await login(uploadedKeyPairs);

          await goto("/providers").catch((error) => {
            console.error(error);
          });

          addNotification(
            $t("mediator.welcome.login.notification.success"),
            NotificationType.SUCCESS
          );
        } catch (error) {
          addNotification(
            $t("mediator.welcome.login.notification.error"),
            NotificationType.DANGER
          );
          console.error(error);
        }
      });

      reader.readAsBinaryString(files[0]);
    }
  };

  $: if ($keyPairs) {
    goto("/providers").catch((error) => {
      console.error(error);
    });
  }
</script>

<svelte:head>
  <title>{$t("mediator.welcome.page-title")}</title>
</svelte:head>

<h1 class="h1">{$t("mediator.welcome.title")}</h1>

<p class="text-1">{$t("mediator.welcome.intro")}</p>

<form
  name="login"
  class="stack-v gap-m"
  on:submit|preventDefault={handleSubmit}
>
  <div class="field">
    <label for="keyPairs" class="label"
      >{$t("mediator.welcome.input-select-keypairs")}
    </label>
    <input id="keyPairs" type="file" name="keyPairs" required bind:files />
  </div>

  <button type="submit" class="button primary l">
    {$t("mediator.welcome.button-submit")}
  </button>
</form>

<style lang="postcss">
  :root {
    --flow-max-width: 40rem;
  }
</style>
