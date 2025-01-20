import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AuthState } from '../types/Context'

// Create an authentication context
const AuthContext = createContext<AuthState | undefined>(undefined);

/**
 * Provides authentication context to child components.
 * Includes the `token` state and `setToken` function.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - Child components wrapped by the provider.
 * @returns {JSX.Element} The context provider component.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to access authentication context.
 * Throws an error if used outside of `AuthProvider`.
 * 
 * @throws {Error} If called outside `AuthProvider`.
 * @returns {AuthContextType} The context value including `token` and `setToken`.
 */
export const useAuth = (): AuthState => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
