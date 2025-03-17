import { useAuthStore } from "~/stores/auth";
import { getStringFromStorage } from "~/utils/client";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // Список защищенных маршрутов
    const protectedRoutes = ['/account', '/analytics', '/dashboard'];
    const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route));

    // Список маршрутов для неавторизованных пользователей
    const authRoutes = ['/login', '/register', '/forgot-password'];
    const isAuthRoute = authRoutes.includes(to.path);

    const authStore = useAuthStore();

    // Проверяем наличие токена в localStorage безопасным способом
    const hasToken = !!getStringFromStorage('token');

    // Проверяем статус аутентификации
    const isAuthenticated = authStore.isAuthenticated || hasToken;

    // Список маршрутов, с которых нужно редиректить авторизованных пользователей
    const redirectPaths = ['/', ...authRoutes];
    const shouldRedirect = redirectPaths.includes(to.path);

    // Если пользователь авторизован и пытается зайти на главную или страницы логина/регистрации
    if (isAuthenticated && shouldRedirect) {
        return navigateTo('/dashboard');
    }

    // Если пользователь не авторизован и пытается получить доступ к защищенному маршруту
    if (!isAuthenticated && isProtectedRoute) {
        return navigateTo({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    }
}); 