export interface RegisterRequest {
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    email: string;
    isEmailVerified: boolean;
    isPremium: boolean;
    token: string;
    registrationDate: string;
}