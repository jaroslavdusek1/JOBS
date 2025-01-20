/**
 * Type definition for the authentication context.
 * @typedef {Object} AuthContextType
 * @property {string | null} token - The authentication token for the user.
 * @property {(token: string | null) => void} setToken - Setter to update the authentication token.
 */
 export interface AuthState {
    token: string | null;
    setToken: (token: string | null) => void;
}