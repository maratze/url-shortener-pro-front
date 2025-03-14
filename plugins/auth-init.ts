import { useAuthStore } from '~/stores/auth';
import { getStringFromStorage } from '~/utils/client';

export default defineNuxtPlugin((nuxtApp) => {
    // Определяем функцию инициализации аутентификации
    const initAuth = async () => {
        const authStore = useAuthStore();

        // Безопасно получаем токен из localStorage
        const token = getStringFromStorage('token');

        if (token) {
            // Если токен существует, устанавливаем его и пытаемся получить данные пользователя
            authStore.setToken(token);
            try {
                await authStore.fetchCurrentUser();
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                // В случае ошибки, сбрасываем аутентификацию
                authStore.logout();
            }
        }
    };

    // Используем хук onMounted для инициализации аутентификации после загрузки приложения
    nuxtApp.hook('app:mounted', async () => {
        await initAuth();
    });
}); 