import React from 'react';

/**
 * Footer Component - Displays the footer section with links, social media icons, and copyright notice.
 *
 * @component
 * @returns {JSX.Element} Rendered Footer component.
 */
const Footer: React.FC = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* Main Footer Content */}
                <div className="footer-main">
                    <h3 className="footer-title">Jobs.</h3>
                    <p className="footer-description">
                        Find your dream job or the perfect developer for your team.
                    </p>
                </div>

                {/* Links Section */}
                <div className="footer-links">
                    <a href="/about" className="footer-link">
                        About Us
                    </a>
                    <a href="/contact" className="footer-link">
                        Contact
                    </a>
                    <a href="/privacy" className="footer-link">
                        Privacy Policy
                    </a>
                </div>

                {/* Social Media Icons */}
                <div className="footer-social-icons">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social-icon"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social-icon"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social-icon"
                    >
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>

                {/* Copyright */}
                <div className="footer-copyright">
                    <p>
                        &copy; {new Date().getFullYear()} Jobs. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
