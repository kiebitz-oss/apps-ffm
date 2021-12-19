import type { Provider } from "@kiebitz-oss/api";
import { createContext, useContext, useReducer } from "react";

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

export interface OnboardingData extends Provider {
  website?: string;
  description?: string;
  phone?: string;
  email?: string;
  accessCode?: string;
}

export enum Types {
  SET_DATA = "SET_DATA",
}

type Payload = {
  [Types.SET_DATA]: {
    data: OnboardingData;
  };
};

type State = {
  data: OnboardingData | null;
};

const initialState: State = {
  data: null,
};

type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

const reducer = (state: State, action: Actions /* | ShoppingCartActions */) => {
  switch (action.type) {
    case Types.SET_DATA:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
};

interface OnboardingContext {
  state: State;
  dispatch(action: Actions): void;
}

const OnboardingContext = createContext<OnboardingContext | undefined>(
  undefined
);

export const OnboardingProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OnboardingContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);

  if (context === undefined) {
    throw new Error("You cant use useOnboarding without OnboardingProvider!");
  }

  return context;
};
