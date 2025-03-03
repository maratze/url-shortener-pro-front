export const shortenUrl = async (originalUrl: string, customAlias?: string) => {
    // Move the composable inside the function
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;

    try {
        const payload = {
            originalUrl,
            ...(customAlias && { customAlias })
        };

        const uniqueId = getOrCreateUniqueId();

        const response = await fetch(`${apiBaseUrl}/api/url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Id': uniqueId
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to shorten URL');
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
    const apiBaseUrl = config.public.apiBase;

    try {
        const uniqueId = getOrCreateUniqueId();

        const response = await fetch(`${apiBaseUrl}/api/urls/remaining-requests`, {
            headers: {
                'X-Client-Id': uniqueId
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get remaining requests');
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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};