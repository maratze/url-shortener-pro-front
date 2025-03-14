import { useAuthStore } from "~/stores/auth";
import { getStringFromStorage } from "~/utils/client";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // Список защищенных маршрутов
    const protectedRoutes = ['/account', '/analytics'];
    const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route));

    // Список маршрутов для неавторизованных пользователей
    const authRoutes = ['/login', '/register'];
    const isAuthRoute = authRoutes.includes(to.path);

    const authStore = useAuthStore();

    // Проверяем наличие токена в localStorage безопасным способом
    const hasToken = !!getStringFromStorage('token');

    // Проверяем статус аутентификации
    const isAuthenticated = authStore.isAuthenticated || hasToken;

    // Если пользователь авторизован и пытается зайти на страницы логина/регистрации
    if (isAuthenticated && isAuthRoute) {
        return navigateTo('/analytics');
    }

    // Если пользователь не авторизован и пытается получить доступ к защищенному маршруту
    if (!isAuthenticated && isProtectedRoute) {
        return navigateTo({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    }
}); 