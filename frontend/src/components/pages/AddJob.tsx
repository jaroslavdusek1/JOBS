import React, { useState } from 'react';

const AddJob: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newJob = {
            title,
            description,
            salary,
            location,
        };
        console.log('New Job:', newJob);

        // Reset form
        setTitle('');
        setDescription('');
        setSalary('');
        setLocation('');
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 text-gray-100 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Add a New Job</h2>
            <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Job Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Senior React Developer"
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                        Job Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the job responsibilities"
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                        rows={4}
                        required
                    />
                </div>

                {/* Salary */}
                <div className="mb-4">
                    <label htmlFor="salary" className="block text-sm font-medium mb-1">
                        Salary
                    </label>
                    <input
                        id="salary"
                        type="text"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="e.g. $70,000 - $80,000 / year"
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                {/* Location */}
                <div className="mb-6">
                    <label htmlFor="location" className="block text-sm font-medium mb-1">
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. New York, NY"
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 py-2 rounded shadow-md hover:bg-indigo-700 transition-all"
                >
                    Add Job
                </button>
            </form>
        </div>
    );
};

export default AddJob;
