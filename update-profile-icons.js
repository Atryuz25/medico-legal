const fs = require('fs');
const path = require('path');

const profileIcon = `
    <!-- Profile Icon Component -->
    <div class="profile">
        <a href="profile.html" class="profile-link">
            <i class="fas fa-user-circle profile-icon" aria-label="Profile"></i>
            <span class="profile-tooltip">View Profile</span>
        </a>
    </div>`;

const htmlFiles = [
    'html/dashboard.html',
    'html/profile.html',
    'html/notifications.html',
    'html/overview.html',
    'html/settings.html',
    'html/test.html'
];

htmlFiles.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);
    try {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Remove any existing profile divs
        content = content.replace(/<div class=["']profile["']>[\s\S]*?<\/div>/g, '');
        
        // Find the sidebar and insert the profile icon after it starts
        const sidebarRegex = /(<aside class=["']sidebar["']>|<div class=["']sidebar["']>)/;
        if (sidebarRegex.test(content)) {
            content = content.replace(sidebarRegex, `$1\n${profileIcon}`);
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`✅ Updated ${filePath}`);
        } else {
            console.log(`⚠️  Could not find sidebar in ${filePath}`);
        }
    } catch (err) {
        console.error(`❌ Error processing ${filePath}:`, err.message);
    }
});

console.log('Profile icon update complete!');
