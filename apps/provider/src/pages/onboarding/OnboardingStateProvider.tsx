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

export interface OnboardingStateData extends Provider {
  website?: string;
  phone?: string;
  email?: string;
  accessCode?: string;
}

export enum Types {
  SET_DATA = "SET_DATA",
}

type Payload = {
  [Types.SET_DATA]: {
    data: OnboardingStateData;
  };
};

type State = {
  data: OnboardingStateData | null;
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

interface OnboardingStateContext {
  state: State;
  dispatch(action: Actions): void;
}

const OnboardingStateContext = createContext<
  OnboardingStateContext | undefined
>(undefined);

export const OnboardingStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OnboardingStateContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </OnboardingStateContext.Provider>
  );
};

export const useOnboardingState = () => {
  const context = useContext(OnboardingStateContext);

  if (context === undefined) {
    throw new Error("You cant use useOnboarding without OnboardingProvider!");
  }

  return context;
};
