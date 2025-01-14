import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SectionForDevelopers from './components/SectionForDevelopers';
import SectionForEmployers from './components/SectionForEmployers';
import JobListings from './components/JobListings';
import ViewAllJobsButton from './components/ViewAllJobsButton';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <div className="py-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectionForDevelopers />
          <SectionForEmployers />
        </div>
      </div>
      <JobListings />
      <ViewAllJobsButton />
      <Footer />
    </div>
  );
};

export default App;
