import { backup } from "actions/backup";
import { restore } from "actions/restore";
import { setBooking } from "actions/setBooking";
import { setSecret } from "actions/setSecret";
import type { Reducer } from "react";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

enum ActionType {
  AUTHENTICATE = "AUTHENTICATE",
  LOGOUT = "LOGOUT",
}

type State = {
  isAuthenticated: boolean;
};

type Actions =
  | {
      type: ActionType.AUTHENTICATE;
    }
  | {
      type: ActionType.LOGOUT;
    };

const initialState: State = {
  isAuthenticated: false,
};

interface Context extends State {
  authenticate: (secret: string) => void;
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
      return { ...state, isAuthenticated: true };
    }

    case ActionType.LOGOUT: {
      return { ...state, isAuthenticated: false };
    }

    default: {
      throw new Error("Unknown action");
    }
  }
};

export const AppProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authenticate = useCallback(
    (secret: string) =>
      new Promise(async (resolve) => {
        await restore(secret);

        dispatch({
          type: ActionType.AUTHENTICATE,
        });

        resolve(true);
      }),

    []
  );

  const logout = useCallback(
    () =>
      new Promise(async (resolve) => {
        await backup(true);
        setSecret();
        setBooking();

        dispatch({
          type: ActionType.LOGOUT,
        }),
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

export const useAppState = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }

  return context;
};
