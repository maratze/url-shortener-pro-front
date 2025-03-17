// URL Shortening Service API
// Сервис для работы с API сокращения ссылок

import { getOrCreateUniqueId } from '../../utils/uniqueId';
import { getApiBaseUrl } from '../../utils/config';

export const urlApi = {
    // Shorten URL
    shortenUrl: async (originalUrl: string, customAlias?: string) => {
        // Get configuration inside the function for proper SSR support
        const apiBaseUrl = getApiBaseUrl();

        try {
            const payload = {
                originalUrl,
                ...(customAlias && { customAlias })
            };

            const uniqueId = getOrCreateUniqueId();

            console.log(`Making API request to ${apiBaseUrl}/api/url with client ID: ${uniqueId}`);

            const response = await fetch(`${apiBaseUrl}/api/url`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Id': uniqueId
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`API Error (${response.status}): ${errorText}`);
                try {
                    const errorData = JSON.parse(errorText);
                    throw new Error(errorData.message || `Failed to shorten URL: ${response.status}`);
                } catch (e) {
                    throw new Error(`Failed to shorten URL: ${response.status}. ${errorText.substring(0, 100)}`);
                }
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Get remaining request count
    getRemainingRequests: async (): Promise<number> => {
        // Get configuration inside the function for proper SSR support
        const apiBaseUrl = getApiBaseUrl();

        try {
            const uniqueId = getOrCreateUniqueId();
            const token = process.client ? localStorage.getItem('token') : null;

            console.log(`Making API request to ${apiBaseUrl}/api/url/remaining-requests with client ID: ${uniqueId}`);

            const headers: Record<string, string> = {
                'X-Client-Id': uniqueId
            };

            // Add authorization token if user is logged in
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${apiBaseUrl}/api/url/remaining-requests`, {
                headers
            });

            if (!response.ok) {
                console.error(`Failed to get remaining requests: ${response.status}`);
                return 0;
            }

            const data = await response.json();
            return data.remainingRequests;
        } catch (error) {
            console.error('API Error:', error);
            return 0;
        }
    }
}; 