export interface ShortUrl {
    id: string;
    originalUrl: string;
    shortUrl: string;
    createdAt: string;
    expiresAt?: string | null;
    clickCount: number;
    alias?: string;
}

export interface ShortenUrlParams {
    url: string;
    alias?: string;
    expiresAt?: string | null;
}

export interface AnalyticsData {
    clickCount: number;
    referrers: {
        name: string;
        count: number;
    }[];
    countries: {
        code: string;
        name: string;
        count: number;
    }[];
    devices: {
        name: string;
        count: number;
    }[];
    browsers: {
        name: string;
        count: number;
    }[];
    clicksOverTime: {
        date: string;
        count: number;
    }[];
}