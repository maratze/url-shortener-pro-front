export interface User {
    id: string;
    email: string;
    name: string;
    role: 'free' | 'premium' | 'admin';
    createdAt: string;
    remainingRequests: number;
    isPremium: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    expiresAt: string;
}