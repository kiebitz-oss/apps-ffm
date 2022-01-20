import { ProviderService } from "lib/ProviderService";
import type { Reducer } from "react";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import type { Booking, ProviderKeyPairs, Vaccine } from "vanellus";

enum ActionType {
  AUTHENTICATE = "AUTHENTICATE",
  LOGOUT = "LOGOUT",
}

type State = {
  api: ProviderService;
  isAuthenticated: boolean;
  booking?: Booking;
  keyPairs?: ProviderKeyPairs;
  secret?: string;
  vaccine?: Vaccine;
};

type Actions =
  | {
      type: ActionType.AUTHENTICATE;
      keyPairs: ProviderKeyPairs;
      secret: string;
    }
  | {
      type: ActionType.LOGOUT;
    };

const api = new ProviderService({
  jsonrpc: {
    appointments: process.env.NEXT_PUBLIC_APPOINTMENTS_ENDPOINT as string,
    storage: process.env.NEXT_PUBLIC_STORAGE_ENDPOINT as string,
  },
});

const initialState: State = {
  api,
  isAuthenticated: true,
};

interface Context extends State {
  authenticate: (secret: string, keyPairs: ProviderKeyPairs) => void;
  logout: () => void;
}

export const AppContext = createContext<Context>({
  ...initialState,
  authenticate: () => undefined,
  logout: () => undefined,
});

const reducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE: {
      return { ...state, keyPairs: action.keyPairs, secret: action.secret };
    }

    default: {
      throw new Error("Unknown action");
    }
  }
};

export const AppProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authenticate = useCallback(
    (secret: string, keyPairs: ProviderKeyPairs) =>
      new Promise((resolve) => {
        api.authenticate(secret, keyPairs);

        dispatch({
          type: ActionType.AUTHENTICATE,
          keyPairs,
          secret,
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
