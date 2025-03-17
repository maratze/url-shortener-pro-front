import { getApiBaseUrl } from '~/utils/config';

export const sessionApi = {
    // Получение всех активных сессий пользователя
    getSessions: async () => {
        try {
            const token = localStorage.getItem('token');
            const apiBaseUrl = getApiBaseUrl();

            if (!token) throw new Error('Требуется авторизация');

            const response = await fetch(`${apiBaseUrl}/api/UserSession`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Ошибка получения сессий: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка при получении сессий:', error);
            throw error;
        }
    },

    // Получение текущей сессии
    getCurrentSession: async () => {
        try {
            const token = localStorage.getItem('token');
            const apiBaseUrl = getApiBaseUrl();

            if (!token) throw new Error('Требуется авторизация');

            const response = await fetch(`${apiBaseUrl}/api/UserSession/current`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Ошибка получения текущей сессии: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка при получении текущей сессии:', error);
            throw error;
        }
    },

    // Завершение сессии
    terminateSession: async (sessionId: number) => {
        try {
            const token = localStorage.getItem('token');
            const apiBaseUrl = getApiBaseUrl();

            if (!token) throw new Error('Требуется авторизация');

            const response = await fetch(`${apiBaseUrl}/api/UserSession/${sessionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Ошибка при завершении сессии: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Ошибка при завершении сессии:', error);
            throw error;
        }
    },

    // Завершение всех сессий, кроме текущей
    terminateAllSessionsExceptCurrent: async () => {
        try {
            const token = localStorage.getItem('token');
            const apiBaseUrl = getApiBaseUrl();

            if (!token) throw new Error('Требуется авторизация');

            const response = await fetch(`${apiBaseUrl}/api/UserSession/all-except-current`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Ошибка при завершении сессий: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Ошибка при завершении сессий:', error);
            throw error;
        }
    }
}; 