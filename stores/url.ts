import { defineStore } from 'pinia';
import { useToastStore } from '~/stores/toast';
import { useAuthStore } from '~/stores/auth';
import { urlApi } from '~/services/api/urlApi';

interface UrlData {
    id: string;
    originalUrl: string;
    shortUrl: string;
    createdAt: string;
    clickCount?: number;
}

interface ShortenUrlParams {
    url: string;
    alias?: string;
    expiresAt?: string | null;
}

export const useUrlStore = defineStore('url', {
    state: () => ({
        urls: [] as UrlData[],
        loading: false,
        remainingFreeRequests: 30,
        totalFreeRequests: 30
    }),

    getters: {
        // Возвращает значение лимита в зависимости от типа аккаунта
        requestLimit: () => {
            const authStore = useAuthStore();
            // Если пользователь авторизован и у него PRO аккаунт, возвращаем бесконечность
            if (authStore.isAuthenticated && authStore.user?.isPremium) {
                return Infinity;
            }
            // Иначе возвращаем стандартный лимит для бесплатных пользователей
            return 30;
        }
    },

    actions: {
        async shortenUrl(params: ShortenUrlParams): Promise<UrlData> {
            const toastStore = useToastStore();
            this.loading = true;

            try {
                // Check if URL is valid
                try {
                    new URL(params.url);
                } catch (e) {
                    throw new Error('Пожалуйста, введите корректный URL');
                }

                // Check alias if provided
                if (params.alias && !/^[a-zA-Z0-9-_]+$/.test(params.alias)) {
                    throw new Error('Alias может содержать только буквы, цифры, дефисы и нижние подчеркивания');
                }

                // Check if we have requests left
                if (this.remainingFreeRequests <= 0 && this.requestLimit !== Infinity) {
                    throw new Error('Вы исчерпали все бесплатные сокращения на сегодня. Пожалуйста, перейдите на PRO план для неограниченного доступа.');
                }

                try {
                    // Вызываем API для создания короткой ссылки
                    const response = await urlApi.shortenUrl(params.url, params.alias);

                    const newUrl: UrlData = {
                        id: response.id || Math.random().toString(36).substring(2, 10),
                        originalUrl: params.url,
                        shortUrl: response.shortUrl,
                        createdAt: response.createdAt || new Date().toISOString(),
                        clickCount: response.clickCount || 0,
                    };

                    // Decrease remaining free requests only for non-premium users
                    if (this.requestLimit !== Infinity) {
                        this.remainingFreeRequests--;
                    }

                    // Add to our list of URLs
                    this.urls.unshift(newUrl);

                    // Save to local storage
                    this.saveToLocalStorage();

                    // Success toast
                    toastStore.success('URL успешно сокращен');

                    return newUrl;
                } catch (error: any) {
                    // Если возникла ошибка при обращении к API, логируем и используем локальную реализацию
                    console.error('Error with API call, using fallback:', error);

                    // Generate a short URL locally (fallback)
                    const id = Math.random().toString(36).substring(2, 10);
                    const alias = params.alias || id;
                    const shortUrl = `https://short.link/${alias}`;

                    // Check if alias already exists in our urls
                    if (params.alias && this.urls.some(url => url.shortUrl === shortUrl)) {
                        throw new Error('Этот custom alias уже занят. Пожалуйста, выберите другой.');
                    }

                    const newUrl: UrlData = {
                        id,
                        originalUrl: params.url,
                        shortUrl,
                        createdAt: new Date().toISOString(),
                        clickCount: 0,
                    };

                    // Decrease remaining free requests only for non-premium users
                    if (this.requestLimit !== Infinity) {
                        this.remainingFreeRequests--;
                    }

                    // Add to our list of URLs
                    this.urls.unshift(newUrl);

                    // Save to local storage
                    this.saveToLocalStorage();

                    // Success toast
                    toastStore.success('URL успешно сокращен (локально)');

                    return newUrl;
                }
            } catch (error: any) {
                toastStore.error(error?.message || 'Не удалось сократить URL');
                throw error;
            } finally {
                this.loading = false;
            }
        },

        loadFromLocalStorage() {
            if (process.client) {
                try {
                    const savedUrls = localStorage.getItem('shortened-urls');
                    if (savedUrls) {
                        this.urls = JSON.parse(savedUrls);
                    }

                    const savedRequests = localStorage.getItem('remaining-requests');
                    if (savedRequests) {
                        this.remainingFreeRequests = parseInt(savedRequests, 10);

                        // Reset remaining requests if it's a new day
                        const lastResetDate = localStorage.getItem('last-reset-date');
                        const today = new Date().toDateString();

                        if (!lastResetDate || lastResetDate !== today) {
                            this.remainingFreeRequests = 30;
                            localStorage.setItem('last-reset-date', today);
                            localStorage.setItem('remaining-requests', '30');
                        }
                    }
                } catch (error) {
                    console.error('Error loading from localStorage:', error);
                }
            }
        },

        saveToLocalStorage() {
            if (process.client) {
                try {
                    localStorage.setItem('shortened-urls', JSON.stringify(this.urls));
                    localStorage.setItem('remaining-requests', this.remainingFreeRequests.toString());
                } catch (error) {
                    console.error('Error saving to localStorage:', error);
                }
            }
        },

        async fetchRemainingRequests(): Promise<number> {
            const authStore = useAuthStore();

            try {
                // Если пользователь авторизован и у него PRO аккаунт
                if (authStore.isAuthenticated && authStore.user?.isPremium) {
                    // Для PRO аккаунтов устанавливаем максимальное значение
                    this.remainingFreeRequests = this.totalFreeRequests;
                    return this.remainingFreeRequests;
                }

                // Получаем данные с сервера
                const remainingRequests = await urlApi.getRemainingRequests();
                this.updateRemainingRequests(remainingRequests);
                return remainingRequests;
            } catch (error) {
                console.error('Error fetching remaining requests:', error);

                // Fallback - используем локальную логику
                if (process.client) {
                    const lastResetDate = localStorage.getItem('last-reset-date');
                    const today = new Date().toDateString();

                    if (!lastResetDate || lastResetDate !== today) {
                        this.remainingFreeRequests = 30;
                        localStorage.setItem('last-reset-date', today);
                        localStorage.setItem('remaining-requests', '30');
                    }
                }

                return this.remainingFreeRequests;
            }
        },

        updateRemainingRequests(count: number) {
            this.remainingFreeRequests = count;
            if (process.client) {
                localStorage.setItem('remaining-requests', count.toString());
            }
        },
    }
});