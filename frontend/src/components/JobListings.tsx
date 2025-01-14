import React from 'react';

const JobListings: React.FC = () => {
    return (
        <section className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4 py-10 shadow-inner">
            <div className="container mx-auto max-w-7xl">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                    Browse Jobs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Job Listing Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                Senior React Developer
                            </h3>
                            <p className="mt-4 mb-6 text-gray-700">
                                We are seeking a talented Front-End Developer to join our team in Boston, MA...
                            </p>
                            <h4 className="text-lg font-semibold text-indigo-600 mb-4">
                                $70K - $80K / Year
                            </h4>
                            <a
                                href="job.html"
                                className="inline-block bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white text-sm font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Read More
                            </a>
                        </div>
                    </div>

                    {/* Additional Job Listing Cards */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                Front-End Engineer
                            </h3>
                            <p className="mt-4 mb-6 text-gray-700">
                                Join our innovative team and work on exciting projects in Miami, FL...
                            </p>
                            <h4 className="text-lg font-semibold text-indigo-600 mb-4">
                                $65K - $75K / Year
                            </h4>
                            <a
                                href="job.html"
                                className="inline-block bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white text-sm font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Read More
                            </a>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                React.js Developer
                            </h3>
                            <p className="mt-4 mb-6 text-gray-700">
                                Be part of our development team in Brooklyn, NY, and create amazing applications...
                            </p>
                            <h4 className="text-lg font-semibold text-indigo-600 mb-4">
                                $68K - $78K / Year
                            </h4>
                            <a
                                href="job.html"
                                className="inline-block bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white text-sm font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobListings;
