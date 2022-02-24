export const getApiConfig = () => {
  return import.meta.env.VITE_IMPFEN_APPOINTMENTS_ENDPOINT &&
    import.meta.env.VITE_IMPFEN_STORAGE_ENDPOINT
    ? Promise.resolve({
        jsonrpc: {
          appointments: import.meta.env.VITE_IMPFEN_APPOINTMENTS_ENDPOINT,
          storage: import.meta.env.VITE_IMPFEN_STORAGE_ENDPOINT,
        },
      })
    : fetch("/api.json").then((result) => result.json());
};
