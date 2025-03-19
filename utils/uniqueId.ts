/**
 * Утилита для создания и получения уникального ID клиента
 * Используется для идентификации запросов к API
 */

// Ключ для хранения ID в localStorage
const CLIENT_ID_KEY = 'client_id';

/**
 * Генерирует уникальный идентификатор
 * @returns Строка с уникальным ID
 */
function generateUniqueId(): string {
    // Создаем уникальный ID из текущего времени и случайного числа
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000000);

    return `${timestamp}-${random}`;
}

/**
 * Получает существующий или создает новый уникальный ID клиента
 * Если ID уже существует в localStorage, возвращает его
 * Иначе создает новый ID, сохраняет его и возвращает
 * 
 * @returns Уникальный ID клиента
 */
export function getOrCreateUniqueId(): string {
    // Проверяем, доступен ли localStorage (только на клиенте)
    if (typeof window === 'undefined' || !window.localStorage) {
        // Для SSR или если localStorage недоступен, просто генерируем временный ID
        return generateUniqueId();
    }

    // Пытаемся получить существующий ID
    let clientId = localStorage.getItem(CLIENT_ID_KEY);

    // Если ID не существует, создаем новый
    if (!clientId) {
        clientId = generateUniqueId();
        localStorage.setItem(CLIENT_ID_KEY, clientId);
        console.log('Created new client ID:', clientId);
    }

    return clientId;
} 