import React, { useState } from 'react';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                alert('User registered successfully');
                console.log(data);
            } else {
                const error = await response.json();
                alert(`Registration failed: ${error.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Something went wrong ${error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 text-gray-100 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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
                    name="confirmPassword"
                    value={formData.confirmPassword}
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
            <p className="text-center mt-4 text-gray-400 text-sm">
                Already have an account?{' '}
                <a
                    href="/login"
                    className="text-indigo-400 hover:text-indigo-500 transition-all"
                >
                    Log In
                </a>
            </p>
        </div>
    );
};

export default Register;
