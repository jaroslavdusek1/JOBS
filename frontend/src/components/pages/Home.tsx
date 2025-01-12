import React from 'react';
import Hero from '../Hero';
import JobListings from '../JobListings';

/**
 * Home Component
 *
 * Represents the home page of the application. Displays a hero section
 * and a list of job postings.
 *
 * @component
 * @returns {JSX.Element} The Home page content.
 */
const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <JobListings />
        </div>
    );
};

export default Home;
