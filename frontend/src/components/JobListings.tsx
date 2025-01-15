import React from 'react';
import JobListingCard from './JobListingCard';

const JobListings: React.FC = () => {

    const jobData = [
        {
            title: 'Front-End Engineer',
            description: 'Join our innovative team and work on exciting projects in Miami, FL...',
            salary: '$65K - $75K / Year',
            location: 'Miami, FL',
            link: 'job.html',
        },
        {
            title: 'React.js Developer',
            description: 'Be part of our development team in Brooklyn, NY, and create amazing applications...',
            salary: '$68K - $78K / Year',
            location: 'Brooklyn, NY',
            link: 'job.html',
        },
        {
            title: 'Senior React Developer',
            description: 'We are seeking a talented Front-End Developer to join our team in Boston, MA...',
            salary: '$70K - $80K / Year',
            location: 'Boston, MA',
            link: 'job.html',
        },
        {
            title: 'Front-End Engineer',
            description: 'Join our innovative team and work on exciting projects in Miami, FL...',
            salary: '$65K - $75K / Year',
            location: 'Miami, FL',
            link: 'job.html',
        },
        {
            title: 'React.js Developer',
            description: 'Be part of our development team in Brooklyn, NY, and create amazing applications...',
            salary: '$68K - $78K / Year',
            location: 'Brooklyn, NY',
            link: 'job.html',
        },
        {
            title: 'Senior React Developer',
            description: 'We are seeking a talented Front-End Developer to join our team in Boston, MA...',
            salary: '$70K - $80K / Year',
            location: 'Boston, MA',
            link: 'job.html',
        },
    ];

    return (
        <section className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4 py-10 shadow-inner">
            <div className="container mx-auto max-w-7xl">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                    Jobs.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Job Listing Card */}
                    {jobData.map((job, index) => (
                        <JobListingCard
                            key={index}
                            title={job.title}
                            description={job.description}
                            salary={job.salary}
                            location={job.location}
                            link={job.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JobListings;
