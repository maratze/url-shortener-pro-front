import { defineStore } from 'pinia';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
    duration: number;
}

export const useToastStore = defineStore('toast', {
    state: () => ({
        toasts: [] as Toast[]
    }),

    actions: {
        add(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 5000) {
            const id = Date.now().toString();

            // Create new toast
            const toast: Toast = {
                id,
                message,
                type,
                duration
            };

            // Add to list
            this.toasts.push(toast);

            // Auto remove after duration + 500ms (учитываем время для анимации исчезновения)
            setTimeout(() => {
                this.remove(id);
            }, duration + 500);

            return id;
        },

        remove(id: string) {
            const toastIndex = this.toasts.findIndex(t => t.id === id);
            if (toastIndex !== -1) {
                // Remove toast
                this.toasts.splice(toastIndex, 1);
            }
        },

        success(message: string, duration?: number) {
            return this.add(message, 'success', duration);
        },

        error(message: string, duration?: number) {
            return this.add(message, 'error', duration);
        },

        info(message: string, duration?: number) {
            return this.add(message, 'info', duration);
        }
    }
});