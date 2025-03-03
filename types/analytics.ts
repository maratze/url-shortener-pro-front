export interface ClickData {
    shortCode: string;
    timestamp: string;
    ip?: string;
    country?: string;
    city?: string;
    device?: string;
    browser?: string;
    os?: string;
    referer?: string;
}

export interface UrlStats {
    shortCode: string;
    originalUrl: string;
    shortUrl: string;
    totalClicks: number;
    createdAt: string;
    lastClickedAt?: string;
    clicks: ClickData[];
}

export interface GeoStats {
    country: string;
    count: number;
    percentage: number;
}

export interface DeviceStats {
    type: string;
    count: number;
    percentage: number;
}

export interface TimeStats {
    date: string;
    count: number;
}