import { ref, onMounted, computed } from 'vue';

// Use a global variable to track if initialization has occurred
let isInitialized = false;

export function useTheme() {
    // Theme state
    const isDark = ref(false);

    // Track initialization state
    const ready = ref(isInitialized);

    // Read theme from localStorage or system preference
    const initializeTheme = () => {
        if (typeof window === 'undefined') return;

        // Get the saved theme
        const savedTheme = localStorage.getItem('theme');

        // Determine what theme to use
        if (savedTheme === 'dark') {
            isDark.value = true;
        } else if (savedTheme === 'light') {
            isDark.value = false;
        } else {
            // Use system preference
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
            // Save the preference
            localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
        }

        // Apply the theme to document
        applyTheme();

        // Mark as initialized
        ready.value = true;
        isInitialized = true;
    };

    // Apply theme to document
    const applyTheme = () => {
        if (typeof window === 'undefined') return;

        if (isDark.value) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Toggle theme function
    const toggleDarkMode = () => {
        isDark.value = !isDark.value;
        applyTheme();
    };

    // Run initialization if client-side and not already initialized
    if (typeof window !== 'undefined' && !isInitialized) {
        initializeTheme();
    }

    // Also initialize on mount for SSR safety
    onMounted(() => {
        if (!ready.value) {
            initializeTheme();
        }
    });

    return {
        isDark,
        toggleDarkMode,
        ready
    };
}