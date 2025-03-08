import { ref, onMounted, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';

export function useTheme() {
    // Используем useLocalStorage для сохранения темы между сессиями
    const isDark = useLocalStorage('dark-mode', true);

    // Функция переключения темы
    const toggleDarkMode = () => {
        isDark.value = !isDark.value;
        applyTheme();
    };

    // Функция применения темы
    const applyTheme = () => {
        if (isDark.value) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Инициализация темы при загрузке компонента
    const initTheme = () => {
        const theme = localStorage.getItem('theme');
        if (theme === 'light') {
            isDark.value = false;
        } else if (theme === 'dark') {
            isDark.value = true;
        } else {
            // Если тема не задана, проверяем системные предпочтения
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        applyTheme();

        // Настраиваем слушатель изменений системных предпочтений
        setupSystemPreferenceListener();
    };

    // Настройка слушателя системных предпочтений
    const setupSystemPreferenceListener = () => {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        // Обработчик изменения системных предпочтений
        const handleSystemPreferenceChange = (event: MediaQueryListEvent) => {
            // Применяем системные предпочтения, если пользователь
            // явно выбрал следовать системным настройкам (опция "system")
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme === 'system') {
                isDark.value = event.matches;
                applyTheme();
            }
        };

        // Добавляем слушатель
        prefersDarkScheme.addEventListener('change', handleSystemPreferenceChange);

        // Возвращаем функцию для удаления слушателя
        return () => {
            prefersDarkScheme.removeEventListener('change', handleSystemPreferenceChange);
        };
    };

    // Слушаем изменения в isDark и применяем тему
    watch(isDark, () => {
        applyTheme();
    });

    // При монтировании компонента инициализируем тему
    onMounted(() => {
        if (process.client) {
            initTheme();
        }
    });

    return {
        isDark,
        toggleDarkMode,
        applyTheme,
        initTheme
    };
} 