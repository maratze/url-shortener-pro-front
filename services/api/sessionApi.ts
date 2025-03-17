import { getApiBaseUrl } from '../../utils/config';

export const sessionApi = {
    // Get all active user sessions
    getSessions: async () => {
        try {
            const token = localStorage.getItem('token');
            const apiBaseUrl = getApiBaseUrl();

            if (!token) throw new Error('Authorization required');

            const response = await fetch(`${apiBaseUrl}/api/sessions`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error getting sessions: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error retrieving sessions:', error);
            throw error;
        }
    },

    // Get current session
    getCurrentSession: async () => {
        try {
            const token = localStorage.getItem('token');
            const apiBaseUrl = getApiBaseUrl();

            if (!token) throw new Error('Authorization required');

            const response = await fetch(`${apiBaseUrl}/api/sessions/current`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error getting current session: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error retrieving current session:', error);
            throw error;
        }
    },

    // Terminate session
    terminateSession: async (sessionId: number) => {
        try {
            const token = localStorage.getItem('token');
            const apiBaseUrl = getApiBaseUrl();

            if (!token) throw new Error('Authorization required');

            const response = await fetch(`${apiBaseUrl}/api/sessions/${sessionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error terminating session: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Error terminating session:', error);
            throw error;
        }
    },

    // Terminate all sessions except current
    terminateAllSessionsExceptCurrent: async () => {
        try {
            const token = localStorage.getItem('token');
            const apiBaseUrl = getApiBaseUrl();

            if (!token) throw new Error('Authorization required');

            const response = await fetch(`${apiBaseUrl}/api/sessions/all-except-current`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error terminating sessions: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Error terminating sessions:', error);
            throw error;
        }
    }
}; 