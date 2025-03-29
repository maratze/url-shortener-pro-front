// Создаю плагин для перехвата ошибок API запросов
import { useAuthStore } from '~/stores/auth';
import { useToastStore } from '~/stores/toast';

// Глобальная переменная для отслеживания активного редиректа
let isRedirecting = false;

export default defineNuxtPlugin(async (nuxtApp) => {
    // Добавляем перехватчик для $fetch, который используется для API запросов
    nuxtApp.hook('app:created', () => {
        globalThis.$fetch = new Proxy(globalThis.$fetch, {
            apply: async (target, thisArg, argumentsList) => {
                try {
                    // Пробуем выполнить оригинальный запрос
                    return await Reflect.apply(target, thisArg, argumentsList);
                } catch (error) {
                    // Проверяем, связана ли ошибка с проблемами аутентификации (401)
                    if (error.response?.status === 401) {
                        // Если пользователь уже перенаправляется, не делаем ничего
                        if (!isRedirecting) {
                            isRedirecting = true;
                            console.log('API interceptor: 401 Unauthorized error, logging out');

                            // Получаем экземпляры хранилищ
                            const authStore = useAuthStore();
                            const toastStore = useToastStore();

                            // Выходим из системы
                            authStore.logout();

                            // Показываем сообщение
                            toastStore.error('Ваша сессия истекла. Пожалуйста, войдите снова.');

                            // Запоминаем текущий путь для редиректа после авторизации
                            const router = useRouter();
                            const currentRoute = router.currentRoute.value;
                            const currentPath = currentRoute.fullPath;

                            // Перенаправляем на страницу входа с задержкой
                            setTimeout(() => {
                                // Проверяем, не пытаемся ли мы перенаправить с уже защищенного маршрута
                                if (!currentRoute.path.startsWith('/login')) {
                                    navigateTo(`/login?redirect=${encodeURIComponent(currentPath)}`);
                                }

                                // Сбрасываем флаг редиректа
                                setTimeout(() => {
                                    isRedirecting = false;
                                }, 500);
                            }, 100);
                        }
                    }

                    // В любом случае продолжаем выбрасывать ошибку для дальнейшей обработки
                    throw error;
                }
            }
        });
    });
}); 