import React, { useState } from 'react';
import { API_BASE_URL, DEFAULT_HEADERS_AUTH, INTERNAL_ERROR_500, JOB_FAILED, JOB_SUCCESS, JOB_TYPE_DEFAULT } from '../../constants/constants';
import { useAuth } from '../../context/AuthContext';
import { Message as MessageType } from '../../types/Types';
import Spinner from '../Spinner';

const AddJob: React.FC = () => {
    const { user } = useAuth(); // Get the authenticated user
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState(JOB_TYPE_DEFAULT); // Default value
    const [message, setMessage] = useState<MessageType | null>(null); // Message state
    const [loading, setLoading] = useState(false); // Spinner state

    /**
     * Handles form submission for adding a new job.
     * Sends job data to the backend and displays feedback.
     *
     * @async
     * @function
     * @param {React.FormEvent} e - The form submission event.
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newJob = {
            title,
            description,
            salary,
            location,
            job_type: jobType, // Add job_type to the payload
            user_id: user?.id, // Add user_id from the context
        };

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch(`${API_BASE_URL}/jobs`, {
                method: 'POST',
                headers: DEFAULT_HEADERS_AUTH,
                body: JSON.stringify(newJob),
            });

            if (response.ok) {
                setMessage({ text: JOB_SUCCESS, type: 'success' }); // Success message
                // Reset form
                setTitle('');
                setDescription('');
                setSalary('');
                setLocation('');
                setJobType(JOB_TYPE_DEFAULT);
            } else {
                const data = await response.json();
                setMessage({ text: data.error || JOB_FAILED, type: 'error' }); // Error message
            }
        } catch (error) {
            setMessage({ text: INTERNAL_ERROR_500, type: 'error' }); // Network error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Add a New Job</h2>

            {loading && (
                <div className="flex items-center justify-center mb-6">
                    <Spinner />
                </div>
            )}

            {message && (
                <div
                    className={`form-message ${
                        message.type === 'error'
                            ? 'form-message-error'
                            : 'form-message-success'
                    } mb-4 px-4 py-2 rounded shadow`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="job-form-input-desc">
                        Job Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Senior React Developer"
                        className="job-form-input"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="job-form-title">
                        Job Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the job responsibilities"
                        className="job-form-input"
                        rows={4}
                        required
                    />
                </div>

                {/* Salary */}
                <div className="mb-4">
                    <label htmlFor="salary" className="job-form-title">
                        Salary
                    </label>
                    <input
                        id="salary"
                        type="text"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="e.g. $70,000 - $80,000 / year"
                        className="job-form-input"
                        required
                    />
                </div>

                {/* Location */}
                <div className="mb-4">
                    <label htmlFor="location" className="job-form-title">
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. New York, NY"
                        className="job-form-input"
                        required
                    />
                </div>

                {/* Job Type */}
                <div className="mb-6">
                    <label htmlFor="jobType" className="job-form-title">
                        Job Type
                    </label>
                    <select
                        id="jobType"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        className="job-form-input"
                        required
                    >
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="contract">Contract</option>
                        <option value="freelance">Freelance</option>
                        <option value="temporary">Temporary</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Add Job'}
                </button>
            </form>
        </div>
    );
};

export default AddJob;
