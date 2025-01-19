import React, { useState } from 'react';
import Message from '../Message';
import { User } from '../../types/User';
import { Message as MessageType } from '../../types/Message';
import { sanitizeInput, validateForm } from '../../utils/validations';
import { useNavigate } from 'react-router-dom';

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
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const rawResponse = await response.json();
            console.log('Raw Response:', rawResponse);

            if (response.ok) {
                // Success (status 200 - 299)
                setMessage({ text: 'User registered successfully', type: 'success' });
                setFormData(initialFormData);
                setTimeout(() => navigate('/login'), 3000);
            } else if (rawResponse.error) {
                // If the response includes key "error"
                setMessage({ text: rawResponse.error, type: 'error' });
            } else {
                // Unexpected response's format 
                setMessage({ text: 'Something went wrong. Please try again.', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Unable to connect to the server. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 text-gray-100 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {message && (
                <Message
                    message={message.text}
                    type={message.type}
                    onClose={() => setMessage(null)}
                />
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Surname"
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation || ''}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full mb-6 px-3 py-2 rounded bg-gray-700 text-white"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-600 py-2 rounded shadow-md hover:bg-indigo-700 transition-all"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
