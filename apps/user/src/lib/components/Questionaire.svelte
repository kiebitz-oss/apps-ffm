<script lang="ts">
  import { goto } from "$app/navigation";
  import { vaccine } from "$lib/stores";
  import { t } from "svelte-intl-precompile";
  import { writable } from "svelte/store";
  import QuestionaireCard from "./QuestionaireCard.svelte";

  let valid = false;
  let error = false;

  const handleSubmit: svelte.JSX.EventHandler<
    SubmitEvent,
    HTMLFormElement
  > = async () => {
    if (valid) {
      await goto("/finder");
    } else {
      error = true;
    }
  };

  const q0Value = writable<string | undefined>();
  const q1Value = writable<boolean | undefined>();
  const q2Value = writable<boolean | undefined>();
  const q3Value = writable<boolean | undefined>();
  const q4Value = writable<boolean | undefined>();
  const q5Value = writable<boolean | undefined>();

  q1Value.subscribe(() => {
    $q2Value = undefined;
    $q3Value = undefined;
    $q4Value = undefined;
    $q5Value = undefined;
    $vaccine = undefined;
    error = false;
  });

  q2Value.subscribe(() => {
    $q3Value = undefined;
    $q4Value = undefined;
    $q5Value = undefined;
    $vaccine = undefined;
    error = false;
  });

  q3Value.subscribe(() => {
    $q4Value = undefined;
    $q5Value = undefined;
    $vaccine = undefined;
    error = false;
  });

  q4Value.subscribe((value) => {
    $q5Value = undefined;
    $vaccine = undefined;
    error = false;

    if (value === false) {
      $vaccine = "biontech";
    }
  });

  q5Value.subscribe((value) => {
    $vaccine = undefined;

    if (value === false) {
      $vaccine = "biontechchildren";
    }
  });

  $: valid =
    $q3Value === false || $q4Value === false || $q5Value === false || false;
</script>

<form
  name="questionaire"
  aria-describedby="questionaire-intro"
  class="stack-v gap-m max-w-m flex-1"
  aria-label={$t("user.welcome.form-title")}
  on:submit|preventDefault={handleSubmit}
>
  <div class="stack-v gap-m">
    <QuestionaireCard name="q0" value={q0Value}>
      {$t("user.welcome.question0_value")}

      <svelte:fragment slot="options">
        <div class="stack-v gap-m">
          <label class="label">
            <input
              class="radio black l"
              type="radio"
              id={`age-age_5_or_below`}
              name="age"
              value="age_5_or_below"
              bind:group={$q0Value}
              required
            />
            {$t("user.questionaire.age_5_or_below")}
          </label>

          <label class="label">
            <input
              class="radio black l"
              type="radio"
              id={`age-age_5_to_11`}
              name="age"
              bind:group={$q0Value}
              value="age_5_to_11"
            />
            {$t("user.questionaire.age_5_to_11")}
          </label>

          <label class="label">
            <input
              class="radio black l"
              type="radio"
              id={`age-age_12_to_18`}
              name="age"
              bind:group={$q0Value}
              value="age_12_to_18"
            />
            {$t("user.questionaire.age_12_to_18")}
          </label>
          <label class="label">
            <input
              class="radio black l"
              type="radio"
              id={`age-age_18_to_30`}
              name="age"
              bind:group={$q0Value}
              value="age_18_to_30"
            />
            {$t("user.questionaire.age_18_to_30")}
          </label>
          <label class="label">
            <input
              class="radio black l"
              type="radio"
              id={`age-age_30_or_above`}
              name="age"
              bind:group={$q0Value}
              value="age_30_or_above"
            />
            {$t("user.questionaire.age_30_or_above")}
          </label>
        </div>
      </svelte:fragment>
    </QuestionaireCard>

    <QuestionaireCard
      name="q1"
      value={q1Value}
      condition={$q0Value !== undefined}
    >
      {$t("user.welcome.question1_value")}
    </QuestionaireCard>

    <QuestionaireCard
      name="q2"
      value={q2Value}
      condition={$q1Value === true}
      error={$q2Value === false}
      errorMessage={$t("user.welcome.question2_error")}
    >
      {$t("user.welcome.question2_value")}
    </QuestionaireCard>

    <QuestionaireCard
      name="q3"
      value={q3Value}
      condition={$q1Value === false || $q2Value === true}
    >
      {$t("user.welcome.question3_value")}
    </QuestionaireCard>

    <QuestionaireCard
      name="q4"
      value={q4Value}
      condition={($q1Value === false || $q2Value === true) && $q3Value === true}
      errorMessage={$t("user.welcome.question4_error")}
    >
      {$t("user.welcome.question4_value")}
    </QuestionaireCard>

    <QuestionaireCard
      name="q5"
      condition={$q4Value === true}
      error={$q5Value === true}
      errorMessage={$t("user.welcome.question5_error")}
      value={q5Value}
    >
      {$t("user.welcome.question5_value")}
    </QuestionaireCard>
  </div>

  {#if error && !valid}
    <div class="mx-8 mt-8 md:mx-0" aria-live="assertive">
      {$t("user.welcome.form_error")}
    </div>
  {/if}

  <button
    type="submit"
    class="button m"
    class:primary={valid}
    class:invalid={!valid}
    aria-invalid={!valid}
    style:margin-top="auto"
  >
    {$t("user.welcome.button")}
  </button>
</form>

<!-- <script lang="ts">
  import { questionaireMachine } from "$lib/machines/questionaire";
  import { useMachine } from "@xstate/svelte/lib/fsm";

  const { state, service, send } = useMachine(questionaireMachine);
</script>

<h1>state: {JSON.stringify($state, null, 2)}</h1>
<div>Questionaire</div> -->
