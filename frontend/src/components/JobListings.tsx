import React, { useEffect, useState } from 'react';
import JobListingCard from './JobListingCard';
import Spinner from './Spinner'; // Spinner component
import { API_BASE_URL, DEFAULT_HEADERS, INTERNAL_ERROR_500, JOB_LISTING_FAILED_FETCH } from '../constants/constants';
import { Job } from '../types/Types';

/**
 * Component to fetch and display a list of job listings.
 *
 * @component
 * @returns {JSX.Element} The rendered JobListings component.
 */
const JobListings: React.FC = () => {
    const [jobData, setJobData] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches job data from the API.
     *
     * @async
     * @function
     * @returns {Promise<void>}
     */
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${API_BASE_URL}/jobs`, {
                    method: 'GET',
                    headers: DEFAULT_HEADERS,
                });

                if (response.ok) {
                    const data = await response.json();
                    setJobData(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || JOB_LISTING_FAILED_FETCH);
                }
            } catch (error) {
                setError(error.message || INTERNAL_ERROR_500);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <section className="job-listings-section">
            <div className="job-listings-container">
                <h2 className="job-listings-heading">Available List</h2>

                {loading ? (
                    <div className="job-listings-spinner">
                        <Spinner />
                    </div>
                ) : error ? (
                    <div className="job-listings-error">{error}</div>
                ) : (
                    <div className="job-listings-grid">
                        {jobData.map((job) => (
                            <JobListingCard
                                key={job.id}
                                title={job.title}
                                description={job.description}
                                salary={job.salary}
                                location={job.location}
                                link={`/jobs/${job.id}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default JobListings;
