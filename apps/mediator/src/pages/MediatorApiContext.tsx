import { createContext, useContext } from "react";
import { MediatorService } from "vanellus";

interface MediatorApiContext {
  api: MediatorService;
}

const MediatorApiContext = createContext<MediatorApiContext | undefined>(
  undefined
);

export const MediatorApiProvider: React.FC = ({ children }) => {
  const api = new MediatorService({
    endpoints: {
      appointments: "http://127.0.0.1:22222/jsonrpc",
      storage: "http://127.0.0.1:11111/jsonrpc",
    },
  });

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
