export interface LinkData {
    id: string;
    originalUrl: string;
    shortUrl: string;
    title?: string;
    clicks: number;
    clickTrend: number;
    isActive: boolean;
    createdAt: string;
    customSlug?: string;
    tags?: string[];
    password?: string;
    expiresAt?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    projectId?: string;
}

export interface LinkAnalytics {
    totalClicks: number;
    uniqueClicks: number;
    clicksByCountry: { country: string; count: number }[];
    clicksByDevice: { device: string; count: number }[];
    clicksByBrowser: { browser: string; count: number }[];
    clicksByDate: { date: string; count: number }[];
    clicksByHour: { hour: number; count: number }[];
    clicksByReferrer: { referrer: string; count: number }[];
}

export interface SummaryData {
    totalLinks: number;
    totalClicks: number;
    averageCtr: number;
    activeLinks: number;
    activeLinksPercentage: number;
    linksTrend: number;
    clicksTrend: number;
    ctrTrend: number;
    activeLinksTrend: number;
    linksSparkline: number[];
    clicksSparkline: number[];
    ctrSparkline: number[];
    activeLinksSparkline: number[];
    weeklyClicksData: Array<{ day: string, clicks: number }>;
}