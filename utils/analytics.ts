// These functions are placeholders for when API integration is implemented
import type { DeviceStats, GeoStats, TimeStats, UrlStats } from "~/types/analytics";

export const getUrlStats = async (shortCode: string): Promise<UrlStats> => {
    // Move composable inside function body
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;

    try {
        const response = await fetch(`${apiBaseUrl}/api/analytics/${shortCode}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch URL statistics');
        }

        return await response.json();
    } catch (error: any) {
        console.error('API Error:', error);
        throw new Error('Failed to load analytics data');
    }
};

export const getGeoStats = async (shortCode: string): Promise<GeoStats[]> => {
    // Move composable inside function body
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;

    try {
        const response = await fetch(`${apiBaseUrl}/api/analytics/${shortCode}/geo`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch geographical statistics');
        }

        return await response.json();
    } catch (error: any) {
        console.error('API Error:', error);
        throw new Error('Failed to load geographical data');
    }
};

export const getDeviceStats = async (shortCode: string): Promise<DeviceStats[]> => {
    // Move composable inside function body
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;

    try {
        const response = await fetch(`${apiBaseUrl}/api/analytics/${shortCode}/devices`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch device statistics');
        }

        return await response.json();
    } catch (error: any) {
        console.error('API Error:', error);
        throw new Error('Failed to load device data');
    }
};

export const getTimeStats = async (shortCode: string): Promise<TimeStats[]> => {
    // Move composable inside function body
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;

    try {
        const response = await fetch(`${apiBaseUrl}/api/analytics/${shortCode}/time`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch time statistics');
        }

        return await response.json();
    } catch (error: any) {
        console.error('API Error:', error);
        throw new Error('Failed to load time data');
    }
};

// Helper function to safely access localStorage (to avoid SSR issues)
const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('auth-token');
    }
    return null;
};