import { ProviderApi } from "vanellus";

let api: ProviderApi;

export const getApi = () => {
  if (!api) {
    api = new ProviderApi({
      jsonrpc: {
        appointments: process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT as string,
        storage: process.env.NEXT_PUBLIC_STORAGE_ENDPOINT as string,
      },
    });
  }

  return api;
};
