import React from 'react';

const Register: React.FC = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 text-gray-100 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form>
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
                />
                <input
                    type="test"
                    placeholder="Surname"
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
                ></input>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full mb-6 px-3 py-2 rounded bg-gray-700 text-white"
                />
                <button className="w-full bg-indigo-600 py-2 rounded shadow-md hover:bg-indigo-700 transition-all">
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
