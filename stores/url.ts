import { defineStore } from 'pinia';
import { useToastStore } from '~/stores/toast';

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
    }),

    actions: {
        async shortenUrl(params: ShortenUrlParams): Promise<UrlData> {
            const toastStore = useToastStore();
            this.loading = true;

            try {
                // In a real application, this would be an API call
                // For now, we're simulating it
                await new Promise((resolve) => setTimeout(resolve, 800));

                // Check if URL is valid
                try {
                    new URL(params.url);
                } catch (e) {
                    throw new Error('Please enter a valid URL');
                }

                // Check alias if provided
                if (params.alias && !/^[a-zA-Z0-9-_]+$/.test(params.alias)) {
                    throw new Error('Alias can only contain letters, numbers, hyphens and underscores');
                }

                // Check if we have requests left
                if (this.remainingFreeRequests <= 0) {
                    throw new Error('You have used all your free shortens for today. Please upgrade your plan for unlimited shortens.');
                }

                // Generate a short URL
                const id = Math.random().toString(36).substring(2, 10);
                const alias = params.alias || id;
                const shortUrl = `https://short.link/${alias}`;

                // Check if alias already exists in our urls
                if (params.alias && this.urls.some(url => url.shortUrl === shortUrl)) {
                    throw new Error('This custom alias is already taken. Please choose another one.');
                }

                const newUrl: UrlData = {
                    id,
                    originalUrl: params.url,
                    shortUrl,
                    createdAt: new Date().toISOString(),
                    clickCount: 0,
                };

                // Decrease remaining free requests
                this.remainingFreeRequests--;

                // Add to our list of URLs
                this.urls.unshift(newUrl);

                // Save to local storage
                this.saveToLocalStorage();

                // Success toast
                toastStore.success('URL shortened successfully');

                return newUrl;
            } catch (error: any) {
                toastStore.error(error?.message || 'Failed to shorten URL');
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
            // In a real app, this would be an API call
            // For demo purposes, we're just using the local value
            await new Promise(resolve => setTimeout(resolve, 500));

            // For demo: Reset counter to 30 every time this is called
            // In a real app, this would fetch the actual remaining count from the server
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
    }
});