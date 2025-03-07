export interface LinkData {
    id: string;
    originalUrl: string;
    shortUrl: string;
    title?: string;
    clicks: number;
    isActive: boolean;
    createdAt: string;
    customSlug?: string;
    tags?: string[];
    qrCode?: string;
    password?: string;
    expiresAt?: string;
    userId?: string;
    // Дополнительные поля для аутентифицированных пользователей
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
}

export interface SummaryData {
    totalLinks: number;
    totalClicks: number;
    averageCTR: number;
    activeLinks: number;
    weeklyClicksData: Array<{day: string, clicks: number}>;
}

export interface LinkAnalytics {
    totalClicks: number;
    uniqueClicks: number;
    clicksByCountry: Array<{country: string, count: number}>;
    clicksByDevice: Array<{device: string, count: number}>;
    clicksByBrowser: Array<{browser: string, count: number}>;
    clicksByDate: Array<{date: string, count: number}>;
    clicksByHour: Array<{hour: number, count: number}>;
    clicksByReferrer: Array<{referrer: string, count: number}>;
}