import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

/**
 * Композабл для управления аутентификацией
 */
export const useAuthService = () => {
    const authStore = useAuthStore()

    // Состояние инициализации аутентификации
    const isInitializing = ref(false)
    const isInitialized = ref(false)

    // Вычисляемые свойства для удобного доступа к состоянию аутентификации
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const user = computed(() => authStore.user)
    const isPremium = computed(() => authStore.user?.isPremium === true)

    /**
     * Проверка статуса аутентификации при загрузке приложения
     * Загружает пользователя, если есть токен
     */
    const checkAuthStatus = async () => {
        isInitializing.value = true
        try {
            // Пытаемся загрузить данные пользователя, если есть токен
            // fetchCurrentUser внутри проверяет наличие токена
            await authStore.fetchCurrentUser()
        } catch (error) {
            console.error('Error checking authentication status:', error)
        } finally {
            isInitializing.value = false
            isInitialized.value = true
        }

        return authStore.isAuthenticated
    }

    /**
     * Вход пользователя с email и паролем
     */
    const login = async (email: string, password: string) => {
        isInitializing.value = true
        try {
            await authStore.login({ email, password })
            return { success: true }
        } catch (error: any) {
            return {
                success: false,
                error: error?.message || 'Не удалось войти в систему'
            }
        } finally {
            isInitializing.value = false
        }
    }

    /**
     * Регистрация нового пользователя
     */
    const register = async (userData: { email: string, password: string, firstName: string, lastName: string }) => {
        isInitializing.value = true
        try {
            await authStore.register(userData)
            return { success: true }
        } catch (error: any) {
            return {
                success: false,
                error: error?.message || 'Не удалось зарегистрироваться'
            }
        } finally {
            isInitializing.value = false
        }
    }

    /**
     * Выход из системы
     */
    const logout = async () => {
        await authStore.logout()
    }

    return {
        isAuthenticated,
        isInitializing,
        isInitialized,
        user,
        isPremium,
        checkAuthStatus,
        login,
        register,
        logout
    }
}

/**
 * Хук для использования в компонентах, которые требуют аутентификации
 * Проверяет статус аутентификации и управляет состоянием загрузки
 */
export const useRequireAuth = () => {
    const { isAuthenticated, isInitializing, isInitialized } = useAuthService()
    const isLoading = ref(true)
    const error = ref<string | null>(null)

    // Используем onMounted для проверки аутентификации
    onMounted(async () => {
        try {
            // Проверка выполняется только после инициализации
            if (!isAuthenticated.value && isInitialized.value) {
                error.value = 'Требуется аутентификация'
            }
        } finally {
            isLoading.value = false
        }
    })

    return {
        isAuthenticated,
        isLoading: computed(() => isLoading.value || isInitializing.value),
        error
    }
} 