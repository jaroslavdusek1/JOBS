// TSDoc

/**
 * Represents the structure of a job object.
 */
export interface Job {
    /** The unique identifier of the job. */
    id: number;
    /** The title of the job. */
    title: string;
    /** A detailed description of the job. */
    description: string;
    /** The salary offered for the job. */
    salary: string;
    /** The location where the job is based. */
    location: string;
    /** The type of job, such as 'full-time' or 'part-time'. */
    job_type: string;
    /** (Optional) The ID of the user who posted the job. */
    user_id?: number;
    /** (Optional) The date and time when the job was created. */
    created_at?: string;
    /** (Optional) The date and time when the job was last updated. */
    updated_at?: string;
}

/**
 * Represents the properties required for a job listing card component.
 */
export interface JobListingCardProps {
    /** The title of the job listing. */
    title: string;
    /** A brief description of the job. */
    description: string;
    /** The salary offered for the job. */
    salary: string;
    /** The location where the job is based. */
    location: string;
    /** The URL link to the job details page. */
    link: string;
}

/**
 * Represents the form data structure for a user.
 */
export interface UserFormData {
    /** The first name of the user. */
    name: string;
    /** The last name of the user. */
    surname: string;
    /** The username chosen by the user. */
    username: string;
    /** The email address of the user. */
    email: string;
    /** The user's password. */
    password?: string;
    /** (Optional) Confirmation of the user's password. */
    password_confirmation?: string;
}

/**
 * Represents a generic message interface.
 */
export interface Message {
    /** The message text content. */
    text: string;
    /** The type of the message, such as 'success', 'error', or 'info'. */
    type: 'success' | 'error' | 'info';
}

/**
 * Extends the `Message` interface to include additional properties for message handling.
 */
export interface MessageProps extends Message {
    /** A callback function triggered to close the message. */
    onClose: () => void;
}

/**
 * Represents the properties for a private route component.
 */
export interface PrivateRouteProps {
    /** The child component to render within the private route. */
    children: JSX.Element;
}

/**
 * Represents a user in the system.
 */
export interface User {
    /** The unique identifier of the user. */
    id: number;
    /** The first name of the user. */
    name: string;
    /** The email address of the user. */
    email: string;
    /** The surname (last name) of the user. */
    surname: string;
    /** The username chosen by the user. */
    username: string;
}

/**
 * Represents the state and actions for user authentication.
 */
export interface AuthState {
    /** Indicates whether the user is authenticated. */
    isAuthenticated: boolean;
    /**
     * Sets the authentication status of the user.
     *
     * @param {boolean} value - The new authentication status.
     */
    setIsAuthenticated: (value: boolean) => void;
    /** The currently authenticated user, or `null` if no user is authenticated. */
    user: User | null;
    /**
     * Updates the current user object in the authentication state.
     *
     * @param {User | null} user - The user to set in the state, or `null` to clear the user.
     */
    setUser: (user: User | null) => void;
    /**
     * Logs the user out and performs cleanup actions.
     *
     * @returns {Promise<void>} A promise that resolves when the logout process is complete.
     */
    logout: () => Promise<void>;
}
