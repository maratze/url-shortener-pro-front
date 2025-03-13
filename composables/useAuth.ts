import { computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { LoginRequest, RegisterRequest, UserResponse, OAuthRequest } from '~/types/auth';

/**
 * Хук для работы с аутентификацией пользователя
 * В реальном приложении здесь будет полноценная логика с JWT-токенами, 
 * сессиями и обращениями к API
 */
export const useAuthService = () => {
    // Получаем хранилище аутентификации
    const authStore = useAuthStore();

    // Флаг аутентификации пользователя - используем computed, чтобы реагировать на изменения
    const isAuthenticated = computed(() => authStore.isAuthenticated);

    // Текущий пользователь
    const user = computed(() => authStore.user);

    // Флаг загрузки
    const loading = computed(() => authStore.loading);

    // Проверка на премиум статус
    const isPremium = computed(() => authStore.isAuthenticated && authStore.user?.isPremium);

    /**
     * Функция для входа пользователя
     * @param credentials Данные для входа (email и пароль)
     * @returns Результат входа
     */
    const login = async (credentials: LoginRequest) => {
        try {
            const result = await authStore.login(credentials);
            return { success: true, user: result };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    /**
     * Функция для выхода пользователя
     */
    const logout = async () => {
        authStore.logout();
        return { success: true };
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
            const user = await authStore.fetchCurrentUser();
            return {
                isAuthenticated: authStore.isAuthenticated,
                user: user
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