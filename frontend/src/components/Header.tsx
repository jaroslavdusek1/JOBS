import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-br from-black via-gray-800 to-gray-900 shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <span className="text-gray-100 text-2xl font-bold flex items-center">
                            <i className="fas fa-user-tie mr-2 text-indigo-400"></i>
                            Jobs.
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className="text-indigo-300 px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-gray-700 hover:text-white"
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            className="text-indigo-300 px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-gray-700 hover:text-white"
                        >
                            Jobs
                        </Link>
                        <Link
                            to="/add-job"
                            className="text-indigo-300 px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-gray-700 hover:text-white"
                        >
                            Add Job
                        </Link>
                        {/* Login and Register */}
                        <div className="flex space-x-2">
                            <Link
                                to="/login"
                                className="w-24 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition-all"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/register"
                                className="w-24 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition-all"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Jemný vícevrstvý stín pod headerem */}
            <div className="h-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-inner"></div>
        </nav>
    );
};

export default Header;
