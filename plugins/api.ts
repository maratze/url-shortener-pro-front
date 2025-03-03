import { $fetch } from 'ofetch';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const api = $fetch.create({
        baseURL: config.public.apiBaseUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        async onRequest({ options }) {
            // Добавляем токен авторизации, если он существует
            const token = localStorage.getItem('auth_token');
            if (token) {
                options.headers = {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`
                };
            }
        },
        async onResponseError({ response }) {
            const status = response.status;

            // Обработка ошибок авторизации
            if (status === 401) {
                const authStore = useAuthStore();
                authStore.logout();
                navigateTo('/login');
            }

            return Promise.reject(response._data);
        }
    });

    return {
        provide: {
            api
        }
    }
});