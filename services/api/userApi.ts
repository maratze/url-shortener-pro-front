import { $fetch } from 'ohmyfetch'
import type { RegisterRequest, LoginRequest, UserResponse, OAuthRequest, UpdateProfileRequest, ChangePasswordRequest, LoginResponse } from '~/types/auth'

export const userApi = {
    register: async (registerData: RegisterRequest): Promise<UserResponse> => {
        try {
            console.log(`Making API request to ${getApiBaseUrl()}/api/users/register`);

            return await $fetch(`${getApiBaseUrl()}/api/users/register`, {
                method: 'POST',
                body: registerData
            })
        } catch (error: any) {
            console.error('Registration error:', error);
            const message = error.response?._data || 'Error during registration'
            throw new Error(message)
        }
    },

    login: async (loginData: LoginRequest): Promise<LoginResponse> => {
        try {
            console.log(`Making API request to ${getApiBaseUrl()}/api/users/login`);

            return await $fetch(`${getApiBaseUrl()}/api/users/login`, {
                method: 'POST',
                body: loginData,
                retry: 0,
                onResponse({ request, response, options }) {
                    console.log(`[Auth API] Response status: ${response.status}`, response._data);
                },
                onResponseError({ request, response, options }) {
                    console.error(`[Auth API] Error status: ${response.status}`, response._data);
                }
            })
        } catch (error: any) {
            console.error('Login error:', error);
            let errorMessage = 'Error during login';

            if (error.response) {
                const statusCode = error.response.status;
                const errorData = error.response._data;

                if (statusCode === 500) {
                    errorMessage = 'Server error. Please try again later or contact support.';
                    console.error('[Auth API] Server error details:', errorData);
                } else if (statusCode === 400) {
                    errorMessage = errorData?.message || 'Invalid login credentials';
                } else if (statusCode === 404) {
                    errorMessage = 'Authentication service not available. Please check if the server is running.';
                    console.error('[Auth API] 404 Error: API route not found');
                } else if (statusCode === 401) {
                    errorMessage = 'Invalid email or password';
                }
            }

            throw new Error(errorMessage);
        }
    },

    getCurrentUser: async (): Promise<UserResponse> => {
        try {
            // Safe localStorage access that works with SSR
            const token = process.client ? localStorage.getItem('token') : null;
            console.log(`Making API request to ${getApiBaseUrl()}/api/users/profile with token: ${token ? 'present' : 'missing'}`);

            return await $fetch(`${getApiBaseUrl()}/api/users/profile`, {
                headers: token ? {
                    'Authorization': `Bearer ${token}`
                } : {}
            })
        } catch (error: any) {
            console.error('Error getting current user:', error);
            // Улучшаем сообщение об ошибке
            let errorMessage = 'Failed to get user data';

            if (error.response) {
                const statusCode = error.response.status;

                if (statusCode === 401) {
                    errorMessage = 'Authentication token expired or invalid';
                    console.error('[User API] Authentication failed:', error);
                }
            }

            throw new Error(errorMessage)
        }
    },

    updateProfile: async (profileData: UpdateProfileRequest): Promise<UserResponse> => {
        try {
            // Safe localStorage access that works with SSR
            const token = process.client ? localStorage.getItem('token') : null;
            console.log(`Making API request to ${getApiBaseUrl()}/api/users/profile`);

            return await $fetch(`${getApiBaseUrl()}/api/users/profile`, {
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
            console.log(`Making API request to ${getApiBaseUrl()}/api/users/check-email`);

            const response = await $fetch(`${getApiBaseUrl()}/api/users/check-email`, {
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
            console.log(`Making OAuth API request to ${getApiBaseUrl()}/api/users/oauth`);

            const response = await $fetch(`${getApiBaseUrl()}/api/users/oauth`, {
                method: 'POST',
                body: oauthData
            });

            // Добавляем отладочную информацию о пользователе и его провайдере
            console.log('OAuth login success, user details:', {
                id: response.id,
                email: response.email,
                authProvider: response.authProvider || 'Not set',
                hasToken: !!response.token,
                tokenLength: response.token ? response.token.length : 0
            });

            return response;
        } catch (error: any) {
            console.error('OAuth login error:', error);
            const message = error.response?._data?.message || 'Error during OAuth authentication'
            throw new Error(message)
        }
    },

    // Новый метод для открытия окна аутентификации Google
    initiateGoogleLogin: (redirectUri: string = window.location.origin + '/auth/callback') => {
        if (process.client) {
            const state = encodeURIComponent(window.location.pathname);
            const authUrl = `${getApiBaseUrl()}/api/auth/google-login?returnUrl=${state}`;

            // Открываем страницу Google Auth в том же окне
            window.location.href = authUrl;
        }
    },

    // Метод для удаления аккаунта пользователя
    deleteAccount: async (): Promise<{ success: boolean, message: string }> => {
        try {
            // Safe localStorage access that works with SSR
            const token = process.client ? localStorage.getItem('token') : null;
            if (!token) {
                throw new Error('Authentication required');
            }

            console.log(`Making API request to ${getApiBaseUrl()}/api/users/account`);

            const response = await $fetch(`${getApiBaseUrl()}/api/users/account`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return {
                success: true,
                message: response.message || 'Account deleted successfully'
            };
        } catch (error: any) {
            console.error('Error deleting account:', error);

            let errorMessage = 'Failed to delete account';
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode === 401) {
                    errorMessage = 'Authentication required';
                } else if (statusCode === 400) {
                    errorMessage = error.response._data?.message || 'Failed to delete account';
                } else if (statusCode === 500) {
                    errorMessage = 'Server error occurred while deleting account';
                }
            }

            return {
                success: false,
                message: errorMessage
            };
        }
    },

    changePassword: async (passwordData: ChangePasswordRequest): Promise<{ success: boolean, message: string }> => {
        try {
            // Safe localStorage access that works with SSR
            const token = process.client ? localStorage.getItem('token') : null;
            if (!token) {
                throw new Error('Authentication required');
            }

            console.log(`Making API request to ${getApiBaseUrl()}/api/users/change-password`);

            // Добавляем логирование данных о пользователе Google
            if (passwordData.isGoogleUser) {
                console.log('Change password request for Google user');
            }

            const response = await $fetch(`${getApiBaseUrl()}/api/users/change-password`, {
                method: 'POST',
                body: passwordData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return {
                success: true,
                message: response.message || 'Password changed successfully'
            };
        } catch (error: any) {
            console.error('Error changing password:', error);

            let errorMessage = 'Failed to change password';
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode === 401) {
                    errorMessage = 'Authentication required';
                } else if (statusCode === 400) {
                    // Получаем точное сообщение об ошибке от сервера
                    errorMessage = error.response._data || 'Invalid current password';
                    // Если сервер вернул объект с сообщением
                    if (typeof errorMessage === 'object' && errorMessage !== null) {
                        errorMessage = (errorMessage as any).message || 'Invalid current password';
                    }
                } else if (statusCode === 500) {
                    errorMessage = 'Server error occurred while changing password';
                }
            }

            return {
                success: false,
                message: errorMessage
            };
        }
    },

    // Метод для управления двухфакторной аутентификацией
    toggleTwoFactorAuth: async (enable: boolean): Promise<{ success: boolean, message: string, qrCodeUrl?: string }> => {
        try {
            // Safe localStorage access that works with SSR
            const token = process.client ? localStorage.getItem('token') : null;
            if (!token) {
                throw new Error('Authentication required');
            }

            console.log(`Making API request to ${getApiBaseUrl()}/api/users/two-factor-auth`);

            const response = await $fetch(`${getApiBaseUrl()}/api/users/two-factor-auth`, {
                method: 'POST',
                body: { enable },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return {
                success: true,
                message: enable ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled',
                qrCodeUrl: response.qrCodeUrl
            };
        } catch (error: any) {
            console.error('Error toggling 2FA:', error);

            let errorMessage = 'Failed to update two-factor authentication settings';
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode === 401) {
                    errorMessage = 'Authentication required';
                } else if (statusCode === 400) {
                    errorMessage = error.response._data?.message || 'Invalid request';
                } else if (statusCode === 500) {
                    errorMessage = 'Server error occurred while updating two-factor authentication';
                }
            }

            return {
                success: false,
                message: errorMessage
            };
        }
    },

    validateTwoFactorCode: async (email: string, code: string, remember?: boolean): Promise<UserResponse> => {
        try {
            console.log(`Validating 2FA code for ${email}`);

            return await $fetch(`${getApiBaseUrl()}/api/users/validate-2fa`, {
                method: 'POST',
                body: {
                    email,
                    verificationCode: code,
                    remember
                },
                retry: 0
            });
        } catch (error: any) {
            console.error('2FA validation error:', error);
            let errorMessage = 'Error during two-factor authentication';

            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = error.response._data?.message || 'Invalid verification code';
                }
            }

            throw new Error(errorMessage);
        }
    }
}