import { ProviderApi } from "lib/ProviderApi";
import { createContext, useContext } from "react";

interface ProviderApiContext {
  api: ProviderApi;
}

const ProviderApiContext = createContext<ProviderApiContext | undefined>(
  undefined
);

export const ProviderApiProvider: React.FC = ({ children }) => {
  const api = new ProviderApi();

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
