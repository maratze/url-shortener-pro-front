import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(async () => {
    // Проверяем, что мы на клиенте, прежде чем использовать localStorage
    if (!process.client) {
        return;
    }

    const authStore = useAuthStore();

    // Проверяем, есть ли токен в localStorage
    const token = localStorage.getItem('token');

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
}); 