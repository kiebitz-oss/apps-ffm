import { createContext, useContext } from "react";
import { MediatorService } from "../lib/MediatorService";

interface MediatorApiContext {
  api: MediatorService;
}

const MediatorApiContext = createContext<MediatorApiContext | undefined>(
  undefined
);

export const MediatorApiProvider: React.FC<{ api: MediatorService }> = ({
  children,
  api,
}) => {
  return (
    <MediatorApiContext.Provider value={{ api }}>
      {children}
    </MediatorApiContext.Provider>
  );
};

export const useMediatorApi = () => {
  const context = useContext(MediatorApiContext);

  if (context === undefined) {
    throw new Error("You cant use useMediatorApi without MediatorApiProvider!");
  }

  return context.api;
};
