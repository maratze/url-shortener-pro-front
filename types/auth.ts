export interface RegisterRequest {
    email: string;
    password: string;
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
}

export interface UserResponse {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    isEmailVerified: boolean;
    isPremium: boolean;
    token: string;
    registrationDate: string;
}

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
}