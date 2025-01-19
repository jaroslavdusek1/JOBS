import React, { useState } from 'react';
import Message from '../Message';
import { User } from '../../types/User'; // Import User interface

const Register: React.FC = () => {
    const initialFormData: User = {
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    };

    const [formData, setFormData] = useState<User>(initialFormData);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.password_confirmation) {
            console.log("asf")
            setMessage({ text: 'Passwords do not match', type: 'error' });
            return;
        }

        console.log(formData);

        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage({ text: 'User registered successfully', type: 'success' });

                // Clear form
                setFormData(initialFormData);

                console.log(data);
            } else {
                const error = await response.json();
                setMessage({ text: `Registration failed due to: ${error.message}`, type: 'error' });
            }
        } catch (error) {
            console.error('Error:', error.message);
            setMessage({ text: `Something REALLY WEIRD just happened: ${error.message}`, type: 'error' });
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
