import React from 'react';

/**
 * About Us Component
 *
 * Displays information about the Jobs platform.
 *
 * @returns {JSX.Element} The About Us page content.
 */

export const AboutUs: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-800 text-gray-100 rounded-lg shadow-2xl mt-10">
            <h2 className="text-4xl font-bold mb-6 text-indigo-300">About Us</h2>
            <p className="mb-6 leading-relaxed">
                Welcome to Jobs, your trusted partner in bridging the gap between skilled professionals and organizations worldwide. Our platform is designed to simplify the hiring process while providing job seekers with unparalleled opportunities to grow their careers.
            </p>
            <p className="mb-6 leading-relaxed">
                At Jobs, we understand the challenges of finding the right fit. That’s why we’ve built a user-friendly platform where employers can effortlessly post vacancies, and candidates can easily explore opportunities tailored to their expertise and interests.
            </p>
            <p className="leading-relaxed">
                Join the thousands of individuals and companies who trust Jobs to connect talent with opportunity. Together, let’s build a future where work isn’t just a necessity but a passion.
            </p>
        </div>
    );
};

/**
 * Contact Component
 *
 * Provides contact information.
 *
 * @returns {JSX.Element} The Contact Us page content.
 */
export const Contact: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-800 text-gray-100 rounded-lg shadow-2xl mt-10">
            <h2 className="text-4xl font-bold mb-6 text-indigo-300">Contact Us</h2>
            <p className="mb-6 leading-relaxed">
                Have a question, feedback, or need assistance? Our team is here to ensure you have a seamless experience. Whether you're an employer looking to hire or a job seeker eager to explore opportunities, we’d love to hear from you.
            </p>
            <ul className="list-disc list-inside mb-6">
                <li className="mb-3">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:support@jobs.com" className="text-indigo-400 hover:underline">
                        support@jobs.com
                    </a>
                </li>
                <li className="mb-3">
                    <strong>Phone:</strong>{' '}
                    <a href="tel:+1234567890" className="text-indigo-400 hover:underline">
                        +1 (234) 567-890
                    </a>
                </li>
                <li>
                    <strong>Address:</strong> 123 Jobs Street, Employment City, Jobland
                </li>
            </ul>
            <p className="leading-relaxed">
                We value your input and are committed to providing the best possible service. Reach out today, and let us help you achieve your goals.
            </p>
        </div>
    );
};

/**
 * Privacy Policy Component
 *
 * Outlines the platform's data collection, usage, and security policies.
 *
 * @returns {JSX.Element} The Privacy Policy page content.
 */
export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-800 text-gray-100 rounded-lg shadow-2xl mt-10">
            <h2 className="text-4xl font-bold mb-6 text-indigo-300">Privacy Policy</h2>
            <p className="mb-6 leading-relaxed">
                At Jobs, your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our platform.
            </p>
            <p className="mb-6 leading-relaxed">
                <strong>Information Collection:</strong> We collect only the information necessary to provide you with our services. This includes your name, email address, resume details, and other relevant data.
            </p>
            <p className="mb-6 leading-relaxed">
                <strong>Usage of Information:</strong> Your data helps us connect you with potential employers or job seekers. We do not sell your information to third parties and use it solely for improving our services.
            </p>
            <p className="mb-6 leading-relaxed">
                <strong>Data Security:</strong> We employ advanced security measures to protect your data from unauthorized access, ensuring a secure experience for all users.
            </p>
            <p className="leading-relaxed">
                For further inquiries about our privacy practices, contact us at{' '}
                <a href="mailto:privacy@jobs.com" className="text-indigo-400 hover:underline">
                    privacy@jobs.com
                </a>
                . Thank you for trusting Jobs with your personal information.
            </p>
        </div>
    );
};
