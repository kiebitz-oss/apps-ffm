import { UserService } from "lib/UserService";
import type { Reducer } from "react";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import type { Booking, UserKeyPairs, Vaccine } from "vanellus";

enum ActionType {
  AUTHENTICATE = "AUTHENTICATE",
  SET_BOOKING = "SET_BOOKING",
}

type State = {
  api: UserService;
  booking?: Booking;
  keyPairs?: UserKeyPairs;
  secret?: string;
  vaccine?: Vaccine;
};

type Actions =
  | {
      type: ActionType.AUTHENTICATE;
      keyPairs: UserKeyPairs;
    }
  | {
      type: ActionType.SET_BOOKING;
      booking?: Booking;
    };

const api = new UserService({
  jsonrpc: {
    appointments: process.env
      .NEXT_PUBLIC_KIEBITZ_APPOINTMENTS_ENDPOINT as string,
    storage: process.env.NEXT_PUBLIC_KIEBITZ_STORAGE_ENDPOINT as string,
  },
});

const initialState: State = {
  api,
};

interface Context extends State {
  authenticate: (keyPairs: UserKeyPairs) => void;
  setBooking: (booking?: Booking) => void;
}

export const AppContext = createContext<Context>({
  ...initialState,
  authenticate: () => undefined,
  setBooking: () => undefined,
});

const reducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE: {
      return { ...state, keyPairs: action.keyPairs };
    }

    case ActionType.SET_BOOKING: {
      return { ...state, booking: action.booking };
    }

    default: {
      throw new Error("Unknown action");
    }
  }
};

export const AppProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authenticate = useCallback(
    (keyPairs: UserKeyPairs) =>
      dispatch({
        type: ActionType.AUTHENTICATE,
        keyPairs,
      }),
    []
  );

  const setBooking = useCallback(
    (booking?: Booking) =>
      dispatch({
        type: ActionType.SET_BOOKING,
        booking,
      }),
    []
  );

  const value = useMemo(
    () => ({
      ...state,
      authenticate,
      setBooking,
    }),
    [authenticate, setBooking, state]
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
