<template>
    <div class="w-full">
        <div class="space-y-4">
            <!-- Profile Section -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Profile Information</h2>
                    <NuxtLink v-if="!isPremium" to="/pricing"
                        class="px-4 py-2 rounded-lg flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm">
                        <svg class="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Upgrade to PRO
                    </NuxtLink>
                </div>

                <div v-if="!isPremium"
                    class="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div class="text-sm text-amber-700 dark:text-amber-400 flex items-center">
                        <svg class="h-4 w-4 mr-1.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                            You're using a free account with limited functionality.
                            <NuxtLink to="/pricing" class="text-indigo-600 dark:text-indigo-400 hover:underline">Upgrade
                                to
                                PRO</NuxtLink>
                            for access to full analytics and unlimited links.
                        </span>
                    </div>
                </div>

                <div class="mb-4">
                    <div class="flex items-center mb-4">
                        <div
                            class="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                            {{ userInitials }}
                        </div>
                        <div class="ml-4">
                            <div class="text-lg font-medium text-slate-900 dark:text-white">
                                {{ userFullName || 'Your Name' }}
                            </div>
                            <div class="text-sm text-slate-500 dark:text-slate-400">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                    :class="accountTypeClasses">
                                    {{ isPremium ? 'PRO Account' : 'Free Account' }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <form @submit.prevent="saveProfileInfo" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label for="firstName"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First
                                Name</label>
                            <input type="text" id="firstName" v-model="firstName"
                                class="block w-full h-11 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base">
                        </div>
                        <div>
                            <label for="lastName"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last
                                Name</label>
                            <input type="text" id="lastName" v-model="lastName"
                                class="block w-full h-11 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base">
                        </div>
                    </div>

                    <div>
                        <label for="email"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email
                            Address</label>
                        <div class="relative">
                            <input type="email" id="email" :value="email" disabled
                                class="cursor-not-allowed bg-slate-100 dark:bg-slate-700/50 block w-full h-11 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none dark:text-slate-400 text-slate-500 text-base">
                            <div
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>
                        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center">
                            <svg class="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Email address cannot be changed. Please contact support for assistance.
                        </p>
                    </div>

                    <div class="pt-2">
                        <button type="submit"
                            class="inline-flex justify-center items-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[120px] h-10 w-[140px]"
                            :disabled="isLoading">
                            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span>{{ isLoading ? 'Saving...' : 'Save Changes' }}</span>
                        </button>
                    </div>
                </form>
            </section>

            <!-- Advanced Settings (бывший Danger Zone) -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <details class="group">
                    <summary class="cursor-pointer flex items-center text-slate-700 dark:text-slate-300">
                        <h2 class="text-lg font-medium">Advanced Settings</h2>
                        <div class="ml-auto">
                            <svg class="h-5 w-5 transform group-open:rotate-180 transition-transform duration-200"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </summary>

                    <div
                        class="mt-4 p-3 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/10 dark:border-red-900/30">
                        <h3 class="text-base font-medium text-red-700 dark:text-red-400">Delete Account</h3>
                        <p class="mt-1 text-sm text-red-600 dark:text-red-300">Once you delete your account, all of your
                            data will be permanently removed. This action cannot be undone.</p>
                        <button @click="confirmDeleteAccount"
                            class="mt-3 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 min-w-[120px] h-9"
                            :disabled="isDeleting">
                            <svg v-if="isDeleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span>{{ isDeleting ? 'Deleting...' : 'Delete Account' }}</span>
                        </button>
                    </div>
                </details>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useToastStore } from '~/stores/toast';
import { useAuthService } from '~/composables/useAuthService';

definePageMeta({
    layout: 'account',
    middleware: ['auth'],
});

const toastStore = useToastStore();
const { isPremium, user, updateProfile } = useAuthService();

// Данные пользователя
const firstName = ref('');
const lastName = ref('');
const email = ref('');

// Состояния загрузки
const isLoading = ref(false);
const isDeleting = ref(false);

// Вычисляемые свойства
const userFullName = computed(() => {
    if (firstName.value && lastName.value) {
        return `${firstName.value} ${lastName.value}`;
    } else if (firstName.value) {
        return firstName.value;
    } else if (lastName.value) {
        return lastName.value;
    }
    return '';
});

const userInitials = computed(() => {
    const first = firstName.value ? firstName.value.charAt(0).toUpperCase() : '';
    const last = lastName.value ? lastName.value.charAt(0).toUpperCase() : '';
    return first + last || 'U';
});

const accountTypeClasses = computed(() => {
    return isPremium.value
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
});

// Функции
const fetchUserData = async () => {
    try {
        if (user.value) {
            firstName.value = user.value.firstName || '';
            lastName.value = user.value.lastName || '';
            email.value = user.value.email || '';
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        toastStore.error('Failed to load user data');
    }
};

const saveProfileInfo = async () => {
    try {
        // Удаляем лишние пробелы в начале и конце полей
        firstName.value = firstName.value.trim();
        lastName.value = lastName.value.trim();

        // Базовая валидация
        if (firstName.value.length > 50) {
            toastStore.error('First name is too long (maximum 50 characters)');
            return;
        }

        if (lastName.value.length > 50) {
            toastStore.error('Last name is too long (maximum 50 characters)');
            return;
        }

        isLoading.value = true;

        // Вызываем API для обновления профиля
        const response = await updateProfile({
            firstName: firstName.value,
            lastName: lastName.value
        });

        if (response.success) {
            // Показываем сообщение об успехе
            toastStore.success('Profile information saved successfully');

            // Обновляем локальные данные (на случай, если API изменило данные)
            fetchUserData();
        } else {
            // Показываем сообщение об ошибке
            toastStore.error(response.error || 'Failed to save profile information');
        }
    } catch (error: any) {
        console.error('Error saving profile:', error);
        toastStore.error(error.message || 'Failed to save profile information');
    } finally {
        isLoading.value = false;
    }
};

const confirmDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        deleteAccount();
    }
};

const deleteAccount = async () => {
    try {
        isDeleting.value = true;
        // Здесь будет API запрос для удаления аккаунта
        await new Promise(resolve => setTimeout(resolve, 800));
        toastStore.success('Account deleted successfully');
        // Редирект на главную страницу
        window.location.href = '/';
    } catch (error) {
        console.error('Error deleting account:', error);
        toastStore.error('Failed to delete account');
    } finally {
        isDeleting.value = false;
    }
};

// Загружаем данные при монтировании компонента
onMounted(() => {
    fetchUserData();
});

// Получаем данные пользователя при изменении объекта user (например, после входа)
watch(() => user.value, (newUser) => {
    if (newUser) {
        fetchUserData();
    }
}, { immediate: true });
</script>

<style scoped>
/* Стили для input с состоянием disabled */
input:disabled {
    opacity: 0.8;
}

/* Стили для кнопки, чтобы она не меняла размер */
button[type="submit"] {
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

button[type="submit"] svg {
    flex-shrink: 0;
}
</style>