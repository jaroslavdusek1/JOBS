import React from 'react';
import { JobListingCardProps } from '../types/Types';

/**
 * JobListingCard Component - Displays a card with job details.
 *
 * @component
 * @param {JobListingCardProps} props - Props containing job details like title, description, salary, location, and link.
 * @returns {JSX.Element} Rendered JobListingCard component.
 */
const JobListingCard: React.FC<JobListingCardProps> = (props: JobListingCardProps) => {
    const { title, description, salary, location, link } = props;

    return (
        <div className="job-card">
            <div className="job-card-content">
                {/* Title and Salary */}
                <div className="job-card-header">
                    <h3 className="job-card-title">{title}</h3>
                    <h4 className="job-card-salary">{salary}</h4>
                </div>

                {/* Description */}
                <p className="job-card-description">{description}</p>

                {/* Location and Button */}
                <div className="job-card-footer">
                    <p className="job-card-location">
                        <i className="fas fa-map-marker-alt location-icon"></i>
                        {location}
                    </p>
                    <a href={link} className="job-card-button">
                        <i className="fas fa-arrow-right button-icon"></i>
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobListingCard;
