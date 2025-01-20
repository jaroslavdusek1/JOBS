/**
 * 
 */
export const API_BASE_URL = 'http://localhost:8000';
export const TOKEN_STORAGE_KEY = 'auth_token';

// HTTP headers
export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

// Messages
// export const SUCCESS_MESSAGE = 'Operation completed successfully.';
export const ERROR_MESSAGE = 'Something went wrong. Please try again.';
export const VALIDATION_ERROR_MESSAGE = 'Please fill out all required fields correctly.';
export const INTERNAL_ERROR_500 = 'Unable to connect to the server. Please try again.';
export const REGISTER_USER_SUCCESS = 'User registered successfully';
export const LOGIN_SUCCESS = 'Login successful';
export const LOGIN_FAILED = 'Login failed. Please try again.';
export const LOGIN_VALIDATION_ERROR = 'Email and password are required.'
export const LOGIN_TOKEN_ERROR = 'No token found.'

// Regex patterns
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

// Routes
export const ROUTE_HOME = '/';
export const ROUTE_ADD_JOB = '/add-job';
export const ROUTE_LOGIN = '/login';
export const ROUTE_PROFILE = '/profile';
export const ROUTE_REGISTER = '/register';
export const ROUTE_JOB_DETAIL = '/job-detail/:id';
