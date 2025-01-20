import React, { useState } from 'react';
// import Message from '../Message';
import { User } from '../../types/User';
import { Message as MessageType } from '../../types/Message';
import { sanitizeInput, validateForm } from '../../utils/validations';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, DEFAULT_HEADERS, ERROR_MESSAGE, INTERNAL_ERROR_500, REGISTER_USER_SUCCESS, ROUTE_LOGIN } from '../../constants/constants';

const Register: React.FC = () => {
    // Navigate init
    const navigate = useNavigate();

    /**
     * Initial state for form data
     * 
     * @type {User}
     */
    const initialFormData: User = {
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    };

    const [formData, setFormData] = useState<User>(initialFormData);

    /** 
     * Message state to display feedback to the user
     * 
     * @type {MessageType}
     */
    const [message, setMessage] = useState<MessageType>(null);

    /**
     * Handles input change and sanitizes input value.
     * 
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Allow special chars only for passwords
        const allowSpecialChars = name === 'password' || name === 'password_confirmation';

        // Input sanitization
        const sanitizedValue = sanitizeInput(value, allowSpecialChars);

        setFormData({ ...formData, [name]: sanitizedValue });
    };


    /**
     * Handles form submission, validates data, and communicates with the backend.
     * 
     * @async
     * @function
     * @param {React.FormEvent} e - The form submit event.
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form inputs
        const { valid, errors } = validateForm(formData);

        if (!valid) {
            setMessage({ text: Object.values(errors).join(', '), type: 'error' });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(formData),
            });

            const rawResponse = await response.json();
            console.log('Raw Response:', rawResponse);

            if (response.ok) {
                // Success (status 200 - 299)
                setMessage({ text: REGISTER_USER_SUCCESS, type: 'success' });
                setFormData(initialFormData);
                setTimeout(() => navigate(ROUTE_LOGIN), 3000);
            } else if (rawResponse.error) {
                // If the response includes key "error"
                setMessage({ text: rawResponse.error, type: 'error' });
            } else {
                // Unexpected response's format 
                setMessage({ text: ERROR_MESSAGE, type: 'error' });
            }
        } catch (error) {
            setMessage({ text: INTERNAL_ERROR_500, type: 'error' });
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Register</h2>

            {message && (
                <div
                    className={`form-message ${message.type === 'error' ? 'form-message-error' : 'form-message-success'
                        }`}
                >
                    {message.text}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="form-input"
                    required
                />
                <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Surname"
                    className="form-input"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="form-input"
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="form-input"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="form-input"
                    required
                />
                <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation || ''}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="form-input"
                    required
                />
                <button type="submit" className="form-button">
                    Register
                </button>
            </form>
        </div>
    );
}


export default Register;
