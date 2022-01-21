import dayjs from "dayjs";
import type { Reducer } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import type { AggregatedPublicAppointment, PublicProvider } from "vanellus";

enum ActionType {
  SET_DATE = "SET_DATE",
  SET_PROVIDER = "SET_PROVIDER",
  SET_APPOINTMENT = "SET_APPOINTMENT",
}

type Actions =
  | {
      type: ActionType.SET_APPOINTMENT;
      appointment: AggregatedPublicAppointment | null;
    }
  | { type: ActionType.SET_PROVIDER; provider: PublicProvider | null }
  | { type: ActionType.SET_DATE; date: Date };

export type State = {
  date: Date;
  provider: PublicProvider | null;
  appointment: AggregatedPublicAppointment | null;
};

const initialState: State = {
  date: dayjs().toDate(),
  provider: null,
  appointment: null,
};

const reducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case ActionType.SET_DATE: {
      return { ...state, date: action.date };
    }

    case ActionType.SET_PROVIDER: {
      return { ...state, provider: action.provider };
    }

    case ActionType.SET_APPOINTMENT: {
      return { ...state, appointment: action.appointment };
    }

    default: {
      return { ...state };
    }
  }
};

interface Context extends State {
  setAppointment: (appointment: AggregatedPublicAppointment) => void;
  setProvider: (provider: PublicProvider | null) => void;
  setDate: (date: Date) => void;
}

export const FinderContext = createContext<Context>({
  ...initialState,
  setAppointment: () => undefined,
  setProvider: () => undefined,
  setDate: () => undefined,
});

export const FinderProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAppointment = useCallback(
    (appointment: AggregatedPublicAppointment) =>
      dispatch({
        type: ActionType.SET_APPOINTMENT,
        appointment,
      }),
    []
  );

  const setProvider = useCallback(
    (provider: PublicProvider | null) =>
      dispatch({
        type: ActionType.SET_PROVIDER,
        provider,
      }),
    []
  );

  const setDate = useCallback(
    (date: Date) =>
      dispatch({
        type: ActionType.SET_DATE,
        date,
      }),
    []
  );

  const value = useMemo(
    () => ({
      ...state,
      setAppointment,
      setProvider,
      setDate,
    }),
    [setAppointment, setDate, setProvider, state]
  );

  return <FinderContext.Provider value={value} {...props} />;
};

export const useFinder = () => {
  const context = useContext(FinderContext);

  if (context === undefined) {
    throw new Error("You cant use useFinder without FinderProvider!");
  }

  return context;
};
