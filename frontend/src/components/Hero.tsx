import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 mb-4 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-indigo-300 sm:text-5xl md:text-6xl">
                        Become a React Dev
                    </h1>
                    <p className="my-4 text-xl text-gray-300">
                        Find the React job that fits your skills and needs
                    </p>
                    <a
                        href="/jobs"
                        className="mt-6 inline-block px-6 py-3 text-lg font-medium text-gray-100 bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition-all"
                    >
                        Browse Jobs
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
