import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async () => {
    // Загружаем токен из localStorage при инициализации приложения
    if (process.client) {
        const authStore = useAuthStore()
        await authStore.fetchCurrentUser()
    }
})