<template>
    <div class="w-full">
        <div class="space-y-6">
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

                <div class="mb-6">
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
                                class="block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white sm:text-sm">
                        </div>
                        <div>
                            <label for="lastName"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last
                                Name</label>
                            <input type="text" id="lastName" v-model="lastName"
                                class="block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="email"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email
                            Address</label>
                        <input type="email" id="email" :value="email" disabled
                            class="cursor-not-allowed opacity-75 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white sm:text-sm">
                        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Email address cannot be changed.
                            Please
                            contact support for assistance.</p>
                    </div>

                    <div class="pt-2">
                        <button type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save Changes
                        </button>
                    </div>
                </form>
            </section>

            <!-- Danger Zone -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Danger Zone</h2>

                <div class="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                    <h3 class="text-lg font-medium text-red-800 dark:text-red-400">Delete Account</h3>
                    <p class="mt-2 text-sm text-red-600 dark:text-red-300">Once you delete your account, all of your
                        data
                        will be permanently removed. This action cannot be undone.</p>
                    <button @click="confirmDeleteAccount"
                        class="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Delete Account
                    </button>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToastStore } from '~/stores/toast';
import { useAuthService } from '~/composables/useAuthService';

definePageMeta({
    layout: 'account',
    middleware: ['auth'],
});

const toastStore = useToastStore();
const { isPremium } = useAuthService();

// Данные пользователя
const firstName = ref('');
const lastName = ref('');
const email = ref('john.doe@example.com');

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
        // Здесь будет API запрос для получения данных пользователя
        await new Promise(resolve => setTimeout(resolve, 500));

        firstName.value = 'John';
        lastName.value = 'Doe';
        email.value = 'john.doe@example.com';

    } catch (error) {
        console.error('Error fetching user data:', error);
        toastStore.error('Failed to load user data');
    }
};

const saveProfileInfo = async () => {
    try {
        // Здесь будет API запрос для сохранения данных
        await new Promise(resolve => setTimeout(resolve, 500));
        toastStore.success('Profile information saved successfully');
    } catch (error) {
        console.error('Error saving profile:', error);
        toastStore.error('Failed to save profile information');
    }
};

const confirmDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        deleteAccount();
    }
};

const deleteAccount = async () => {
    try {
        // Здесь будет API запрос для удаления аккаунта
        await new Promise(resolve => setTimeout(resolve, 500));
        toastStore.success('Account deleted successfully');
        // Редирект на главную страницу
        window.location.href = '/';
    } catch (error) {
        console.error('Error deleting account:', error);
        toastStore.error('Failed to delete account');
    }
};

// Загружаем данные при монтировании компонента
onMounted(() => {
    fetchUserData();
});
</script>