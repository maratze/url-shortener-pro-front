import { DefaultSession } from 'next-auth'

// Расширяем типы для Next Auth
declare module 'next-auth' {
    interface Session {
        token?: string
        user: DefaultSession['user'] & {
            token?: string
        }
    }

    interface User {
        token?: string
    }
}

// Расширяем JWT для хранения токена
declare module 'next-auth/jwt' {
    interface JWT {
        token?: string
    }
}

export interface RegisterRequest {
    email: string
    password: string
}

export interface LoginRequest {
    email: string
    password: string
    remember?: boolean
}

export interface UserResponse {
    id: number
    email: string
    isPremium: boolean
    createdAt: string
    token?: string
}

export interface OAuthRequest {
    provider: string
    token: string
    email?: string
    name?: string
} 