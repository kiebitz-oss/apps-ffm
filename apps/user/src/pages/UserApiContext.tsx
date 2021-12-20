import { UserApi } from "@kiebitz-oss/api";
import { createContext, useContext } from "react";

interface UserApiContext {
  api: UserApi;
}

const UserApiContext = createContext<UserApiContext | undefined>(undefined);

export const UserApiProvider: React.FC = ({ children }) => {
  const api = new UserApi();

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
