import React from 'react';

/**
 * Hero Component - Displays a banner with a title and tagline for the job listing platform.
 *
 * @component
 * @returns {JSX.Element} Rendered Hero component.
 */
const Hero: React.FC = () => {
    return (
        <section className="hero-container">
            <div className="hero-content">
                <div className="hero-text">
                    <h1 className="hero-title font-poppins">Jobs.</h1>
                    <p className="hero-subtitle font-poppins">
                        Find the job that fits your skills and needs.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
