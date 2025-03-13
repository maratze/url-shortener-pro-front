import { $fetch } from 'ohmyfetch'
import type { RegisterRequest, LoginRequest, UserResponse, OAuthRequest } from '~/types/auth'

// Добавляем функцию для получения базового URL API
const getApiBaseUrl = () => {
    let apiBaseUrl = '';
    try {
        if (typeof window !== 'undefined') {
            // Клиентский код
            const config = useRuntimeConfig();
            apiBaseUrl = config.public.apiBase || 'https://localhost:7095';
        } else {
            // Серверный код
            apiBaseUrl = process.env.API_BASE_URL || 'https://localhost:7095';
        }
    } catch (error) {
        console.error('Error getting API base URL:', error);
        apiBaseUrl = 'https://localhost:7095'; // Fallback
    }
    return apiBaseUrl;
};

export const userApi = {
    register: async (registerData: RegisterRequest): Promise<UserResponse> => {
        try {
            const apiBaseUrl = getApiBaseUrl();
            console.log(`Making API request to ${apiBaseUrl}/api/users/register`);

            return await $fetch(`${apiBaseUrl}/api/users/register`, {
                method: 'POST',
                body: registerData
            })
        } catch (error: any) {
            console.error('Registration error:', error);
            const message = error.response?._data?.message || 'Error during registration'
            throw new Error(message)
        }
    },

    login: async (loginData: LoginRequest): Promise<UserResponse> => {
        try {
            const apiBaseUrl = getApiBaseUrl();
            console.log(`Making API request to ${apiBaseUrl}/api/users/login`);

            return await $fetch(`${apiBaseUrl}/api/users/login`, {
                method: 'POST',
                body: loginData
            })
        } catch (error: any) {
            console.error('Login error:', error);
            const message = error.response?._data?.message || 'Error during login'
            throw new Error(message)
        }
    },

    getCurrentUser: async (): Promise<UserResponse> => {
        try {
            // Safe localStorage access that works with SSR
            const token = process.client ? localStorage.getItem('token') : null;
            const apiBaseUrl = getApiBaseUrl();
            console.log(`Making API request to ${apiBaseUrl}/api/users/me`);

            return await $fetch(`${apiBaseUrl}/api/users/me`, {
                headers: token ? {
                    'Authorization': `Bearer ${token}`
                } : {}
            })
        } catch (error) {
            console.error('Error getting current user:', error);
            throw new Error('Failed to get user data')
        }
    },

    checkEmailAvailability: async (email: string): Promise<boolean> => {
        try {
            const apiBaseUrl = getApiBaseUrl();
            console.log(`Making API request to ${apiBaseUrl}/api/users/check-email?email=${encodeURIComponent(email)}`);

            const { isAvailable } = await $fetch(`${apiBaseUrl}/api/users/check-email?email=${encodeURIComponent(email)}`)
            return isAvailable
        } catch (error) {
            console.error('Error checking email availability:', error);
            throw new Error('Failed to check email availability')
        }
    },

    loginWithOAuth: async (oauthData: OAuthRequest): Promise<UserResponse> => {
        try {
            const apiBaseUrl = getApiBaseUrl();
            console.log(`Making OAuth API request to ${apiBaseUrl}/api/users/oauth/${oauthData.provider}`);

            return await $fetch(`${apiBaseUrl}/api/users/oauth/${oauthData.provider}`, {
                method: 'POST',
                body: oauthData
            })
        } catch (error: any) {
            console.error('OAuth login error:', error);
            const message = error.response?._data?.message || 'Error during OAuth authentication'
            throw new Error(message)
        }
    }
}