import { defineStore } from 'pinia'
import { userApi } from '~/services/api/userApi'
import type { RegisterRequest, LoginRequest, UserResponse, OAuthRequest } from '~/types/auth'

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

                // Просто возвращаем ответ от API без авторизации
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

                // Сохранение токена
                localStorage.setItem('token', response.token)

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
            localStorage.setItem('token', token)
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

                // Сохранение токена
                localStorage.setItem('token', response.token)

                return response
            } catch (error: any) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchCurrentUser() {
            if (!localStorage.getItem('token')) return null

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
            localStorage.removeItem('token')
        }
    }
})