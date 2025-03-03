export interface ShortenRequest {
    originalUrl: string;
    customAlias?: string; // only for premium users
}

export interface ShortenResponse {
    shortUrl: string;
    originalUrl: string;
    shortCode: string;
    qrCodeUrl: string;
    expiresAt?: string;
    remainingFreeRequests: number;
}

export interface ApiError {
    statusCode: number;
    message: string;
    errors?: Record<string, string[]>;
}