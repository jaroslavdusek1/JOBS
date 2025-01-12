import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
} from 'react';
import { API_BASE_URL, INTERNAL_ERROR_500, TOKEN_STORAGE_KEY } from '../constants/constants';
import Spinner from '../components/Spinner';
import { AuthState, User } from '../types/Types';

// Create an authentication context
const AuthContext = createContext<AuthState | undefined>(undefined);

/**
 * Provides authentication context to child components.
 * Manages authentication status and user data.
 *
 * @component
 * @param {ReactNode} children - The child components to wrap with authentication context.
 * @returns {JSX.Element} The AuthProvider component.
 */
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false); // Spinner state

    /**
     * Checks authentication status by making an API request to fetch the user.
     *
     * @async
     * @function
     * @returns {Promise<void>}
     */
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/getUser`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setIsAuthenticated(true);
                    setUser(userData.user);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        checkAuthStatus();
    }, []);

    /**
     * Logs out the user by clearing authentication tokens and user data.
     *
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const logout = async () => {
        setLoading(true);
        try {
            await fetch(`${API_BASE_URL}/logout`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
                },
            });

            // Clear token and authentication state
            localStorage.setItem(TOKEN_STORAGE_KEY, '');
            setIsAuthenticated(false);
            setUser(null);
        } catch (error: any) {
            console.error(error.message || INTERNAL_ERROR_500);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, user, setUser, logout }}
        >
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Spinner />
                </div>
            )}
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to use the AuthContext.
 *
 * @function
 * @returns {AuthState} The authentication context values.
 * @throws {Error} If used outside of an AuthProvider.
 */
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
