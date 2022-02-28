<script lang="ts">
  import { goto } from "$app/navigation";
  import { vaccine } from "$lib/stores";
  import { t } from "svelte-intl-precompile";
  import { writable } from "svelte/store";
  import QuestionaireCard from "./QuestionaireCard.svelte";

  let valid = false;
  let error = false;

  enum AGE_RANGES {
    AGE_5_OR_BELOW = "age_5_or_below",
    AGE_5_TO_11 = "age_5_to_11",
    AGE_12_TO_17 = "age_12_to_17",
    AGE_18_TO_29 = "age_age_18_to_29",
    AGE_30_OR_ABOVE = "age_30_or_above",
  }

  enum SERIES {
    SERIES_1 = "series_1",
    SERIES_2 = "series_2",
    SERIES_3 = "series_3",
  }

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

  const q0Value = writable<AGE_RANGES | undefined>();
  const q1Value = writable<SERIES | undefined>();
  const q2Value = writable<boolean | undefined>();
  const q3Value = writable<boolean | undefined>();

  q0Value.subscribe((value) => {
    $q1Value = undefined;
    $q2Value = undefined;
    $q3Value = undefined;
    $vaccine = undefined;
    error = false;

    if (value === AGE_RANGES.AGE_5_TO_11) {
      $vaccine = "biontechchildren";
    } else if (
      $q0Value === AGE_RANGES.AGE_12_TO_17 ||
      $q0Value === AGE_RANGES.AGE_18_TO_29
    ) {
      $vaccine = "biontech";
    }
  });

  q1Value.subscribe(() => {
    $q2Value = undefined;
    $q3Value = undefined;

    error = false;
  });

  q2Value.subscribe(() => {
    $q3Value = undefined;

    error = false;
  });

  q3Value.subscribe((value) => {
    error = false;

    if (value === true) {
      $vaccine = "biontech";
    } else {
      $vaccine = undefined;
    }
  });

  $: valid =
    $q0Value === AGE_RANGES.AGE_5_TO_11 ||
    (($q0Value === AGE_RANGES.AGE_12_TO_17 ||
      $q0Value === AGE_RANGES.AGE_18_TO_29) &&
      $q1Value === SERIES.SERIES_1) ||
    (($q0Value === AGE_RANGES.AGE_12_TO_17 ||
      $q0Value === AGE_RANGES.AGE_18_TO_29) &&
      $q2Value === true) ||
    $q3Value !== undefined ||
    false;
</script>

<form
  name="questionaire"
  aria-describedby="questionaire-intro"
  class="stack-v gap-m max-w-m flex-1"
  aria-label={$t("user.welcome.form-title")}
  on:submit|preventDefault={handleSubmit}
>
  <QuestionaireCard
    name="q0"
    value={q0Value}
    error={$q0Value === AGE_RANGES.AGE_5_OR_BELOW}
    errorMessage={$t("user.welcome.question0_error")}
  >
    {$t("user.welcome.question0_value")}

    <svelte:fragment slot="options">
      <div class="stack-v gap-m">
        <label class="label">
          <input
            class="radio black l"
            type="radio"
            id={`age-${AGE_RANGES.AGE_5_OR_BELOW}`}
            name="age"
            value={AGE_RANGES.AGE_5_OR_BELOW}
            bind:group={$q0Value}
            required
          />
          {$t("user.questionaire.age_5_or_below")}
        </label>

        <label class="label">
          <input
            class="radio black l"
            type="radio"
            id={`age-${AGE_RANGES.AGE_5_TO_11}`}
            name="age"
            bind:group={$q0Value}
            value={AGE_RANGES.AGE_5_TO_11}
          />
          {$t("user.questionaire.age_5_to_11")}
        </label>

        <label class="label">
          <input
            class="radio black l"
            type="radio"
            id={`age-${AGE_RANGES.AGE_12_TO_17}`}
            name="age"
            bind:group={$q0Value}
            value={AGE_RANGES.AGE_12_TO_17}
          />
          {$t("user.questionaire.age_12_to_18")}
        </label>
        <label class="label">
          <input
            class="radio black l"
            type="radio"
            id={`age-${AGE_RANGES.AGE_18_TO_29}`}
            name="age"
            bind:group={$q0Value}
            value={AGE_RANGES.AGE_18_TO_29}
          />
          {$t("user.questionaire.age_18_to_30")}
        </label>
        <label class="label">
          <input
            class="radio black l"
            type="radio"
            id={`age-${AGE_RANGES.AGE_30_OR_ABOVE}`}
            name="age"
            bind:group={$q0Value}
            value={AGE_RANGES.AGE_30_OR_ABOVE}
          />
          {$t("user.questionaire.age_30_or_above")}
        </label>
      </div>
    </svelte:fragment>
  </QuestionaireCard>

  <!-- is booster -->
  <QuestionaireCard
    name="q1"
    value={q1Value}
    condition={$q0Value === AGE_RANGES.AGE_5_TO_11 ||
      $q0Value === AGE_RANGES.AGE_12_TO_17 ||
      $q0Value === AGE_RANGES.AGE_18_TO_29 ||
      $q0Value === AGE_RANGES.AGE_30_OR_ABOVE}
  >
    {$t("user.welcome.question1_value")}

    <svelte:fragment slot="options">
      <div class="stack-v gap-m">
        <label class="label">
          <input
            class="radio black l"
            type="radio"
            id={`series-${SERIES.SERIES_1}`}
            name="series"
            value={SERIES.SERIES_1}
            bind:group={$q1Value}
            required
          />
          {$t("user.questionaire.series_1")}
        </label>
        <label class="label">
          <input
            class="radio black l"
            type="radio"
            id={`series-${SERIES.SERIES_2}`}
            name="series"
            value={SERIES.SERIES_2}
            bind:group={$q1Value}
            required
          />
          {$t("user.questionaire.series_2")}
        </label>
        {#if $q0Value !== AGE_RANGES.AGE_5_TO_11}
          <label class="label">
            <input
              class="radio black l"
              type="radio"
              id={`series-${SERIES.SERIES_3}`}
              name="series"
              value={SERIES.SERIES_3}
              bind:group={$q1Value}
              required
            />
            {$t("user.questionaire.series_3")}
          </label>
        {/if}
      </div>
    </svelte:fragment>
  </QuestionaireCard>

  <!-- booster more than 3 month ago -->
  <QuestionaireCard
    name="q2"
    value={q2Value}
    condition={$q1Value === SERIES.SERIES_2 || $q1Value === SERIES.SERIES_3}
    error={$q2Value === false}
    errorMessage={$q1Value === SERIES.SERIES_2
      ? $t("user.welcome.question2_series2_error")
      : $t("user.welcome.question2_series3_error")}
  >
    {#if $q1Value === SERIES.SERIES_2}
      {$t("user.welcome.question2_series2_value")}
    {:else}
      {$t("user.welcome.question2_series3_value")}
    {/if}
  </QuestionaireCard>

  <!-- are you pregnant -->
  <QuestionaireCard
    name="q3"
    value={q3Value}
    condition={$q0Value === AGE_RANGES.AGE_30_OR_ABOVE &&
      ($q1Value === SERIES.SERIES_1 || $q2Value === true)}
  >
    {$t("user.welcome.question3_value")}
  </QuestionaireCard>

  {#if error && !valid}
    <div class="error" aria-live="assertive">
      {$t("user.welcome.form_error")}
    </div>
  {/if}

  <button
    type="submit"
    class="button m"
    class:primary={valid}
    class:invalid={!valid}
    aria-disabled={!valid}
    style:margin-top="auto"
  >
    {$t("user.welcome.button")}
  </button>
</form>
