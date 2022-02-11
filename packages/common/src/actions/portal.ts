// https://github.com/romkor/svelte-portal/blob/master/src/Portal.svelte

/**
 * Usage: <div use:portal={'css selector'}> or <div use:portal={document.body}>
 */
export const portal: Action<string | HTMLElement> = (node, target = "body") => {
  let targetElement: HTMLElement;

  function update(newTarget: string | HTMLElement) {
    target = newTarget;

    if (typeof target === "string") {
      targetElement = document.querySelector(target);

      // if (targetElement === null) {
      //   tick()
      //     .then(() => (targetElement = document.querySelector(target)))
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }

      if (targetElement === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetElement = target;
    } else {
      throw new TypeError(
        `Unknown portal target type: ${
          target === null ? "null" : typeof target
        }. Allowed types: string (CSS selector) or HTMLElement.`
      );
    }

    targetElement.appendChild(node);
    node.hidden = false;
  }

  update(target);

  return {
    update,
    destroy: () => {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    },
  };
};
