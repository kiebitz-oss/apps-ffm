import { MediatorApi } from "vanellus";

let api: MediatorApi;

export const getApi = () => {
  if (!api) {
    api = new MediatorApi({
      jsonrpc: {
        appointments: process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT as string,
        storage: process.env.NEXT_PUBLIC_STORAGE_ENDPOINT as string,
      },
    });
  }

  return api;
};
