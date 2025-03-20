export interface RegisterRequest {
    email: string;
    password: string;
    firstName?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
    remember?: boolean;
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
    token: string;
    registrationDate: string;
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