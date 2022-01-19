import { ProviderService } from "lib/ProviderService";
import { createContext, useContext } from "react";

interface ProviderApiContext {
  api: ProviderService;
}

const ProviderApiContext = createContext<ProviderApiContext | undefined>(
  undefined
);

interface ProviderApiProviderProps {
  api: ProviderService;
}

export const ProviderApiProvider: React.FC<ProviderApiProviderProps> = ({
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
