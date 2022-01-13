import { createContext, useContext } from "react";
import { UserService } from "../lib/UserService";

interface UserApiContext {
  api: UserService;
}

const UserApiContext = createContext<UserApiContext | undefined>(undefined);

export const UserApiProvider: React.FC<{ api: UserService }> = ({
  children,
  api,
}) => {
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
