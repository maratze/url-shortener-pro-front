import { useAuthStore } from "~/stores/auth";
import { useAuth } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // Добавляем небольшую задержку для инициализации состояния
    await new Promise(resolve => setTimeout(resolve, 50));

    const authStore = useAuthStore();
    const { status } = useAuth();

    // Проверяем наличие токена в localStorage (теперь всегда на клиенте)
    const hasToken = !!localStorage.getItem('token');

    // Проверяем статус аутентификации
    const isAuthenticated = authStore.isAuthenticated || status.value === 'authenticated' || hasToken;

    // Список защищенных маршрутов
    const protectedRoutes = ['/account', '/analytics'];
    const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route));

    // Список маршрутов для неавторизованных пользователей
    const authRoutes = ['/login', '/register'];
    const isAuthRoute = authRoutes.includes(to.path);

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