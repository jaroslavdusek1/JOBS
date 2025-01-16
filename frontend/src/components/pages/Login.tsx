import React from 'react';

const Login: React.FC = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 text-gray-100 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 px-3 py-2 rounded bg-gray-700 text-white"
                />
                <button className="w-full bg-indigo-600 py-2 rounded shadow-md hover:bg-indigo-700 transition-all">
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
