/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

interface ActionReturn<Parameters = unknown> {
  update?: (parameters: Parameters) => void;
  destroy?: () => void;
}

interface Action<Parameters = unknown, Element = HTMLElement> {
  <Node extends Element>(
    node: Node,
    parameters?: Parameters
  ): void | ActionReturn<Parameters>;
}

declare module "*.mdx" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;

  export default value;
}
