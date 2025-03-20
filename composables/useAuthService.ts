import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import type { UpdateProfileRequest } from '~/types/auth'

/**
 * Composable for authentication management
 */
export const useAuthService = () => {
    const authStore = useAuthStore()

    // Authentication initialization state
    const isInitializing = ref(false)
    const isInitialized = ref(false)

    // Computed properties for easy access to authentication state
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const user = computed(() => authStore.user)
    const isPremium = computed(() => authStore.user?.isPremium === true)

    /**
     * Check authentication status when the application loads
     * Loads user data if a token exists
     */
    const checkAuthStatus = async () => {
        isInitializing.value = true
        try {
            // Try to load user data if a token exists
            // fetchCurrentUser checks for token presence internally
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
        deleteAccount
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