import { defineStore } from 'pinia';
import { shortenUrl, getRemainingRequests } from '~/utils/api';
import type { ShortenResponse } from '~/types/api';

interface UrlState {
    history: ShortenResponse[];
    remainingFreeRequests: number;
    error: string | null;
}

export const useUrlStore = defineStore('url', {
    state: (): UrlState => ({
        history: [],
        remainingFreeRequests: 30, // Default value
        error: null
    }),

    actions: {
        async shortenUrl(originalUrl: string, customAlias?: string): Promise<ShortenResponse> {
            try {
                const response = await shortenUrl(originalUrl, customAlias);

                // Update remaining requests count
                this.remainingFreeRequests = response.remainingFreeRequests;

                // Add to history
                this.history.unshift(response);

                // Limit history to last 10 items
                if (this.history.length > 10) {
                    this.history = this.history.slice(0, 10);
                }

                // Save to localStorage
                this.saveToLocalStorage();

                return response;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            }
        },

        async fetchRemainingRequests(): Promise<void> {
            try {
                this.remainingFreeRequests = await getRemainingRequests();
            } catch (error: any) {
                this.error = error.message;
                console.error('Failed to fetch remaining requests:', error);
            }
        },

        saveToLocalStorage(): void {
            try {
                localStorage.setItem('url-shortener-history', JSON.stringify(this.history));
                localStorage.setItem('url-shortener-remaining', this.remainingFreeRequests.toString());
            } catch (error) {
                console.error('Failed to save to localStorage:', error);
            }
        },

        loadFromLocalStorage(): void {
            try {
                const history = localStorage.getItem('url-shortener-history');
                const remaining = localStorage.getItem('url-shortener-remaining');

                if (history) {
                    this.history = JSON.parse(history);
                }

                if (remaining) {
                    this.remainingFreeRequests = parseInt(remaining, 10);
                }
            } catch (error) {
                console.error('Failed to load from localStorage:', error);
            }
        }
    }
});