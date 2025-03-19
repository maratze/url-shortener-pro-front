/**
 * Конфигурационный файл для API и других настроек приложения
 */

import { useRuntimeConfig } from '#app';

/**
 * Возвращает базовый URL API в зависимости от окружения
 * Использует runtimeConfig из Nuxt для доступа к настройкам
 */
export function getApiBaseUrl(): string {
    // Используем useRuntimeConfig для получения настроек из nuxt.config.ts
    if (process.client) {
        const config = useRuntimeConfig();
        return config.public.apiBase;
    }

    // Fallback для SSR или если не можем получить конфигурацию
    return process.env.API_BASE_URL!;
}

/**
 * Получаем URL фронтенда для редиректов и callback'ов
 * Использует runtimeConfig из Nuxt для доступа к настройкам
 */
export function getFrontendUrl(): string {
    // Используем useRuntimeConfig для получения настроек из nuxt.config.ts
    if (process.client) {
        const config = useRuntimeConfig();
        return config.public.baseUrl;
    }

    // Fallback для SSR или если не можем получить конфигурацию
    return process.env.BASE_URL!;
} 