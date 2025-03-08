import { useTheme } from '~/composables/useTheme';

export default defineNuxtPlugin(() => {
    if (process.client) {
        // Инициализируем тему в глобальном контексте приложения
        const { initTheme } = useTheme();
        initTheme();
    }
});