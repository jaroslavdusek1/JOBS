import React, { useEffect } from 'react';
import { MessageProps } from '../types/Types';

/**
 * Message Component - Displays a message with an optional type and auto-close functionality.
 *
 * @component
 * @param {object} props - Component props.
 * @param {string} props.message - The message to display.
 * @param {'success' | 'error' | 'info'} [props.type='info'] - The type of the message (success, error, or info).
 * @param {() => void} props.onClose - Function to close the message.
 * @returns {JSX.Element} The rendered Message component.
 */
const Message: React.FC<MessageProps> = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        // Auto-close the message after 3 seconds
        const timer = setTimeout(() => onClose(), 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const getColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500 border-green-700';
            case 'error':
                return 'bg-red-500 border-red-700';
            default:
                return 'bg-blue-500 border-blue-700';
        }
    };

    return (
        <div
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-4 rounded-lg shadow-xl text-white border-2 ${getColor()}`}
            style={{ zIndex: 1000, width: '90%', maxWidth: '600px' }}
        >
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    {/* Icon based on type */}
                    {type === 'success' && (
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                    {type === 'error' && (
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    )}
                    {type === 'info' && (
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M12 18h.01"
                            />
                        </svg>
                    )}
                </div>
                <div>
                    <p className="text-lg font-bold">{type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info'}</p>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Message;
