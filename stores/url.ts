import { defineStore } from 'pinia';

export const useUrlStore = defineStore('url', {
    state: () => ({
        urls: [],
        currentUrl: null,
        loading: false,
        error: null,
        totalItems: 0,
        totalPages: 1
    }),

    actions: {
        async createShortUrl(urlData) {
            try {
                this.loading = true;
                this.error = null;

                const { $api } = useNuxtApp();
                const response = await $api('/urls', {
                    method: 'POST',
                    body: urlData
                });

                return response;
            } catch (err) {
                this.error = err.message || 'Произошла ошибка при создании короткого URL';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async fetchUrls(page = 1, pageSize = 10, sortBy = 'createdAt', sortOrder = 'desc') {
            try {
                this.loading = true;
                this.error = null;

                const { $api } = useNuxtApp();
                const response = await $api(`/urls?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`);

                this.urls = response.items || [];
                this.totalItems = response.totalItems || 0;
                this.totalPages = response.totalPages || 1;

                return response;
            } catch (err) {
                this.error = err.message || 'Произошла ошибка при загрузке URL';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async getUrlByShortCode(id) {
            try {
                this.loading = true;
                this.error = null;

                const { $api } = useNuxtApp();
                const response = await $api(`/urls/${id}`);

                this.currentUrl = response;
                return response;
            } catch (err) {
                this.error = err.message || 'Произошла ошибка при загрузке URL';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async getUrlStatistics(id) {
            try {
                this.loading = true;
                this.error = null;

                const { $api } = useNuxtApp();
                const response = await $api(`/urls/${id}/statistics`);

                return response;
            } catch (err) {
                this.error = err.message || 'Произошла ошибка при загрузке статистики URL';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async deleteUrl(id) {
            try {
                this.loading = true;
                this.error = null;

                const { $api } = useNuxtApp();
                await $api(`/urls/${id}`, {
                    method: 'DELETE'
                });

                return true;
            } catch (err) {
                this.error = err.message || 'Произошла ошибка при удалении URL';
                throw err;
            } finally {
                this.loading = false;
            }
        }
    }
});