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

    console.log(`Auth middleware: route ${to.path}, token exists: ${hasToken}, store authenticated: ${authStore.isAuthenticated}`);

    // Если есть токен в localStorage, но нет в store, устанавливаем его
    if (hasToken && !authStore.token) {
        const token = getStringFromStorage('token');
        console.log('Auth middleware: restoring token from localStorage to store');
        authStore.setToken(token);
    }

    // Если мы переходим на защищенный маршрут, попробуем получить данные пользователя,
    // если в store нет пользователя, но есть токен
    if (isProtectedRoute && hasToken && !authStore.user) {
        console.log('Auth middleware: fetching user data before accessing protected route');
        try {
            await authStore.fetchCurrentUser();
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    }

    // Проверяем статус аутентификации
    // Теперь isAuthenticated в authStore должен быть обновлен после fetchCurrentUser
    const isAuthenticated = authStore.isAuthenticated;

    // Список маршрутов, с которых нужно редиректить авторизованных пользователей
    const redirectPaths = ['/', ...authRoutes];
    const shouldRedirect = redirectPaths.includes(to.path);

    // Если пользователь авторизован и пытается зайти на главную или страницы логина/регистрации
    if (isAuthenticated && shouldRedirect) {
        console.log('Auth middleware: redirect authenticated user to dashboard');
        return navigateTo('/dashboard');
    }

    // Если пользователь не авторизован и пытается получить доступ к защищенному маршруту
    if (!isAuthenticated && isProtectedRoute) {
        console.log('Auth middleware: redirect unauthenticated user to login');
        return navigateTo({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    }
}); 