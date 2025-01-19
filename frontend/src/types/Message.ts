/**
 * Interface for a generic message.
 */
export interface Message {
    text: string;
    type: 'success' | 'error' | 'info';
}

/**
 * Interface for the `Message` component.
 * Extends the basic message with a property for closing the message.
 */
export interface MessageProps extends Message {
    onClose: () => void;
}
