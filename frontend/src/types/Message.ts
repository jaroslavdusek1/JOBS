export interface MessageProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    onClose: () => void;
}