import { page } from "$app/stores";

interface CurrentLinkParameters {
  exact?: boolean;
  /** Indicates the element that represents the current item within a container or set of related elements. */
  type?: "page" | "step" | "location" | "date" | "time" | "true" | "false";
}

export const currentLink: Action<CurrentLinkParameters, HTMLAnchorElement> = (
  node,
  { exact = false, type = "true" } = {}
): SvelteActionReturnType => {
  if (page) {
    const unsubscribe = page.subscribe(({ url }) => {
      if (
        exact
          ? new URL(node.href).pathname === url.pathname
          : url.pathname.startsWith(new URL(node.href).pathname)
      ) {
        node.setAttribute("aria-current", type ?? "true");
      } else {
        node.removeAttribute("aria-current");
      }
    });

    return {
      destroy() {
        unsubscribe();
      },
    };
  }
};
