<template>
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
        <div v-if="loading" class="text-center">
            <div
                class="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mb-4 mx-auto">
            </div>
            <p class="text-lg text-slate-700 dark:text-slate-300">Завершаем вход в систему...</p>
        </div>
        <div v-else-if="error" class="text-center max-w-md">
            <div class="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg text-red-700 dark:text-red-400 mb-6">
                <p>{{ error }}</p>
            </div>
            <NuxtLink to="/login" class="text-indigo-600 dark:text-indigo-400 hover:underline">
                Вернуться на страницу входа
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { useToastStore } from '~/stores/toast';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();

const loading = ref(true);
const error = ref('');

onMounted(async () => {
    try {
        // Получаем параметры из URL
        const token = route.query.token as string;
        const email = route.query.email as string;
        const returnUrl = (route.query.returnUrl as string) || '/dashboard';

        if (!token) {
            throw new Error('Токен аутентификации не найден');
        }

        // Сохраняем токен и получаем данные пользователя
        authStore.setToken(token);
        await authStore.fetchCurrentUser();

        if (!authStore.isAuthenticated) {
            throw new Error('Не удалось завершить аутентификацию');
        }

        // Показываем сообщение об успешном входе
        toastStore.success('Вход выполнен успешно!');

        // Перенаправляем пользователя на целевую страницу
        setTimeout(() => {
            router.push(returnUrl);
        }, 300);
    } catch (err) {
        console.error('Ошибка аутентификации через OAuth:', err);
        error.value = err instanceof Error ? err.message : 'Произошла ошибка при входе через Google';
        toastStore.error(error.value);
        loading.value = false;
    }
});
</script>