export default defineNuxtPlugin(() => {
    // This runs on client-side only
    if (process.client) {
        // Add this to block rendering until theme is applied
        document.documentElement.classList.add('not-ready');

        // Get saved theme or use system preference
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            // If no saved preference, check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            // Save the detected preference
            localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
        }

        // Make content visible again
        setTimeout(() => {
            document.documentElement.classList.remove('not-ready');
        }, 0);
    }
});