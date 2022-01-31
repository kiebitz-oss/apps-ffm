export const getApiConfig = () => {
  return {
    jsonrpc: {
      appointments: process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT
        ? process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT
        : `${window.origin}/api/v1/appointments`,
      storage: process.env.NEXT_PUBLIC_STORAGE_ENDPOINT
        ? process.env.NEXT_PUBLIC_STORAGE_ENDPOINT
        : `${window.origin}/api/v1/storage`,
    },
  };
};
