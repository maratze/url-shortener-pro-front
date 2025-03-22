import type { RawSessionData, SessionTerminationResponse } from '~/types/session';
import { useAuthStore } from '~/stores/auth';

/**
 * API сервис для управления сессиями пользователя
 */
export const sessionApi = {
    /**
     * Получает список всех активных сессий пользователя
     * @returns Promise с массивом данных сессий
     */
    async getSessions(): Promise<RawSessionData[]> {
        try {
            const authStore = useAuthStore();
            const token = authStore.token;
            if (!token) {
                throw new Error('Authentication required');
            }

            const response = await fetch(`${getApiBaseUrl()}/api/user-sessions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication failed or session may have expired');
                }
                throw new Error(`Failed to fetch sessions: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching user sessions:', error);
            throw error;
        }
    },

    /**
     * Получает информацию о текущей сессии пользователя
     * @returns Promise с данными текущей сессии
     */
    async getCurrentSession(): Promise<RawSessionData> {
        try {
            const authStore = useAuthStore();
            const token = authStore.token;
            if (!token) {
                throw new Error('Authentication required');
            }

            const response = await fetch(`${getApiBaseUrl()}/api/user-sessions/current`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication failed or session may have expired');
                }
                throw new Error(`Failed to fetch current session: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching current session:', error);
            throw error;
        }
    },

    /**
     * Завершает указанную сессию пользователя
     * @param sessionId ID сессии для завершения
     * @returns Promise с результатом операции
     */
    async terminateSession(sessionId: number): Promise<SessionTerminationResponse> {
        try {
            const authStore = useAuthStore();
            const token = authStore.token;
            if (!token) {
                return { success: false, error: 'Authentication required' };
            }

            const response = await fetch(`${getApiBaseUrl()}/api/user-sessions/${sessionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    return { success: false, error: 'Authentication failed or session may have expired' };
                }
                return { success: false, error: `Failed to terminate session: ${response.status} ${response.statusText}` };
            }

            return { success: true, message: 'Session terminated successfully' };
        } catch (error) {
            console.error('Error terminating session:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An error occurred while terminating the session'
            };
        }
    },

    /**
     * Завершает все сессии пользователя кроме текущей
     * @returns Promise с результатом операции
     */
    async terminateAllSessionsExceptCurrent(): Promise<SessionTerminationResponse> {
        try {
            const authStore = useAuthStore();
            const token = authStore.token;
            if (!token) {
                return { success: false, error: 'Authentication required' };
            }

            const response = await fetch(`${getApiBaseUrl()}/api/user-sessions/terminate-all-except-current`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    return { success: false, error: 'Authentication failed or session may have expired' };
                }
                return { success: false, error: `Failed to terminate sessions: ${response.status} ${response.statusText}` };
            }

            return { success: true, message: 'All other sessions terminated successfully' };
        } catch (error) {
            console.error('Error terminating all sessions:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An error occurred while terminating sessions'
            };
        }
    }
}; 