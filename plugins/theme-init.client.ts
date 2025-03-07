export default defineNuxtPlugin(() => {
    if (process.client) {
        const theme = localStorage.getItem('theme') || 'auto';

        if (theme === 'dark' ||
            (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Отслеживание изменений системных предпочтений, если установлен режим auto
        if (theme === 'auto') {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
                if (event.matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            });
        }
    }
});