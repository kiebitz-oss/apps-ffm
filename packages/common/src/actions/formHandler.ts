import type { Action } from "src/app";

type InitialValues = Record<string, string>;

type Parameters = Record<string, never>;

export const formHandler: Action<Parameters, HTMLFormElement> = (form) => {
  const initialValues: InitialValues = {};

  form.noValidate = true;

  for (const element of form.elements) {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      // Workaround to fix typing issues...
      const field = element as unknown as HTMLFormElement;

      console.log(field.name, field);

      // Workaround to select invalid fields with ":not(:placeholder-shown):invalid" or
      // ":not(:focus):not(:placeholder-shown):invalid" if you want to simulate native
      // onBlur-validation.
      // if (field.placeholder?.length === 0) {
      //   field.placeholder = " ";
      // }

      // Set initial values.
      // If the field has a name and no value, set the given initialValue if one exists.
      // If the field has a value set via its html-value-attribut, save its value to the initialValues-object
      if (field?.name) {
        if (field.value === "") {
          if (initialValues[field.name]) {
            field.value = initialValues[field.name];
          }
        } else {
          initialValues[field.name] = field.value as string;
        }
      }
    }
  }

  const handleInput = (event: InputEvent) => {
    console.log(event);
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    console.log(event);

    const form = event.currentTarget as HTMLFormElement;

    // form.noValidate = false;

    console.log(form.checkValidity());
    console.log(form.reportValidity());

    // const form = event.currentTarget;
    // const data = new FormData(form);
    // // This triggers the invalid event on
    // if (form.checkValidity()) {
    //   try {
    //   } catch (error) {}
    // }
  };

  // const handleInvalid: svelte.JSX.EventHandler<, HTMLFormElement> = async (
  //   event
  // ) => {
  //   console.log(event);
  // };

  form.addEventListener("input", handleInput);

  form.addEventListener("submit", handleSubmit);

  // form.addEventListener("invalid", handleInvalid);

  return {
    destroy() {
      // observer.disconnect();

      // form.removeEventListener("change", onChange);
      // form.removeEventListener("invalid", onInvalid, {
      //   capture: true,
      // });
      form.removeEventListener("input", handleInput);
      form.removeEventListener("submit", handleSubmit);
    },

    update() {
      console.log("formHandler.update-return");
    },
  };
};
