/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IMPFEN_THEME?: string;
  readonly VITE_IMPFEN_APPOINTMENTS_ENDPOINT?: string;
  readonly VITE_IMPFEN_STORAGE_ENDPOINT?: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

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

declare module "$locales/de" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;

  export default value;
}

declare module "$locales/en" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;

  export default value;
}
