import { defineStore } from 'pinia';

interface User {
    id: number;
    email: string;
    isPremium: boolean;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: null,
        loading: false,
        error: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async initialize() {
            const token = localStorage.getItem('auth_token');
            if (token) {
                this.token = token;
                await this.fetchCurrentUser();
            }
        },

        async login(email: string, password: string) {
            this.loading = true;
            this.error = null;

            try {
                const { $api } = useNuxtApp();
                const response = await $api('/users/login', {
                    method: 'POST',
                    body: { email, password }
                });

                this.token = response.token;
                localStorage.setItem('auth_token', response.token);

                await this.fetchCurrentUser();
            } catch (error: any) {
                this.error = error.message || 'Не удалось войти в систему';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async register(email: string, password: string) {
            this.loading = true;
            this.error = null;

            try {
                const { $api } = useNuxtApp();
                const response = await $api('/auth/register', {
                    method: 'POST',
                    body: { email, password }
                });

                this.token = response.token;
                localStorage.setItem('auth_token', response.token);

                await this.fetchCurrentUser();
            } catch (error: any) {
                this.error = error.message || 'Не удалось зарегистрироваться';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchCurrentUser() {
            if (!this.token) return;

            this.loading = true;

            try {
                const { $api } = useNuxtApp();
                this.user = await $api('/users/me');
            } catch (error: any) {
                this.error = error.message || 'Не удалось получить данные пользователя';
                this.logout();
            } finally {
                this.loading = false;
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('auth_token');
        }
    }
});