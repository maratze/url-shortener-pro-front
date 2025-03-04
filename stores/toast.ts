import { defineStore } from 'pinia';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
    duration: number;
    progressPercentage: number;
    timeoutId?: ReturnType<typeof setTimeout>;
    intervalId?: ReturnType<typeof setInterval>;
}

export const useToastStore = defineStore('toast', {
    state: () => ({
        toasts: [] as Toast[],
    }),

    actions: {
        add(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 5000) {
            const id = Date.now().toString();

            // Create new toast
            const toast: Toast = {
                id,
                message,
                type,
                duration,
                progressPercentage: 100,
            };

            // Add to list
            this.toasts.push(toast);

            // Setup progress bar update
            const startTime = Date.now();
            const endTime = startTime + duration;

            toast.intervalId = setInterval(() => {
                const now = Date.now();
                const timeLeft = endTime - now;

                if (timeLeft <= 0) {
                    this.remove(id);
                } else {
                    const remainingPercentage = (timeLeft / duration) * 100;

                    // Find this toast (in case the array has been modified)
                    const toastIndex = this.toasts.findIndex(t => t.id === id);
                    if (toastIndex !== -1) {
                        this.toasts[toastIndex].progressPercentage = remainingPercentage;
                    }
                }
            }, 100);

            // Auto remove after duration
            toast.timeoutId = setTimeout(() => {
                this.remove(id);
            }, duration);

            return id;
        },

        remove(id: string) {
            const toastIndex = this.toasts.findIndex(t => t.id === id);

            if (toastIndex !== -1) {
                const toast = this.toasts[toastIndex];

                // Clean up timeouts and intervals
                if (toast.timeoutId) clearTimeout(toast.timeoutId);
                if (toast.intervalId) clearInterval(toast.intervalId);

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