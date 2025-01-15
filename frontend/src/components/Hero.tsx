import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 mb-4 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 flex flex-col items-center">
                <div className="text-center">
                <h1 className="text-4xl font-extrabold text-indigo-300 sm:text-5xl md:text-6xl font-poppins ">
                        Become a React Dev
                    </h1>
                    <p className="my-4 text-xl italic text-gray-400 font-poppins">
                        Find the job that fits your skills and needs.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
