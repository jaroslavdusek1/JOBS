import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PrivateRouteProps } from '../types/Types';

/**
 * Component for handling private routes that require authentication.
 * Redirects unauthenticated users to the login page.
 *
 * @param {PrivateRouteProps} props - The child component to render.
 * @returns {JSX.Element} The authenticated component or redirect.
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
