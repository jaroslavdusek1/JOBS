import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, INTERNAL_ERROR_500 } from '../../constants/constants';
import Spinner from '../Spinner';
import { Job } from '../../types/Types'

/**
 * Displays the details of a job based on the job ID retrieved from the URL parameters.
 *
 * @component
 * @returns {JSX.Element} The rendered JobDetail component.
 */
const JobDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches job details from the backend based on the job ID.
     *
     * @async
     * @function
     * @returns {Promise<void>}
     */
    useEffect(() => {
        const fetchJobDetail = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json();
                    setJob(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || 'Failed to fetch job details.');
                }
            } catch (err) {
                setError(INTERNAL_ERROR_500);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJobDetail();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="job-detail-container">
            {job ? (
                <>
                    <div className="p-6">
                        {/* Title and Job Type */}
                        <div className="mb-6">
                            <h1 className="job-title">{job.title}</h1>
                            <p className="job-type">{job.job_type}</p>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h2 className="section-title">Job Description</h2>
                            <p className="section-content">{job.description}</p>
                        </div>

                        {/* Details */}
                        <div className="details-grid">
                            <div>
                                <h3 className="detail-title">Salary</h3>
                                <p className="detail-value">{job.salary}</p>
                            </div>
                            <div>
                                <h3 className="detail-title">Location</h3>
                                <p className="detail-value">{job.location}</p>
                            </div>
                        </div>

                        {/* Posted Date */}
                        <div>
                            <h3 className="detail-title">Posted On</h3>
                            <p className="detail-value">
                                {new Date(job.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex justify-end mt-6">
                        <button className="apply-button">Apply</button>
                    </div>
                </>
            ) : (
                <p className="text-gray-100">No job found for ID: {id}</p>
            )}
        </div>
    );
};

export default JobDetail;
