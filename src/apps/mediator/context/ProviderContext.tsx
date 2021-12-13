import { OnboardingData } from 'apps/provider/onboarding/OnboardingProvider';
import React, { createContext, useContext, useReducer } from 'react';
import type { Provider } from 'types';

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
    LOAD_PROVIDERS = 'LOAD_PROVIDERS',
    SELECT_PROVIDER = 'SELECT_PROVIDER',
}

type Payload = {
    [Types.SET_DATA]: {
        data: OnboardingData;
    };
};

type State = {
    providers: Provider[];
    loading: boolean;
    selectedProviders: Provider[];
};

const initialState: State = {
    providers: [],
    loading: false,
    selectedProviders: [],
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
        throw new Error(
            'You cant use useOnboarding without OnboardingProvider!'
        );
    }

    return context;
};
