import { createContext, useContext } from "react";
import { ProviderService } from "vanellus";

interface ProviderApiContext {
  api: ProviderService;
}

const ProviderApiContext = createContext<ProviderApiContext | undefined>(
  undefined
);

export const ProviderApiProvider: React.FC = ({ children }) => {
  const api = new ProviderService({
    endpoints: {
      appointments: "http://127.0.0.1:22222/jsonrpc",
      storage: "http://127.0.0.1:11111/jsonrpc",
    },
  });

  return (
    <ProviderApiContext.Provider value={{ api }}>
      {children}
    </ProviderApiContext.Provider>
  );
};

export const useProviderApi = () => {
  const context = useContext(ProviderApiContext);

  if (context === undefined) {
    throw new Error("You cant use useProviderApi without ProviderApiProvider!");
  }

  return context.api;
};
