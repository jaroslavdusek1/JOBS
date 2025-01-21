import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { sanitizeInput, isValidEmail } from '../../utils/validations';
import { Message as MessageType } from '../../types/Message'
import { API_BASE_URL, ROUTE_HOME, DEFAULT_HEADERS, INTERNAL_ERROR_500, LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_TOKEN_ERROR, LOGIN_VALIDATION_ERROR, ERROR_INVALID_EMAIL } from '../../constants/constants';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth(); // Access authentication context

    // Form state
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<MessageType>(null);

    /**
     * Handles email input change with sanitization.
     * 
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = sanitizeInput(e.target.value);
        setEmail(sanitizedValue);
    };

    /**
     * Handles form submission for login.
     * Sends login credentials to the backend and processes the response.
     * 
     * @function
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setMessage({ text: LOGIN_VALIDATION_ERROR, type: 'error' });
            return;
        }

        if (!isValidEmail(email)) {
            setMessage({ text: ERROR_INVALID_EMAIL, type: 'error' });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify({ email: sanitizeInput(email), password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage({ text: LOGIN_SUCCESS, type: 'success' });

                // Validate and save token to context
                data.token ? setToken(data.token) : setMessage({ text: data.error || LOGIN_TOKEN_ERROR, type: 'error' });

                // Empty inputs
                setEmail('');
                setPassword('');

                // Navigate to home/dashboard
                // setTimeout(() => navigate(ROUTE_HOME), 2000);
                navigate(ROUTE_HOME);
            } else {
                setMessage({ text: data.error || LOGIN_FAILED, type: 'error' });
            }
        } catch (error) {
            setMessage({ text: INTERNAL_ERROR_500, type: 'error' });
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Login</h2>
            {message && (
                <div
                    className={`form-message ${message.type === 'error' ? 'form-message-error' : 'form-message-success'
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange} // Sanitize
                    placeholder="Email"
                    className="form-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-input"
                />
                <button
                    type="submit"
                    className="form-button"
                >
                    Log In
                </button>
            </form>
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
