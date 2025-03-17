import { defineStore } from 'pinia'
import { userApi } from '~/services/api/userApi'
import type { RegisterRequest, LoginRequest, UserResponse, OAuthRequest, UpdateProfileRequest } from '~/types/auth'
import { getStringFromStorage, setStringInStorage, removeLocalStorage } from '~/utils/client'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as UserResponse | null,
        token: '',
        error: '',
        loading: false,
        isAuthenticated: false
    }),

    actions: {
        async register(userData: RegisterRequest) {
            this.loading = true
            this.error = ''

            try {
                const response = await userApi.register(userData)

                // Just return the API response without authorization
                return response
            } catch (error: any) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async login(loginData: LoginRequest) {
            this.loading = true
            this.error = ''

            try {
                const response = await userApi.login(loginData)

                this.user = response
                this.token = response.token
                this.isAuthenticated = true

                // Save token
                setStringInStorage('token', response.token)

                return response
            } catch (error: any) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        setToken(token: string) {
            this.token = token
            // Save token
            setStringInStorage('token', token)
            this.isAuthenticated = true
        },

        async loginWithOAuth(oauthData: OAuthRequest) {
            this.loading = true
            this.error = ''

            try {
                const response = await userApi.loginWithOAuth(oauthData)

                this.user = response
                this.token = response.token
                this.isAuthenticated = true

                // Save token
                setStringInStorage('token', response.token)

                return response
            } catch (error: any) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchCurrentUser() {
            // Check for token presence
            if (!getStringFromStorage('token') && !this.token) {
                return null
            }

            this.loading = true

            try {
                const user = await userApi.getCurrentUser()
                this.user = user
                this.isAuthenticated = true
                return user
            } catch (error) {
                this.logout()
                return null
            } finally {
                this.loading = false
            }
        },

        logout() {
            this.user = null
            this.token = ''
            this.isAuthenticated = false

            // Remove token
            removeLocalStorage('token')
        },

        async updateProfile(profileData: UpdateProfileRequest) {
            this.loading = true
            this.error = ''

            try {
                const response = await userApi.updateProfile(profileData)

                this.user = response
                return response
            } catch (error: any) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})