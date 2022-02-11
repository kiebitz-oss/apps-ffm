// https://github.com/romkor/svelte-portal/blob/master/src/Portal.svelte

/**
 * Usage: <div use:portal={'css selector'}> or <div use:portal={document.body}>
 *
 * @param {HTMLElement} el
 
 */
export const scrollLock: Action = () => {
  const { body, documentElement: html } = document;
  const scrollBarWidth = window.innerWidth - html.clientWidth;
  const bodyPaddingRight =
    parseInt(window.getComputedStyle(body).getPropertyValue("padding-right")) ||
    0;

  // 1. Fixes a bug in iOS and desktop Safari whereby setting `overflow: hidden` on
  //    the html/body does not prevent scrolling.
  // 2. Fixes a bug in desktop Safari where `overflowY` does not prevent scroll if an
  //   `overflow-x` style is also applied to the body.
  html.style.position = "relative"; // [1]
  html.style.overflow = "hidden"; // [2]

  body.style.position = "relative"; // [1]
  body.style.overflow = "hidden"; // [2]
  body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

  return {
    destroy: () => {
      html.style.position = "";
      html.style.overflow = "";
      body.style.position = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
    },
  };
};
