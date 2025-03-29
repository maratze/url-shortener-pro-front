import { useAuthStore } from "~/stores/auth";
import { getStringFromStorage } from "~/utils/client";
import { useToastStore } from "~/stores/toast";

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
            const userData = await authStore.fetchCurrentUser();

            // Проверяем, что данные пользователя были успешно получены
            if (!userData || !authStore.user) {
                console.warn('Auth middleware: failed to fetch user data, redirecting to login');

                // Очищаем токен и состояние авторизации
                authStore.logout();

                // Показываем сообщение пользователю
                if (process.client) {
                    const toastStore = useToastStore();
                    toastStore.error('Ваша сессия истекла. Пожалуйста, войдите снова.');
                }

                // Перенаправляем на страницу входа с сохранением целевого маршрута
                return navigateTo({
                    path: '/login',
                    query: { redirect: to.fullPath }
                });
            }
        } catch (error) {
            console.error('Auth middleware: error fetching user data:', error);

            // Очищаем токен и состояние авторизации
            authStore.logout();

            // Показываем сообщение пользователю
            if (process.client) {
                const toastStore = useToastStore();
                toastStore.error('Ошибка авторизации. Пожалуйста, войдите снова.');
            }

            // Перенаправляем на страницу входа с сохранением целевого маршрута
            return navigateTo({
                path: '/login',
                query: { redirect: to.fullPath }
            });
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