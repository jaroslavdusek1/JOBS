import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { sanitizeInput } from '../../utils/validations';
import { Message as MessageType } from '../../types/Message'

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();

    // Form state
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<MessageType>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setMessage({ text: 'Email and password are required.', type: 'error' });
            return;
        }

        console.log("25", JSON.stringify({ email: sanitizeInput(email), password }));

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: sanitizeInput(email), password }),
            });

            console.log('Response Status:', response.status);

            const data = await response.json();
            console.log('Response Data:', data);

            if (response.ok) {
                setMessage({ text: 'Login successful', type: 'success' });
                setToken(data.token); // Save token to context
                setEmail('');
                setPassword('');
                // Navigate to dashboard
                setTimeout(() => navigate('/'), 2000);
            } else {
                setMessage({ text: data.error || 'Login failed. Please try again.', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Unable to connect to the server.', type: 'error' });
        }

    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 text-gray-100 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {message && (
                <div
                    className={`mb-4 p-2 text-white rounded ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                        }`}
                >
                    {message.text}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full mb-6 px-3 py-2 rounded bg-gray-700 text-white"
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-600 py-2 rounded shadow-md hover:bg-indigo-700 transition-all"
                >
                    Log In
                </button>
            </form>
            <p className="text-center mt-4 text-gray-400 text-sm">
                Don't have an account?{' '}
                <a
                    href="/register"
                    className="text-indigo-400 hover:text-indigo-500 transition-all"
                >
                    Register
                </a>
            </p>
        </div>
    );
};

export default Login;
