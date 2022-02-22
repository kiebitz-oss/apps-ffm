export const getApiConfig = () => {
  return {
    jsonrpc: {
      appointments:
        import.meta.env.VITE_IMPFEN_APPOINTMENTS_ENDPOINT ||
        window.origin + "/api/v1/appointments",
      storage:
        import.meta.env.VITE_IMPFEN_STORAGE_ENDPOINT ||
        window.origin + "/api/v1/storage",
    },
  };
};
