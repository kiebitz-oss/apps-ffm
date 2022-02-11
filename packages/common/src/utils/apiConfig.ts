export const getApiConfig = () => {
  return {
    jsonrpc: {
      appointments:
        import.meta.env.VITE_IMPFEN_APPOINTMENTS_ENDPOINT ||
        "http://localhost:22222/jsonrpc",
      storage:
        import.meta.env.VITE_IMPFEN_STORAGE_ENDPOINT ||
        "http://localhost:11111/jsonrpc",
    },
  };
};
