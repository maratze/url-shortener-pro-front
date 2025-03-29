import { wrapFetchWithInterceptor } from '~/services/api/interceptors'

export default defineNuxtPlugin(() => {
    // Замещаем глобальную функцию fetch нашей оберткой
    globalThis.fetch = wrapFetchWithInterceptor(globalThis.fetch)
}) 