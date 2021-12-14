import { MediatorApi } from 'backend/MediatorApi';
import React, { createContext, useContext } from 'react';

interface MediatorApiContext {
    api: MediatorApi;
}

const MediatorApiContext = createContext<MediatorApiContext | undefined>(
    undefined
);

export const MediatorApiProvider: React.FC = ({ children }) => {
    const api = new MediatorApi();

    return (
        <MediatorApiContext.Provider value={{ api }}>
            {children}
        </MediatorApiContext.Provider>
    );
};

export const useMediatorApi = () => {
    const context = useContext(MediatorApiContext);

    if (context === undefined) {
        throw new Error(
            'You cant use useMediatorApi without MediatorApiProvider!'
        );
    }

    return context.api;
};
