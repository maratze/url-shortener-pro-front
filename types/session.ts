/**
 * Interface representing raw session data from the backend
 */
export interface RawSessionData {
    id: number;
    userId: string;
    deviceInfo: string;
    ipAddress: string;
    location: string;
    createdAt: string;
    lastActivityAt: string;
    expiresAt: string;
}

/**
 * Interface representing user session data for display in the UI
 */
export interface UserSessionDisplay {
    id: number;
    device: string;
    location: string;
    lastActive: string;
    ipAddress?: string;
    createdAt: string;
    current: boolean;
}

/**
 * Interface for session termination response
 */
export interface SessionTerminationResponse {
    success: boolean;
    message?: string;
    error?: string;
} 