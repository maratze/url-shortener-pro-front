import { computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { LoginRequest, RegisterRequest, UserResponse, OAuthRequest } from '~/types/auth';
import { useAuth } from '#imports';

/**
 * Композабл для работы с аутентификацией
 * Объединяет работу с Auth.js/NextAuth и нашим кастомным API
 */
export const useAuthService = () => {
    const { data: session, status, signOut } = useAuth();
    const authStore = useAuthStore();

    /**
     * Статус аутентификации на основе Auth.js и пользовательского API
     */
    const isAuthenticated = computed(() => {
        return authStore.isAuthenticated || (status.value === 'authenticated');
    });

    /**
     * Данные пользователя, объединенные из всех источников
     */
    const user = computed(() => {
        return authStore.user || session.value?.user;
    });

    /**
     * Имеет ли пользователь премиум статус
     */
    const isPremium = computed(() => {
        return !!authStore.user?.isPremium;
    });

    /**
     * Статус загрузки
     */
    const loading = computed(() => {
        return authStore.loading || status.value === 'loading';
    });

    /**
     * Функция для входа в систему
     * @param loginData Данные для входа
     * @returns Результат входа
     */
    const login = async (loginData: LoginRequest) => {
        try {
            const result = await authStore.login(loginData);
            return { success: true, user: result };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    /**
     * Функция для выхода из системы
     */
    const logout = async () => {
        try {
            // Сначала выходим из нашего API хранилища
            await authStore.logout();

            // Затем из Auth.js
            await signOut({ callbackUrl: '/' });

            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    /**
     * Функция для регистрации пользователя
     * @param userData Данные для регистрации
     * @returns Результат регистрации
     */
    const register = async (userData: RegisterRequest) => {
        try {
            const result = await authStore.register(userData);
            return { success: true, user: result };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    /**
     * Функция для аутентификации через OAuth
     * @param oauthData Данные для OAuth аутентификации
     * @returns Результат OAuth аутентификации
     */
    const loginWithOAuth = async (oauthData: OAuthRequest) => {
        try {
            const result = await authStore.loginWithOAuth(oauthData);
            return { success: true, user: result };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    /**
     * Проверка статуса аутентификации
     * @returns Обещание с результатом проверки
     */
    const checkAuthStatus = async () => {
        try {
            // Сначала проверяем сессию Auth.js
            if (status.value === 'authenticated' && session.value) {
                // Для NextAuth, токен обычно не доступен напрямую в session
                // Можно использовать JWT из cookies или полагаться на встроенную аутентификацию NextAuth

                // Получаем полные данные пользователя с нашего API
                await authStore.fetchCurrentUser();
            } else {
                // Если сессии нет, проверяем наш API
                await authStore.fetchCurrentUser();
            }

            return {
                isAuthenticated: isAuthenticated.value,
                user: user.value
            };
        } catch (error) {
            return {
                isAuthenticated: false,
                user: null
            };
        }
    };

    return {
        isAuthenticated,
        user,
        isPremium,
        loading,
        login,
        logout,
        register,
        loginWithOAuth,
        checkAuthStatus
    };
};