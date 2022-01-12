import { createContext, useContext } from "react";
import { UserService } from "vanellus";

interface UserApiContext {
  api: UserService;
}

const UserApiContext = createContext<UserApiContext | undefined>(undefined);

export const UserApiProvider: React.FC = ({ children }) => {
  const api = new UserService({
    endpoints: {
      appointments: "http://127.0.0.1:22222/jsonrpc",
      storage: "http://127.0.0.1:11111/jsonrpc",
    },
  });

  return (
    <UserApiContext.Provider value={{ api }}>
      {children}
    </UserApiContext.Provider>
  );
};

export const useUserApi = () => {
  const context = useContext(UserApiContext);

  if (context === undefined) {
    throw new Error("You cant use useUserApi without UserApiProvider!");
  }

  return context.api;
};
