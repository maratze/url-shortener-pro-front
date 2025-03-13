import { $fetch } from 'ohmyfetch'
import type { RegisterRequest, LoginRequest, UserResponse } from '~/types/auth'

const API_BASE_URL = '/api/users'

export const userApi = {
    register: async (registerData: RegisterRequest): Promise<UserResponse> => {
        try {
            return await $fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                body: registerData
            })
        } catch (error: any) {
            const message = error.response?._data?.message || 'Ошибка при регистрации'
            throw new Error(message)
        }
    },

    login: async (loginData: LoginRequest): Promise<UserResponse> => {
        try {
            return await $fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                body: loginData
            })
        } catch (error: any) {
            const message = error.response?._data?.message || 'Ошибка при входе'
            throw new Error(message)
        }
    },

    getCurrentUser: async (): Promise<UserResponse> => {
        try {
            return await $fetch(`${API_BASE_URL}/me`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
        } catch (error) {
            throw new Error('Не удалось получить данные пользователя')
        }
    },

    checkEmailAvailability: async (email: string): Promise<boolean> => {
        try {
            const { isAvailable } = await $fetch(`${API_BASE_URL}/check-email?email=${encodeURIComponent(email)}`)
            return isAvailable
        } catch (error) {
            throw new Error('Не удалось проверить доступность email')
        }
    }
}