/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

interface ImportMetaEnv {
  readonly VITE_IMPFEN_APPOINTMENTS_ENDPOINT?: string;
  readonly VITE_IMPFEN_STORAGE_ENDPOINT?: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface ActionReturn<Parameters = any> {
  update?: (parameters: Parameters) => void;
  destroy?: () => void;
}

export interface Action<Parameters = any, Element = HTMLElement> {
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
