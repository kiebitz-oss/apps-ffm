import { createContext, useContext, useReducer } from "react";
import type { PublicAppointment, PublicProvider } from "vanellus";

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  SET_DATE = "SET_DATE",
  SET_PROVIDER = "SET_PROVIDER",
  SET_APPOINTMENT = "SET_APPOINTMENT",
}

type Payload = {
  [Types.SET_DATE]: {
    date: Date;
  };
  [Types.SET_PROVIDER]: {
    provider: PublicProvider | null;
  };
  [Types.SET_APPOINTMENT]: {
    appointment: PublicAppointment;
  };
};

type State = {
  date: Date;
  provider: PublicProvider | null;
  appointment: PublicAppointment | null;
};

const initialState: State = {
  date: new Date(),
  provider: null,
  appointment: null,
};

type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

const reducer = (state: State, action: Actions /* | ShoppingCartActions */) => {
  switch (action.type) {
    case Types.SET_DATE:
      return { ...state, date: action.payload.date };
    case Types.SET_PROVIDER:
      return { ...state, provider: action.payload.provider };
    case Types.SET_APPOINTMENT:
      return { ...state, appointment: action.payload.appointment };
    default:
      return state;
  }
};

interface FinderStateContext {
  state: State;
  dispatch(action: Actions): void;
}

const FinderStateContext = createContext<FinderStateContext | undefined>(
  undefined
);

export const FinderStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FinderStateContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </FinderStateContext.Provider>
  );
};

export const useFinderState = () => {
  const context = useContext(FinderStateContext);

  if (context === undefined) {
    throw new Error("You cant use useFinderState without FinderStateProvider!");
  }

  return context;
};
