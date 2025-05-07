// Import auth functions
import { getUserType, logout, protectRoute } from './auth.js';

// Function to initialize dashboard
function initDashboard() {
    // Check if user is authenticated
    if (!protectRoute()) {
        return;
    }

    // Get user type and update UI
    const userType = getUserType();
    updateDashboardForUserType(userType);

    // Add logout event listener
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}

// Function to update dashboard based on user type
function updateDashboardForUserType(userType) {
    // Update welcome message
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        const roleNames = {
            'admin': 'Administrator',
            'medical': 'Medical Staff',
            'legal': 'Legal Professional',
            'patient': 'Patient'
        };
        welcomeMessage.textContent = `Welcome, ${roleNames[userType] || 'User'}`;
    }

    // Update dashboard stats (example - you can modify this based on your needs)
    updateDashboardStats(userType);
}

// Function to update dashboard statistics
async function updateDashboardStats(userType) {
    try {
        // Example: Fetch stats from the server based on user type
        // const response = await fetch('/api/stats', {
        //     headers: {
        //         'Authorization': `Bearer ${getToken()}`
        // }
        // });
        // const stats = await response.json();

        // For now, we'll use placeholder data
        const stats = {
            admin: { records: 0, users: 0, logs: 0 },
            medical: { patients: 0, records: 0, appointments: 0 },
            legal: { cases: 0, requests: 0, documents: 0 },
            patient: { records: 0, consents: 0, requests: 0 }
        }[userType] || {};

        // Update the UI with the stats
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            const statName = card.querySelector('h3').textContent.toLowerCase();
            const statValue = stats[statName] || 0;
            card.querySelector('.stat-number').textContent = statValue;
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);
