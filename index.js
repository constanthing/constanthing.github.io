
// Parse query parameters
// Parse hash parameters (privacy-friendly, stays client-side)
const hash = window.location.hash.substring(1); // Remove '#'
const params = new URLSearchParams(hash);
const targetUrl = params.get('url');
const title = params.get('title');

// Set document title
if (title) {
    document.title = title;
    document.getElementById('page-title').textContent = title;
}

// Try to set favicon (this works best if you have access to chrome://favicon or _favicon)
// For now, we rely on Chrome's default behavior or the generic icon
const link = document.getElementById('favicon');
try {
    const urlObj = new URL(targetUrl);
    link.href = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
} catch (e) {
    // Invalid URL
}

function restore() {
    if (targetUrl) {
        window.location.replace(targetUrl);
    }
}


// Redirect when the tab becomes visible
if (document.visibilityState === 'visible') {
    restore();
} else {
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            restore();
        }
    });
}
