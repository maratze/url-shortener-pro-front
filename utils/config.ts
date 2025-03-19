/**
 * Конфигурационный файл для API и других настроек приложения
 */

/**
 * Возвращает базовый URL API в зависимости от окружения
 * В production берет URL из переменной окружения или использует дефолтное значение
 * В development использует локальный адрес
 */
export function getApiBaseUrl(): string {
    // Проверяем окружение
    const isDev = process.env.NODE_ENV === 'development';

    // В режиме разработки используем локальный сервер
    if (isDev) {
        return 'http://localhost:3000';
    }

    // В production берем URL из переменных окружения или используем дефолтный
    const apiUrl = process.env.NUXT_PUBLIC_API_URL || 'https://api-url-shortener.com';

    return apiUrl;
}

/**
 * Получаем URL фронтенда для редиректов и callback'ов
 */
export function getFrontendUrl(): string {
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
        return 'http://localhost:3000';
    }

    return process.env.NUXT_PUBLIC_FRONTEND_URL || 'https://url-shortener.com';
} 