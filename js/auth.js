/**
 * Authentication Module
 * Simple password-based authentication with localStorage session management
 */

const AUTH_PASSWORD = 'pigeon2024';
const AUTH_KEY = 'pigeon_authenticated';
const AUTH_TIMESTAMP_KEY = 'pigeon_auth_timestamp';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated and session is valid
 */
function isAuthenticated() {
    const authenticated = localStorage.getItem(AUTH_KEY) === 'true';
    const timestamp = localStorage.getItem(AUTH_TIMESTAMP_KEY);
    
    if (!authenticated || !timestamp) {
        return false;
    }
    
    // Check if session has expired
    const now = Date.now();
    const sessionTime = parseInt(timestamp, 10);
    
    if (now - sessionTime > SESSION_DURATION) {
        // Session expired
        clearAuthentication();
        return false;
    }
    
    return true;
}

/**
 * Authenticate user with password
 * @param {string} password - The password to check
 * @returns {boolean} True if password is correct
 */
function authenticate(password) {
    if (password === AUTH_PASSWORD) {
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(AUTH_TIMESTAMP_KEY, Date.now().toString());
        return true;
    }
    return false;
}

/**
 * Clear authentication
 */
function clearAuthentication() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_TIMESTAMP_KEY);
}

/**
 * Check authentication and redirect if not authenticated
 * @param {string} redirectTo - URL to redirect to if not authenticated (default: welcome.html)
 */
function requireAuth(redirectTo = 'welcome.html') {
    if (!isAuthenticated()) {
        window.location.href = redirectTo;
    }
}

// Expose globally
window.isAuthenticated = isAuthenticated;
window.authenticate = authenticate;
window.clearAuthentication = clearAuthentication;
window.requireAuth = requireAuth;

