import React from 'react';

const ViewAllJobsButton: React.FC = () => {
    return (
        <section className="m-auto max-w-lg my-10 px-6">
            <a
                href="jobs.html"
                className="block bg-gradient-to-br from-black via-gray-800 to-gray-900 text-gray-100 text-center py-4 px-6 rounded-xl shadow-md hover:bg-gradient-to-br hover:from-gray-700 hover:via-gray-600 hover:to-black hover:text-white transition-all"
            >
                View All Jobs
            </a>
        </section>
    );
};

export default ViewAllJobsButton;
