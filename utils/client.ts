/**
 * Безопасно получает значение из localStorage
 * @param key Ключ в localStorage
 * @param defaultValue Значение по умолчанию
 */
export const getLocalStorage = <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
        const value = localStorage.getItem(key);
        if (value === null) {
            return defaultValue;
        }

        return JSON.parse(value) as T;
    } catch (error) {
        console.error(`Error getting ${key} from localStorage:`, error);
        return defaultValue;
    }
};

/**
 * Безопасно устанавливает значение в localStorage
 * @param key Ключ в localStorage
 * @param value Значение для сохранения
 */
export const setLocalStorage = <T>(key: string, value: T): boolean => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error setting ${key} in localStorage:`, error);
        return false;
    }
};

/**
 * Безопасно удаляет значение из localStorage
 * @param key Ключ в localStorage
 */
export const removeLocalStorage = (key: string): boolean => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing ${key} from localStorage:`, error);
        return false;
    }
};

/**
 * Выполняет функцию только на клиенте
 * @param callback Функция для выполнения
 */
export const onClientOnly = (callback: Function): void => {
    callback();
};

/**
 * Безопасно получает значение из sessionStorage
 * @param key Ключ в sessionStorage
 * @param defaultValue Значение по умолчанию
 */
export const getSessionStorage = <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
        const value = sessionStorage.getItem(key);
        if (value === null) {
            return defaultValue;
        }

        return JSON.parse(value) as T;
    } catch (error) {
        console.error(`Error getting ${key} from sessionStorage:`, error);
        return defaultValue;
    }
};

/**
 * Безопасно устанавливает значение в sessionStorage
 * @param key Ключ в sessionStorage
 * @param value Значение для сохранения
 */
export const setSessionStorage = <T>(key: string, value: T): boolean => {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error setting ${key} in sessionStorage:`, error);
        return false;
    }
};

/**
 * Безопасно получает строковое значение из localStorage
 * без JSON.parse для токенов и других строк
 * @param key Ключ в localStorage
 * @param defaultValue Значение по умолчанию
 */
export const getStringFromStorage = (key: string, defaultValue: string = ''): string => {
    try {
        const value = localStorage.getItem(key);
        return value !== null ? value : defaultValue;
    } catch (error) {
        console.error(`Error getting ${key} from localStorage:`, error);
        return defaultValue;
    }
};

/**
 * Безопасно устанавливает строковое значение в localStorage
 * без JSON.stringify для токенов и других строк
 * @param key Ключ в localStorage
 * @param value Строковое значение для сохранения
 */
export const setStringInStorage = (key: string, value: string): boolean => {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error(`Error setting ${key} in localStorage:`, error);
        return false;
    }
}; 