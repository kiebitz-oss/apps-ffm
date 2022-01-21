import { getKeyPairs, getStorage, setKeyPairs, setSecret } from "actions";
import type { Reducer } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import type { ProviderKeyPairs } from "vanellus";

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
  authenticate: (secret: string, keyPairs: ProviderKeyPairs) => void;
  logout: () => void;
}

export const AppContext = createContext<Context>({
  ...initialState,
  authenticate: () => undefined,
  logout: () => undefined,
});

const init = () => {
  try {
    const keyPairs = getKeyPairs();

    return {
      isAuthenticated: !!keyPairs,
    };
  } catch (error) {
    // intentionally empty
  }

  return {
    isAuthenticated: false,
  };
};

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
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const authenticate = useCallback(
    (secret: string, keyPairs: ProviderKeyPairs) =>
      new Promise(async (resolve) => {
        console.log(secret, keyPairs);
        setSecret(secret);
        await setKeyPairs(keyPairs);
        // await restore(secret, keyPairs);

        dispatch({
          type: ActionType.AUTHENTICATE,
        });

        return resolve(true);
      }),
    []
  );

  const logout = useCallback(
    () =>
      new Promise(async (resolve) => {
        // await backup();
        setSecret();
        await setKeyPairs();
        getStorage().removeAll();

        dispatch({
          type: ActionType.LOGOUT,
        });

        return resolve(true);
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
