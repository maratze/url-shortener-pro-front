import { $fetch } from 'ohmyfetch'
import type { RegisterRequest, LoginRequest, UserResponse, OAuthRequest, UpdateProfileRequest } from '~/types/auth'
import { getApiBaseUrl } from '../../utils/config';

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
            console.log(`Making API request to ${apiBaseUrl}/api/auth/login`);

            return await $fetch(`${apiBaseUrl}/api/auth/login`, {
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
            console.log(`Making API request to ${apiBaseUrl}/api/users/profile`);

            return await $fetch(`${apiBaseUrl}/api/users/profile`, {
                headers: token ? {
                    'Authorization': `Bearer ${token}`
                } : {}
            })
        } catch (error) {
            console.error('Error getting current user:', error);
            throw new Error('Failed to get user data')
        }
    },

    updateProfile: async (profileData: UpdateProfileRequest): Promise<UserResponse> => {
        try {
            // Safe localStorage access that works with SSR
            const token = process.client ? localStorage.getItem('token') : null;
            const apiBaseUrl = getApiBaseUrl();
            console.log(`Making API request to ${apiBaseUrl}/api/users/profile`);

            return await $fetch(`${apiBaseUrl}/api/users/profile`, {
                method: 'PUT',
                body: profileData,
                headers: token ? {
                    'Authorization': `Bearer ${token}`
                } : {}
            })
        } catch (error: any) {
            console.error('Error updating profile:', error);
            const message = error.response?._data?.message || 'Failed to update profile'
            throw new Error(message)
        }
    },

    checkEmailAvailability: async (email: string): Promise<boolean> => {
        try {
            const apiBaseUrl = getApiBaseUrl();
            console.log(`Making API request to ${apiBaseUrl}/api/users/check-email`);

            const response = await $fetch(`${apiBaseUrl}/api/users/check-email`, {
                method: 'POST',
                body: email
            });
            return response.isAvailable;
        } catch (error) {
            console.error('Error checking email availability:', error);
            throw new Error('Failed to check email availability')
        }
    },

    loginWithOAuth: async (oauthData: OAuthRequest): Promise<UserResponse> => {
        try {
            const apiBaseUrl = getApiBaseUrl();
            console.log(`Making OAuth API request to ${apiBaseUrl}/api/users/oauth`);

            return await $fetch(`${apiBaseUrl}/api/users/oauth`, {
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