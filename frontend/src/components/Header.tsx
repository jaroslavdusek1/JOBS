import React from 'react';

const Header: React.FC = () => {
    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-br from-black via-gray-800 to-gray-900 shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <a className="flex items-center" href="/index.html">
                        <span className="text-gray-100 text-2xl font-bold ml-3">
                            Jobs
                        </span>
                    </a>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        <a
                            href="/index.html"
                            className="text-indigo-300 px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-gray-600 hover:text-white"
                        >
                            Home
                        </a>
                        <a
                            href="/jobs.html"
                            className="text-indigo-300 px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-gray-600 hover:text-white"
                        >
                            Jobs
                        </a>
                        <a
                            href="/add-job.html"
                            className="text-indigo-300 px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-gray-600 hover:text-white"
                        >
                            Add Job
                        </a>
                        {/* Log In Button */}
                        <a
                            href="/login"
                            className="w-20 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-zinc-50 font-medium shadow-md hover:bg-indigo-700 transition-all"
                            title="Log In"
                        >
                            Log In
                        </a>
                    </div>
                </div>
            </div>
            {/* Jemný vícevrstvý stín pod headerem */}
            <div className="h-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-md"></div>
        </nav>
    );
};

export default Header;
