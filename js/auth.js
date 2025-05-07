// API base URL
const API_BASE_URL = 'http://localhost:3001/api';

// Function to handle user login
async function login(userType, id, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userType, id, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store token and user type in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userType', data.userType);
            return { success: true, data };
        } else {
            return { success: false, message: data.message || 'Login failed' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
}

// Function to handle user registration
async function register(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            return { success: false, message: data.message || 'Registration failed' };
        }
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
}

// Function to check if user is authenticated
function isAuthenticated() {
    return !!localStorage.getItem('token');
}

// Function to get current user's token
function getToken() {
    return localStorage.getItem('token');
}

// Function to get current user's type
function getUserType() {
    return localStorage.getItem('userType');
}

// Function to logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    window.location.href = '/index.html';
}

// Function to redirect to dashboard based on user type
function redirectToDashboard() {
    const userType = getUserType();
    if (!userType) {
        window.location.href = '/index.html';
        return;
    }

    const dashboardPaths = {
        'admin': '/html/admin/dashboard.html',
        'medical': '/html/medical/dashboard.html',
        'legal': '/html/legal/dashboard.html',
        'patient': '/html/patient/dashboard.html'
    };

    const dashboardPath = dashboardPaths[userType] || '/index.html';
    window.location.href = dashboardPath;
}

// Function to protect routes
function protectRoute() {
    if (!isAuthenticated()) {
        window.location.href = '/index.html';
        return false;
    }
    return true;
}

export {
    login,
    register,
    isAuthenticated,
    getToken,
    getUserType,
    logout,
    redirectToDashboard,
    protectRoute
};
