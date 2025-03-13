export const shortenUrl = async (originalUrl: string, customAlias?: string) => {
    // Move the composable inside the function
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase || 'https://localhost:7095'; // Добавляем fallback значение

    try {
        const payload = {
            originalUrl,
            ...(customAlias && { customAlias })
        };

        const uniqueId = getOrCreateUniqueId();

        console.log(`Making API request to ${apiBaseUrl}/api/urls with client ID: ${uniqueId}`);

        const response = await fetch(`${apiBaseUrl}/api/urls`, {
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
};

export const getRemainingRequests = async (): Promise<number> => {
    // Move the composable inside the function
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase || 'https://localhost:7095'; // Добавляем fallback значение

    try {
        const uniqueId = getOrCreateUniqueId();

        console.log(`Making API request to ${apiBaseUrl}/api/urls/remaining-requests with client ID: ${uniqueId}`);

        const response = await fetch(`${apiBaseUrl}/api/urls/remaining-requests`, {
            headers: {
                'X-Client-Id': uniqueId
            }
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
};

// Utility function to get or create a unique ID for the user
const getOrCreateUniqueId = (): string => {
    let uniqueId;

    // Use typeof window check to avoid SSR issues
    if (typeof window !== 'undefined') {
        uniqueId = localStorage.getItem('url-shortener-client-id');

        if (!uniqueId) {
            uniqueId = generateUUID();
            localStorage.setItem('url-shortener-client-id', uniqueId);
        }
    } else {
        uniqueId = generateUUID(); // Fallback for server-side
    }

    return uniqueId;
};

// Simple UUID generator
const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};