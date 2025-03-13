import { useAuthStore } from "~/stores/auth";
import { useAuth } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // Получаем статус аутентификации из Auth.js и нашего хранилища
    const authStore = useAuthStore();
    const { status } = useAuth();

    // Проверяем статус аутентификации - используем .value для получения значения из ComputedRef
    const isAuthenticated = authStore.isAuthenticated || status.value === 'authenticated';

    // Если пользователь не аутентифицирован и пытается получить доступ к защищенному маршруту
    if (!isAuthenticated) {
        // Перенаправляем на страницу входа с редиректом обратно на исходный маршрут
        return navigateTo({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    }
}); 