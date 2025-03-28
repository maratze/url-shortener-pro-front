import { defineStore } from 'pinia'
import { userApi } from '~/services/api/userApi'
import type { RegisterRequest, LoginRequest, UserResponse, OAuthRequest, UpdateProfileRequest, ChangePasswordRequest, TwoFactorAuthRequest, LoginResponse } from '~/types/auth'
import { getStringFromStorage, setStringInStorage, removeLocalStorage } from '~/utils/client'
import { useToastStore } from '~/stores/toast'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as UserResponse | null,
        token: '',
        error: '',
        loading: false,
        isAuthenticated: false,
        requiresTwoFactor: false,
        pendingTwoFactorAuth: {
            email: '',
            remember: false
        }
    }),

    actions: {
        async register(userData: RegisterRequest) {
            this.loading = true
            this.error = ''

            try {
                const response = await userApi.register(userData)

                // Сохраняем данные пользователя и токен так же, как при логине
                if (response && response.token) {
                    this.user = response
                    this.token = response.token
                    this.isAuthenticated = true

                    // Сохраняем токен в localStorage
                    console.log('Saving token to localStorage after registration:', { tokenLength: response.token.length })
                    setStringInStorage('token', response.token)
                }

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
            this.requiresTwoFactor = false

            try {
                const response = await userApi.login(loginData)

                // Проверяем, требуется ли 2FA
                if (response.requiresTwoFactor) {
                    console.log('Two-factor authentication required')
                    this.requiresTwoFactor = true
                    this.pendingTwoFactorAuth = {
                        email: loginData.email,
                        remember: loginData.remember || false
                    }
                    return { requiresTwoFactor: true } as const
                }

                // Проверяем, что ответ содержит токен
                if (!response || !response.token) {
                    throw new Error('Authentication failed: No token received')
                }

                // Сохраняем данные пользователя и токен
                this.user = response as UserResponse

                this.token = response.token
                this.isAuthenticated = true

                // Явно сохраняем токен в localStorage
                console.log('Saving token to localStorage:', { tokenLength: response.token.length })
                setStringInStorage('token', response.token)

                // Сохраняем время входа в localStorage
                setStringInStorage('loginTime', new Date().toISOString())

                return response
            } catch (error: any) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        setToken(token: string) {
            if (!token) {
                console.error('Attempted to set empty token')
                return
            }

            this.token = token
            // Save token
            console.log('Setting token via setToken method:', { tokenLength: token.length })
            setStringInStorage('token', token)
            this.isAuthenticated = true
        },

        // Новый метод для установки данных пользователя без дополнительного запроса
        setUserData(userData: UserResponse) {
            if (!userData || !userData.email) {
                console.error('Attempted to set invalid user data')
                return
            }

            this.user = userData

            if (userData.token && !this.token) {
                this.setToken(userData.token)
            }

            this.isAuthenticated = true

            // Сохраняем время входа, если оно не было сохранено ранее
            if (!localStorage.getItem('loginTime')) {
                localStorage.setItem('loginTime', new Date().toISOString())
            }

            console.log('User data set directly:', userData.email)
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

                // Сохраняем время входа в localStorage
                localStorage.setItem('loginTime', new Date().toISOString())

                return response
            } catch (error: any) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchCurrentUser() {
            // Проверяем наличие токена
            const storedToken = getStringFromStorage('token')

            console.log('Fetching current user with token:', {
                storeToken: this.token ? 'present' : 'missing',
                storedToken: storedToken ? 'present' : 'missing'
            })

            // Если токен есть в localStorage, но нет в store - восстанавливаем его
            if (storedToken && !this.token) {
                this.token = storedToken
                this.isAuthenticated = true
                console.log('Restored token from localStorage')
            }

            // Если токена нет нигде, выходим
            if (!storedToken && !this.token) {
                console.log('No token available, skipping getCurrentUser')
                return null
            }

            this.loading = true

            try {
                const user = await userApi.getCurrentUser()

                // Проверяем, что пользователь и его email существуют
                if (user && user.email) {
                    this.user = user
                    this.isAuthenticated = true
                    return user
                } else {
                    console.error('User data is incomplete:', user)
                    // Если данные неполные, выходим из системы
                    this.logout()
                    return null
                }
            } catch (error: any) {
                console.error('Error fetching current user:', error.message)

                // Если ошибка 401, значит токен недействителен, очищаем его
                if (error.response && error.response.status === 401) {
                    console.log('Token invalid or session expired, logging out')
                    this.logout()

                    // Добавляем уведомление для пользователя
                    const toastStore = useToastStore()
                    toastStore.error('Ваша сессия истекла, пожалуйста, войдите снова')
                }

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
            console.log('Removing token from localStorage')
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
        },

        async deleteAccount() {
            this.loading = true
            this.error = ''

            try {
                const response = await userApi.deleteAccount()

                if (response.success) {
                    // После успешного удаления выходим из системы
                    this.logout()
                    return { success: true, message: response.message }
                } else {
                    this.error = response.message
                    return { success: false, message: response.message }
                }
            } catch (error: any) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to delete account'
                this.error = errorMessage
                return { success: false, message: errorMessage }
            } finally {
                this.loading = false
            }
        },

        async changePassword(passwordData: ChangePasswordRequest) {
            this.loading = true
            this.error = ''

            try {
                const response = await userApi.changePassword(passwordData)

                if (response.success && this.user) {
                    this.user.hasPasswordSet = true;
                }

                return response
            } catch (error: any) {
                this.error = error.message
                return {
                    success: false,
                    message: error.message || 'Failed to change password'
                }
            } finally {
                this.loading = false
            }
        },

        async toggleTwoFactorAuth(enable: boolean) {
            this.loading = true
            this.error = ''

            try {
                const response = await userApi.toggleTwoFactorAuth(enable)

                // Если 2FA успешно включено/отключено, обновляем информацию о пользователе
                if (response.success && this.user) {
                    this.user = {
                        ...this.user,
                        isTwoFactorEnabled: enable
                    }
                }

                return response
            } catch (error: any) {
                this.error = error.message
                return {
                    success: false,
                    message: error.message || 'Failed to update two-factor authentication settings'
                }
            } finally {
                this.loading = false
            }
        },

        setTwoFactorPending(email: string, remember: boolean = false) {
            this.requiresTwoFactor = true;
            this.pendingTwoFactorAuth = {
                email,
                remember
            };
            console.log('Set two-factor pending state for email:', email);
        },

        async verifyTwoFactorCode(code: string) {
            if (!this.pendingTwoFactorAuth.email) {
                throw new Error('No pending two-factor authentication')
            }

            this.loading = true
            this.error = ''

            try {
                const response = await userApi.validateTwoFactorCode(
                    this.pendingTwoFactorAuth.email,
                    code,
                    this.pendingTwoFactorAuth.remember
                )

                // Проверяем, что ответ содержит токен
                if (!response || !response.token) {
                    throw new Error('Authentication failed: No token received')
                }

                // Сохраняем данные пользователя и токен
                this.user = response
                this.token = response.token
                this.isAuthenticated = true
                this.requiresTwoFactor = false

                // Очищаем данные ожидающей 2FA аутентификации
                this.pendingTwoFactorAuth = {
                    email: '',
                    remember: false
                }

                // Явно сохраняем токен в localStorage
                console.log('Saving token to localStorage after 2FA:', { tokenLength: response.token.length })
                setStringInStorage('token', response.token)

                return { success: true, user: response }
            } catch (error: any) {
                this.error = error.message
                return { success: false, error: error.message }
            } finally {
                this.loading = false
            }
        }
    }
})