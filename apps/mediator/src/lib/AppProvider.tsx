import { MediatorService } from "lib/MediatorService";
import React, {
  createContext,
  Reducer,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import type { MediatorKeyPairs } from "vanellus";

enum ActionType {
  AUTHENTICATE = "AUTHENTICATE",
  LOGOUT = "LOGOUT",
}

type State = {
  api: MediatorService;
  isAuthenticated: boolean;
  keyPairs?: MediatorKeyPairs;
};

type Actions =
  | {
      type: ActionType.AUTHENTICATE;
      keyPairs: MediatorKeyPairs;
    }
  | {
      type: ActionType.LOGOUT;
    };

interface Context extends State {
  authenticate: (keyPairs: MediatorKeyPairs) => void;
  logout: () => void;
}

export const api = new MediatorService({
  jsonrpc: {
    appointments: process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT as string,
    storage: process.env.NEXT_PUBLIC_STORAGE_ENDPOINT as string,
  },
});

const initialState: State = {
  api,
  isAuthenticated: true,
};

export const AppContext = createContext<Context>({
  ...initialState,
  authenticate: () => undefined,
  logout: () => undefined,
});

const reducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE: {
      return { ...state, keyPairs: action.keyPairs, isAuthenticated: true };
    }

    case ActionType.LOGOUT: {
      return { ...state, keyPairs: undefined, isAuthenticated: false };
    }

    default: {
      throw new Error("Unknown action");
    }
  }
};

export const AppProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authenticate = useCallback(
    (keyPairs: MediatorKeyPairs) =>
      new Promise((resolve) => {
        api.authenticate(keyPairs);

        dispatch({
          type: ActionType.AUTHENTICATE,
          keyPairs,
        });

        resolve(true);
      }),
    []
  );

  const logout = useCallback(
    () =>
      new Promise((resolve) => {
        api.logout();

        dispatch({
          type: ActionType.LOGOUT,
        });

        resolve(true);
      }),

    []
  );

  const value = useMemo(
    () => ({
      ...state,
      authenticate,
      logout,
    }),
    [authenticate, logout, state]
  );

  return <AppContext.Provider value={value} {...props} />;
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }

  return context;
};
