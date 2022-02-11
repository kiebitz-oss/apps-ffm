<script lang="ts">
  import { goto } from "$app/navigation";
  import { login } from "$lib/api";
  import { keyPairs } from "$lib/stores";
  import {
    addNotification,
    Content,
    NotificationType,
    Page,
  } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { MediatorKeyPairs } from "vanellus";

  let files: FileList;
  let isValid: boolean;
  let uploadedKeyPairs: MediatorKeyPairs;

  const handleSubmit: svelte.JSX.EventHandler<
    SubmitEvent,
    HTMLFormElement
  > = () => {
    if (files[0]) {
      const reader = new FileReader();

      reader.addEventListener("loadend", () => {
        try {
          uploadedKeyPairs = JSON.parse(
            reader.result.toString()
          ) as MediatorKeyPairs;
        } catch (error) {
          isValid = false;
          addNotification("JSON-ERROR...");
          console.error(error);
        }

        try {
          login(uploadedKeyPairs);

          goto("/providers").catch((error) => {
            console.error(error);
          });

          addNotification("Welcome back..", NotificationType.SUCCESS);
        } catch (error) {
          isValid = false;
          addNotification("ERROR...");
          console.error(error);
        }
      });

      reader.readAsBinaryString(files[0]);
    } else {
      isValid = false;
    }
  };

  $: if ($keyPairs) {
    goto("/providers").catch((error) => {
      console.error(error);
    });
  }
</script>

<Page title={$t("mediator.welcome.page-title")}>
  <Content class="m stack-v gap-m">
    <h1>{$t("mediator.welcome.title")}</h1>

    <p class="text-2">{$t("mediator.welcome.intro")}</p>

    <form
      name="login"
      on:submit|preventDefault={handleSubmit}
      class="stack-v gap-m"
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
  </Content>
</Page>
