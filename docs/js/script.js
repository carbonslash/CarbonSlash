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
