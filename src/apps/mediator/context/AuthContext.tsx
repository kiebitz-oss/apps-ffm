import React from 'react';

export interface State {
    auth: any;
}

const initialState = {
    auth: false,
};

export const AuthContext = React.createContext<State | any>(initialState);

export const useAuth = () => {
    const context = React.useContext(AuthContext);

    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`);
    }

    return context;
};

export const AuthProvider: React.FC = (props) => {
    return <AuthContext.Provider value={initialState} {...props} />;
};

export const ManagedAuthContext: React.FC = ({ children }) => (
    <AuthProvider>{children}</AuthProvider>
);
