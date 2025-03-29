import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRoute, navigateTo } from '#app'
import type { UpdateProfileRequest, ChangePasswordRequest } from '~/types/auth'
import type { TwoFactorAuthResponse } from '~/types/auth'
import { useToastStore } from '~/stores/toast'

/**
 * Composable for authentication management
 */
export const useAuthService = () => {
    const authStore = useAuthStore()

    // Authentication initialization state
    const isInitializing = ref(false)
    const isInitialized = ref(false)

    // Флаг для предотвращения множественных редиректов
    const isRedirecting = ref(false)

    // Computed properties for easy access to authentication state
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const user = computed(() => authStore.user)
    const isPremium = computed(() => authStore.user?.isPremium === true)

    /**
     * Check authentication status when the application loads
     * Loads user data if a token exists
     */
    const checkAuthStatus = async () => {
        if (isRedirecting.value) return false;

        isInitializing.value = true
        try {
            // Try to load user data if a token exists
            // fetchCurrentUser checks for token presence internally
            await authStore.fetchCurrentUser()

            // Добавляем логирование для отладки данных пользователя
            if (authStore.user && authStore.user.email) {
                console.log('User authenticated, details:', {
                    id: authStore.user.id,
                    email: authStore.user.email,
                    authProvider: authStore.user.authProvider || 'Not set'
                })
            } else if (authStore.user) {
                console.warn('User authenticated but data is incomplete')
            }
        } catch (error: any) {
            console.error('Error checking authentication status:', error)

            // Улучшенная обработка ошибок авторизации
            if (error?.response?.status === 401 ||
                error?.status === 401 ||
                error?.message?.includes('401') ||
                error?.message?.includes('Authentication failed') ||
                error?.message?.includes('Session expired') ||
                error?.message?.includes('session may have expired')) {

                console.log('Session invalid or expired, logging out')

                // Используем локальную переменную, чтобы избежать повторных редиректов
                const shouldRedirect = !isRedirecting.value
                isRedirecting.value = true

                // Выполняем выход из системы
                await authStore.logout()

                // Если мы не на странице логина, перенаправляем на нее
                if (shouldRedirect) {
                    const route = useRoute()
                    const currentPath = route.fullPath

                    // Добавляем небольшую задержку перед редиректом, чтобы состояние успело обновиться
                    setTimeout(() => {
                        if (!route.path.startsWith('/login')) {
                            navigateTo(`/login?redirect=${encodeURIComponent(currentPath)}`)
                        }

                        // Сбрасываем флаг редиректа после перенаправления
                        setTimeout(() => {
                            isRedirecting.value = false
                        }, 500)
                    }, 100)
                } else {
                    // Сбрасываем флаг, если редирект не требуется
                    setTimeout(() => {
                        isRedirecting.value = false
                    }, 500)
                }

                // Показываем уведомление о невалидной сессии
                const toastStore = useToastStore()
                toastStore.error('Ваша сессия истекла. Пожалуйста, войдите снова.')
            }
        } finally {
            isInitializing.value = false
            isInitialized.value = true
        }

        return authStore.isAuthenticated
    }

    /**
     * User login with email and password
     */
    const login = async (email: string, password: string) => {
        isInitializing.value = true
        try {
            await authStore.login({ email, password })
            return { success: true }
        } catch (error: any) {
            return {
                success: false,
                error: error?.message || 'Failed to log in'
            }
        } finally {
            isInitializing.value = false
        }
    }

    /**
     * Register a new user
     */
    const register = async (userData: { email: string, password: string, firstName: string, lastName: string }) => {
        isInitializing.value = true
        try {
            await authStore.register(userData)
            return { success: true }
        } catch (error: any) {
            return {
                success: false,
                error: error?.message || 'Failed to register'
            }
        } finally {
            isInitializing.value = false
        }
    }

    /**
     * Update user profile
     */
    const updateProfile = async (profileData: UpdateProfileRequest) => {
        try {
            await authStore.updateProfile(profileData)
            return { success: true }
        } catch (error: any) {
            return {
                success: false,
                error: error?.message || 'Failed to update profile'
            }
        }
    }

    /**
     * Logout from the system
     */
    const logout = async () => {
        await authStore.logout()
    }

    /**
     * Delete user account
     */
    const deleteAccount = async () => {
        try {
            const result = await authStore.deleteAccount()
            if (result.success) {
                return { success: true, message: result.message }
            } else {
                return { success: false, error: result.message }
            }
        } catch (error: any) {
            return {
                success: false,
                error: error?.message || 'Failed to delete account'
            }
        }
    }

    /**
     * Change user password
     */
    const changePassword = async (passwordData: ChangePasswordRequest) => {
        try {
            const result = await authStore.changePassword(passwordData)
            return result
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || 'Failed to change password'
            }
        }
    }

    /**
     * Enable or disable two-factor authentication
     */
    const toggleTwoFactorAuth = async (enable: boolean, verificationCode?: string): Promise<TwoFactorAuthResponse | null> => {
        try {
            const response = await $fetch(`${getApiBaseUrl()}/api/users/two-factor-auth`, {
                method: 'POST',
                body: JSON.stringify({
                    enable,
                    code: verificationCode
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authStore.token}`
                }
            });

            return response as TwoFactorAuthResponse;
        } catch (error) {
            console.error('Error toggling 2FA:', error);
            throw error;
        }
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
        updateProfile,
        logout,
        deleteAccount,
        changePassword,
        toggleTwoFactorAuth
    }
}

/**
 * Hook for use in components that require authentication
 * Checks authentication status and manages loading state
 */
export const useRequireAuth = () => {
    const { isAuthenticated, isInitializing, isInitialized } = useAuthService()
    const isLoading = ref(true)
    const error = ref<string | null>(null)

    // Use onMounted to check authentication
    onMounted(async () => {
        try {
            // Check is performed only after initialization
            if (!isAuthenticated.value && isInitialized.value) {
                error.value = 'Authentication required'
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