import React from 'react';

interface JobListingCardProps {
    title: string;
    description: string;
    salary: string;
    location: string;
    link: string;
}

const JobListingCard: React.FC<JobListingCardProps> = (props: JobListingCardProps) => {
    const { title, description, salary, location, link } = props;

    return (
        <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-gray-100 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="p-6 flex flex-col h-full">
                {/* Title and Salary */}
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-indigo-300">{title}</h3>
                    <h4 className="text-lg font-medium text-green-400 mt-1">{salary}</h4>
                </div>

                {/* Description */}
                <p className="text-white flex-grow leading-relaxed mb-6">{description}</p>

                {/* Location and Button */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-white flex items-center">
                        <i className="fas fa-map-marker-alt text-indigo-400 mr-2"></i>
                        {location}
                    </p>
                    <a
                        href={link}
                        className="inline-flex items-center bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white font-medium px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-400 hover:via-indigo-500 hover:to-indigo-600 transition-all duration-300"
                    >
                        <i className="fas fa-arrow-right mr-2"></i>
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobListingCard;
