import type { Action } from "src/app";

export const clickOutside: Action<() => void> = (node, handler) => {
  const onClick = (event: MouseEvent) =>
    node &&
    !node.contains(event.target as HTMLElement) &&
    !event.defaultPrevented &&
    handler();

  document.addEventListener("click", onClick, true);

  return {
    destroy() {
      document.removeEventListener("click", onClick, true);
    },
  };
};
