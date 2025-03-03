import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to) => {
    // Выполняется только на стороне клиента
    if (process.client) {
        const authStore = useAuthStore();

        // Инициализация состояния из localStorage
        if (!authStore.isAuthenticated) {
            await authStore.initialize();
        }

        // Если пользователь не авторизован, перенаправляем на страницу логина
        if (!authStore.isAuthenticated) {
            return navigateTo({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    }
});