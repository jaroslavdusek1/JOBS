/**
 * Sanitizes input by allowing only specific characters.
 * @param input - The input string to sanitize.
 * @returns The sanitized string.
 */
export const sanitizeInput = (input: string, allowSpecialChars = false): string => {
    if (allowSpecialChars) {
        // For passwords, allow all characters
        return input.trim();
    }

    // For other fields, allow only alphanumeric characters, @, and .
    return input
        .trim()
        .replace(/[^a-zA-Z0-9@.]/g, '') // Remove all characters except a-z, A-Z, 0-9, @, and .
        .replace(/\s+/g, ' '); // Normalize whitespace
};

/**
 * Validates if a given email is in a valid email format.
 * 
 * @param {string} email - The email string to be validated.
 * @returns {boolean} True if the email is valid, otherwise false.
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates if a password meets the minimum length requirement.
 * 
 * @param {string} password - The password string to be validated.
 * @returns {boolean} True if the password is valid, otherwise false.
 */
export const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
};

/**
 * Validates the entire form data and returns the validation result.
 * 
 * @param {Record<string, string>} formData - An object containing the form data.
 * @returns {Object} An object containing the validation result.
 * @returns {boolean} valid - True if all fields are valid, otherwise false.
 * @returns {Record<string, string>} errors - A record of errors, where each key is the field name and the value is the error message.
 */
export const validateForm = (formData: Record<string, string>): { valid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (!formData.name) {
        errors.name = 'Name is required';
    }

    if (!formData.surname) {
        errors.surname = 'Surname is required';
    }

    if (!formData.username) {
        errors.username = 'Username is required';
    }

    if (!formData.email || !isValidEmail(formData.email)) {
        errors.email = 'Invalid email address';
    }

    if (!formData.password || !isValidPassword(formData.password)) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.password_confirmation) {
        errors.password_confirmation = 'Passwords do not match';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};
