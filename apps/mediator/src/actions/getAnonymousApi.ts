import { AnonymousApi } from "vanellus";

let api: AnonymousApi;

export const getAnonymousApi = () => {
  if (!api) {
    api = new AnonymousApi({
      jsonrpc: {
        appointments: process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT as string,
        storage: process.env.NEXT_PUBLIC_STORAGE_ENDPOINT as string,
      },
    });
  }

  return api;
};
