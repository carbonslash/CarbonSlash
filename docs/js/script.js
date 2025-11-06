/* --- THEME TOGGLE LOGIC --- */

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // 1. Function to set the theme based on the class
    function applyTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            toggleButton.textContent = ' Light';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            toggleButton.textContent = ' Dark';
            localStorage.setItem('theme', 'light');
        }
    }

    // 2. Load the saved theme preference from local storage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark') {
        applyTheme(true);
    } else if (savedTheme === 'light') {
        applyTheme(false);
    } else if (prefersDark) {
        // Fallback: Use the operating system's preference if no theme is saved
        applyTheme(true);
    } else {
        // Default to light mode
        applyTheme(false);
    }

    // 3. Add the click listener to switch the theme
    toggleButton.addEventListener('click', () => {
        const isCurrentlyDark = body.classList.contains('dark-mode');
        applyTheme(!isCurrentlyDark); // Toggle the current theme
    });
});
// Add a class to prevent FOUT initially
document.documentElement.classList.add('fonts-loading');

if ('fonts' in document) {
    // Wait for all fonts to load
    document.fonts.ready.then(function() {
        // Remove the loading class once fonts are ready
        document.documentElement.classList.remove('fonts-loading');
        document.documentElement.classList.add('fonts-loaded');
    }).catch(function(err) {
        console.error('Font loading failed:', err);
        // Fallback: remove loading class anyway
        document.documentElement.classList.remove('fonts-loading');
    });
} else {
    // Fallback for browsers without the Font Loading API
    window.addEventListener('load', function() {
        document.documentElement.classList.remove('fonts-loading');
        document.documentElement.classList.add('fonts-loaded');
    });
}
