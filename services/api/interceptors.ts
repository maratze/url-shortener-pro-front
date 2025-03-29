import { useAuthStore } from '~/stores/auth'
import { useToastStore } from '~/stores/toast'
import { navigateTo } from '#app'

/**
 * Общая функция-обработчик 401 ошибок для всех API запросов
 * @param error Ошибка, которая произошла при выполнении запроса
 */
export const handleAuthError = (error: any) => {
    // Проверяем, это 401 ошибка?
    if (error.response?.status === 401) {
        console.error('Unauthorized API call detected:', error.config?.url)

        // Получаем доступ к хранилищу авторизации
        const authStore = useAuthStore()
        const toastStore = useToastStore()

        // Проверяем сообщение ошибки
        const errorMessage = error.response?.data?.message

        // Если есть конкретное сообщение о недействительной сессии
        if (errorMessage && (
            errorMessage.includes('session expired') ||
            errorMessage.includes('Session expired') ||
            errorMessage.includes('invalid') ||
            errorMessage.includes('terminated')
        )) {
            console.log('Session invalidated, logging out')

            // Показываем сообщение пользователю
            toastStore.error('Ваша сессия завершена. Пожалуйста, войдите снова.')

            // Выполняем выход и перенаправляем на страницу входа
            authStore.logout()
            navigateTo('/login')
        }
    }

    // Переопределяем ошибку, чтобы она могла распространяться дальше
    throw error
}

/**
 * Функция для добавления перехватчика к fetch запросам
 * @param originalFetch Оригинальная функция fetch для обертывания
 */
export const wrapFetchWithInterceptor = (originalFetch: typeof fetch): typeof fetch => {
    return async (input: RequestInfo | URL, init?: RequestInit) => {
        try {
            const response = await originalFetch(input, init)

            // Проверяем статус ответа
            if (response.status === 401) {
                // Читаем тело ответа
                const responseData = await response.json()

                // Создаем ошибку, которая будет перехвачена handleAuthError
                const error = new Error('Unauthorized')
                // @ts-ignore - Добавляем свойства для имитации axios-подобной ошибки
                error.response = {
                    status: 401,
                    data: responseData,
                    statusText: 'Unauthorized'
                }
                // @ts-ignore
                error.config = { url: typeof input === 'string' ? input : input.toString() }

                // Передаем в обработчик ошибок
                handleAuthError(error)
            }

            return response
        } catch (error) {
            // Перехватываем сетевые ошибки
            handleAuthError(error)
            throw error
        }
    }
} 