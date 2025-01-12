import React from 'react';

/**
 * Spinner Component - Displays a loading spinner for asynchronous operations.
 *
 * @component
 * @returns {JSX.Element} The rendered Spinner component.
 */
const Spinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
    );
};

export default Spinner;
