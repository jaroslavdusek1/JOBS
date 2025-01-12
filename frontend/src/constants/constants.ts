/**
 * 
 */
export const API_BASE_URL = 'http://localhost:8000';

// TOKEN STORAGE
export const TOKEN_STORAGE_KEY = 'authToken';
// This needs better/proper solution
export const TOKEN_STORAGE_GETTER = `${localStorage.getItem(TOKEN_STORAGE_KEY)}`

// HTTP headers
export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

export const DEFAULT_HEADERS_AUTH = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN_STORAGE_GETTER}`,
};

// Messages
export const ERROR_MESSAGE = 'Something went wrong. Please try again.';
export const VALIDATION_ERROR_MESSAGE = 'Please fill out all required fields correctly.';
export const INTERNAL_ERROR_500 = 'Unable to connect to the server. Please try again.';
export const REGISTER_USER_SUCCESS = 'User registered successfully, redirecting to login..';
export const LOGIN_SUCCESS = 'Login successful';
export const LOGIN_FAILED = 'Login failed. Please try again.';
export const LOGIN_VALIDATION_ERROR = 'Email and password are required.';
export const LOGIN_TOKEN_ERROR = 'No token found.';
export const JOB_TYPE_DEFAULT = 'full-time';
export const JOB_SUCCESS = 'Job added successfully.';
export const JOB_FAILED = 'Failed to create job.';
export const JOB_FAILED_FETCH = 'Failed to fetch jobs';
export const JOB_LISTING_FAILED_FETCH = 'Failed to fetch job listings.';


// Validations
export const ERROR_NAME_REQUIRED = 'Name is required';
export const ERROR_SURNAME_REQUIRED = 'Surname is required';
export const ERROR_USERNAME_REQUIRED = 'Username is required';
export const ERROR_INVALID_EMAIL = 'Invalid email address';
export const ERROR_PASSWORD_MIN_LENGTH = 'Password must be at least 6 characters';
export const ERROR_PASSWORDS_DO_NOT_MATCH = 'Passwords do not match';

// Regex patterns
export const EMAIL_REGEX_VALIDATION = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Routes
export const ROUTE_HOME = '/';
export const ROUTE_ADD_JOB = '/add-job';
export const ROUTE_LOGIN = '/login';
export const ROUTE_REGISTER = '/register';
export const ROUTE_JOB_DETAIL = '/jobs/:id';
export const ROUTE_USER_DETAIL = '/user';
export const ROUTE_ABOUT_US = '/about';
export const ROUTE_CONTACT = '/contact';
export const ROUTE_PRIVACY_POLICY = '/privacy';
