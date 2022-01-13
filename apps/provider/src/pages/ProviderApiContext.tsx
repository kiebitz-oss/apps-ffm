import { createContext, useContext } from "react";
import { ProviderService } from "../lib/ProviderService";

interface ProviderApiContext {
  api: ProviderService;
}

const ProviderApiContext = createContext<ProviderApiContext | undefined>(
  undefined
);

export const ProviderApiProvider: React.FC<{ api: ProviderService }> = ({
  children,
  api,
}) => {
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
