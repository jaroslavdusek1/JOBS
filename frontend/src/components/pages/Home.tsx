import React from 'react';
import Hero from '../Hero';
import JobListings from '../JobListings';

const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <JobListings />
        </div>
    );
};

export default Home;
