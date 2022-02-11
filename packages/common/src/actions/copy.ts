export const copy: Action<string> = (element, text) => {
  const clickHandler = () => {
    if (text)
      try {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            return element.dispatchEvent(
              new CustomEvent("svelte-copy", { detail: text })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        element.dispatchEvent(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          new CustomEvent("svelte-copy:error", { detail: error })
        );
      }
  };

  element.addEventListener("click", clickHandler, true);

  return {
    update: (t: string) => (text = t),
    destroy: () => element.removeEventListener("click", clickHandler, true),
  };
};
