import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_HOME } from '../constants/constants';
import { useAuth } from '../context/AuthContext';

/**
 * Header Component - Displays the navigation bar with authentication-based links and actions.
 *
 * @component
 * @returns {JSX.Element} Rendered Header component.
 */
const Header: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useAuth();

    /**
     * Handles logout by calling the API and updating the context.
     * Navigates to the Home page on successful logout.
     *
     * @async
     * @function
     */
    const handleLogout = async (): Promise<void> => {
        try {
            await logout(); // Call logout from AuthContext
            navigate(ROUTE_HOME); // Redirect to home page
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="header-container">
            <div className="header-content">
                <div className="header-inner">
                    {/* Logo */}
                    <Link to="/" className="header-logo">
                        <span className="header-logo-text">
                            <i className="fas fa-user-tie header-logo-icon"></i>
                            Jobs.
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="nav-links">
                        {/* Home link - always visible */}
                        <Link to="/" className="nav-link">
                            Home
                        </Link>

                        {isAuthenticated ? (
                            <>
                                {/* Visible only when authenticated - Add Job */}
                                <Link to="/add-job" className="nav-link">
                                    Add Job
                                </Link>

                                {/* User Name and Profile Link */}
                                <Link to="/user" className="nav-profile-link">
                                    {user?.username || "Profile"}
                                </Link>

                                {/* Logout button */}
                                <button
                                    onClick={handleLogout}
                                    className="nav-logout-btn"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Visible only when not authenticated - Register and Log In */}
                                <Link to="/register" className="nav-auth-btn">
                                    Register
                                </Link>
                                <Link to="/login" className="nav-auth-btn">
                                    Log In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* Shadow below the header */}
            <div className="header-shadow"></div>
        </nav>
    );
};

export default Header;
