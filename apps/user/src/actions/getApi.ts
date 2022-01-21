import { UserApi } from "vanellus";

let api: UserApi;

export const getApi = () => {
  if (!api) {
    api = new UserApi({
      jsonrpc: {
        appointments: process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT as string,
        storage: process.env.NEXT_PUBLIC_STORAGE_ENDPOINT as string,
      },
    });
  }

  return api;
};
