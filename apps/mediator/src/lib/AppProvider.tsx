import { getKeyPairs, getStorage, setKeyPairs } from "actions";
import React, {
  createContext,
  Reducer,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import type { MediatorKeyPairs } from "vanellus";

type Notification = {
  id: number;
  message: string;
  type: "INFO";
  shown: boolean;
};

enum ActionType {
  AUTHENTICATE = "AUTHENTICATE",
  LOGOUT = "LOGOUT",
  ADD_NOTIFICATION = "ADD_NOTIFICATION",
  GET_NOTIFICATIONS = "GET_NOTIFICATIONS",
}

type State = {
  isAuthenticated: boolean;
  notifications: Notification[];
};

type Actions =
  | {
      type: ActionType.AUTHENTICATE;
    }
  | {
      type: ActionType.LOGOUT;
    }
  | {
      type: ActionType.ADD_NOTIFICATION;
      message: string;
    }
  | {
      type: ActionType.GET_NOTIFICATIONS;
    };

interface Context extends State {
  authenticate: (keyPairs: MediatorKeyPairs) => Promise<boolean>;
  logout: () => Promise<boolean>;
  addNotification: (message: string) => boolean;
  getNotifications: () => Notification[];
}

const initialState: State = {
  isAuthenticated: false,
  notifications: [],
};

export const AppContext = createContext<Context>({
  ...initialState,
  authenticate: () => Promise.resolve().then(() => false),
  logout: () => Promise.resolve().then(() => false),
  addNotification: () => false,
  getNotifications: () => [],
});

const reducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE: {
      return { ...state, isAuthenticated: true };
    }

    case ActionType.LOGOUT: {
      return { ...state, isAuthenticated: false };
    }

    case ActionType.ADD_NOTIFICATION: {
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: +new Date(),
            message: action.message,
            type: "INFO",
            shown: false,
          },
        ],
      };
    }

    case ActionType.GET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: state.notifications
          .filter((notification) => !notification.shown)
          .map((notification) => ({
            ...notification,
            shown: true,
          })),
      };
    }

    default: {
      throw new Error("Unknown action");
    }
  }
};

const init = () => {
  try {
    const keyPairs = getKeyPairs();

    return {
      ...initialState,
      isAuthenticated: !!keyPairs,
    };
  } catch (error) {
    // intentionally empty
  }

  return {
    ...initialState,
    isAuthenticated: false,
  };
};

export const AppProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const authenticate = useCallback(
    (keyPairs: MediatorKeyPairs) =>
      new Promise<boolean>(async (resolve) => {
        if (keyPairs) {
          const isValidKeyPairs = await setKeyPairs(keyPairs);

          if (isValidKeyPairs) {
            dispatch({
              type: ActionType.AUTHENTICATE,
            });

            return resolve(true);
          }
        }

        return resolve(false);
      }),
    []
  );

  const logout = useCallback(
    () =>
      new Promise<boolean>(async (resolve) => {
        await setKeyPairs(null);
        await getStorage().removeAll();

        dispatch({
          type: ActionType.LOGOUT,
        });

        return resolve(true);
      }),
    []
  );

  const addNotification = useCallback((message: string) => {
    dispatch({
      type: ActionType.ADD_NOTIFICATION,
      message,
    });

    return true;
  }, []);

  const getNotifications = useCallback(() => {
    const notifications = state.notifications;

    dispatch({
      type: ActionType.GET_NOTIFICATIONS,
    });

    return notifications;
  }, [state.notifications]);

  const value = useMemo(
    () => ({
      ...state,
      authenticate,
      logout,
      addNotification,
      getNotifications,
    }),
    [addNotification, authenticate, getNotifications, logout, state]
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
