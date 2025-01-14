import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 shadow-inner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Main Footer Content */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-200 mb-2">
                        React Jobs
                    </h3>
                    <p className="text-sm text-gray-400">
                        Find your dream job or the perfect developer for your team.
                    </p>
                </div>

                {/* Links Section */}
                <div className="flex justify-center space-x-6 mb-6">
                    <a
                        href="/about"
                        className="text-gray-400 hover:text-gray-200 text-sm transition-all"
                    >
                        About Us
                    </a>
                    <a
                        href="/contact"
                        className="text-gray-400 hover:text-gray-200 text-sm transition-all"
                    >
                        Contact
                    </a>
                    <a
                        href="/privacy"
                        className="text-gray-400 hover:text-gray-200 text-sm transition-all"
                    >
                        Privacy Policy
                    </a>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-4">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-indigo-500 transition-all"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-indigo-500 transition-all"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-indigo-500 transition-all"
                    >
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>

                {/* Copyright */}
                <div className="mt-6">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} React Jobs. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
