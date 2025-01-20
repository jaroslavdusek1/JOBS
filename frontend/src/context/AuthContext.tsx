import React, { createContext, useState, useContext, ReactNode } from 'react';

// Auth context state interface
interface AuthState {
    token: string | null;
    setToken: (token: string | null) => void;
}

// Default context
const AuthContext = createContext<AuthState | undefined>(undefined);

// Auth provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for using AuthContext
export const useAuth = (): AuthState => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
