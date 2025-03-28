export interface RegisterRequest {
    email: string;
    password: string;
    firstName?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
    remember?: boolean;
    verificationCode?: string;
}

export interface LoginResponse {
    token?: string;
    requiresTwoFactor?: boolean;
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    isEmailVerified?: boolean;
    isPremium?: boolean;
    authProvider?: string;
    isOAuthUser?: boolean;
    isTwoFactorEnabled?: boolean;
    registrationDate?: string;
}

export interface OAuthRequest {
    provider: string;
    token: string;
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
}

export interface UserResponse {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    isEmailVerified: boolean;
    isPremium: boolean;
    authProvider?: string;
    isOAuthUser?: boolean;
    isTwoFactorEnabled?: boolean;
    requiresTwoFactor?: boolean;
    hasPasswordSet?: boolean;
    token: string;
    registrationDate: string;
    lastLoginAt?: string;
}

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
}

export interface ChangePasswordRequest {
    currentPassword?: string;
    newPassword: string;
    isGoogleUser?: boolean;
}

export interface TwoFactorAuthRequest {
    enable: boolean;
    code?: string;
}

export interface TwoFactorAuthResponse {
    isEnabled: boolean;
    qrCodeUrl?: string;
    qrCodeData?: string;
    manualEntryKey?: string;
    message?: string;
}