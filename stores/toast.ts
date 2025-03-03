import { defineStore } from 'pinia';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
    duration: number;
}

interface ToastState {
    toasts: Toast[];
    counter: number;
}

export const useToastStore = defineStore('toast', {
    state: (): ToastState => ({
        toasts: [],
        counter: 0
    }),

    actions: {
        showToast(message: string, type: ToastType = 'info', duration: number = 3000): number {
            const id = ++this.counter;

            this.toasts.push({
                id,
                message,
                type,
                duration
            });

            setTimeout(() => {
                this.removeToast(id);
            }, duration);

            return id;
        },

        removeToast(id: number): void {
            const index = this.toasts.findIndex(toast => toast.id === id);
            if (index !== -1) {
                this.toasts.splice(index, 1);
            }
        },

        success(message: string, duration: number = 3000): number {
            return this.showToast(message, 'success', duration);
        },

        error(message: string, duration: number = 4000): number {
            return this.showToast(message, 'error', duration);
        },

        info(message: string, duration: number = 3000): number {
            return this.showToast(message, 'info', duration);
        },

        warning(message: string, duration: number = 3500): number {
            return this.showToast(message, 'warning', duration);
        }
    }
});