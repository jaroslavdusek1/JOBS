import React from 'react';

const SectionForEmployers: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-indigo-700">For Employers</h2>
            <p className="mt-2 mb-4 text-indigo-600">
                List your job to find the perfect developer for the role
            </p>
            <a
                href="/add-job.html"
                className="inline-block bg-indigo-600 text-white font-medium rounded-full px-6 py-3 shadow-md hover:bg-indigo-700 transition-all"
            >
                Add Job
            </a>
        </div>
    );
};

export default SectionForEmployers;
