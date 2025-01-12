import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { sanitizeInput, isValidEmail } from '../../utils/validations';
import Spinner from '../Spinner'; // Spinner component for loading indication
import {
    API_BASE_URL,
    ROUTE_HOME,
    DEFAULT_HEADERS,
    INTERNAL_ERROR_500,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGIN_VALIDATION_ERROR,
    ERROR_INVALID_EMAIL,
    TOKEN_STORAGE_KEY,
} from '../../constants/constants';

/**
 * Login component for user authentication.
 * Displays a login form, validates input, and authenticates the user by calling the API.
 *
 * @component
 * @returns {JSX.Element} The rendered Login component.
 */
const Login: React.FC = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth();

    // State for managing email and password input fields
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // State for managing the feedback message (success or error)
    const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

    // State for managing loading status during API call
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Handles changes to the email input field.
     * Sanitizes the input to prevent any malicious content.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = sanitizeInput(e.target.value);
        setEmail(sanitizedValue);
    };

    /**
     * Handles the submission of the login form.
     * Validates input fields, sends credentials to the backend, and updates the authentication context.
     *
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic client-side validation
        if (!email || !password) {
            setMessage({ text: LOGIN_VALIDATION_ERROR, type: 'error' });
            return;
        }

        if (!isValidEmail(email)) {
            setMessage({ text: ERROR_INVALID_EMAIL, type: 'error' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            // Send login request to the backend
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify({ email: sanitizeInput(email), password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Set success message
                setMessage({ text: LOGIN_SUCCESS, type: 'success' });

                // Update authentication context with user data
                setIsAuthenticated(true);
                localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
                setUser(data.user);

                // Clear input fields
                setEmail('');
                setPassword('');

                // Navigate to the home page
                navigate(ROUTE_HOME);
            } else {
                // Handle server-side error response
                setMessage({ text: data.error || LOGIN_FAILED, type: 'error' });
                setIsAuthenticated(false);
            }
        } catch (error) {
            setMessage({ text: INTERNAL_ERROR_500, type: 'error' });
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Login</h2>

            {/* Display feedback message */}
            {message && (
                <div
                    className={`form-message ${message.type === 'error' ? 'form-message-error' : 'form-message-success'
                        }`}
                >
                    {message.text}
                </div>
            )}

            {/* Show spinner while loading */}
            {loading ? (
                <div className="flex justify-center items-center py-4">
                    <Spinner />
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* Email input field */}
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        className="form-input"
                    />

                    {/* Password input field */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="form-input"
                    />

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="form-button"
                    >
                        Log In
                    </button>
                </form>
            )}

            {/* Link to register page */}
            <p className="link-container">
                Don't have an account?{' '}
                <a
                    href="/register"
                    className="link"
                >
                    Register
                </a>
            </p>
        </div>
    );
};

export default Login;
