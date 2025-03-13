<template>
    <div class="container mx-auto p-6 max-w-7xl">
        <PageHeader title="Account Settings">
            <template #button v-if="!isPremium">
                <NuxtLink to="/pricing"
                    class="px-4 py-2 rounded-lg flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                    <svg class="h-5 w-5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Upgrade to PRO
                </NuxtLink>
            </template>
            <template #subtitle v-if="!isPremium">
                <div class="mt-2 text-sm text-slate-500 dark:text-slate-400 flex items-center">
                    <svg class="h-4 w-4 mr-1.5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                        You're using a free account with limited functionality.
                        <NuxtLink to="/pricing" class="text-indigo-600 dark:text-indigo-400 hover:underline">Upgrade to
                            PRO</NuxtLink>
                        for access to full analytics and unlimited links.
                    </span>
                </div>
            </template>
        </PageHeader>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Sidebar with navigation -->
            <div class="lg:col-span-1">
                <div
                    class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                    <h2 class="text-lg font-medium text-slate-900 dark:text-white mb-4">Settings</h2>
                    <nav class="space-y-1">
                        <a href="#profile"
                            class="flex items-center px-3 py-2 text-sm rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium">
                            <svg class="h-4 w-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile
                        </a>
                        <a href="#account"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                            <svg class="h-4 w-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Account
                        </a>
                        <a href="#security"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                            <svg class="h-4 w-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Security
                        </a>
                        <a href="#notifications"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                            <svg class="h-4 w-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            Notifications
                        </a>
                        <a href="#billing"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                            <svg class="h-4 w-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Billing
                        </a>
                    </nav>
                </div>
            </div>

            <!-- Main content -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Profile Section -->
                <section id="profile"
                    class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Profile Information</h2>

                    <div class="mb-6">
                        <div class="flex items-center mb-4">
                            <div
                                class="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                                {{ userInitials }}
                            </div>
                            <div class="ml-4">
                                <div class="text-lg font-medium text-slate-900 dark:text-white">{{ userFullName || 'Your Name' }}</div>
                                <div class="text-sm text-slate-500 dark:text-slate-400">
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
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

                        <div>
                            <label for="company"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company
                                (Optional)</label>
                            <input type="text" id="company" v-model="company"
                                class="block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white sm:text-sm">
                        </div>

                        <div>
                            <label for="timezone"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Timezone</label>
                            <select id="timezone" v-model="timezone"
                                class="block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white sm:text-sm">
                                <option value="UTC">UTC</option>
                                <option value="America/New_York">Eastern Time (ET)</option>
                                <option value="America/Chicago">Central Time (CT)</option>
                                <option value="America/Denver">Mountain Time (MT)</option>
                                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                <option value="Europe/London">London (GMT)</option>
                                <option value="Europe/Paris">Paris (CET)</option>
                                <option value="Asia/Tokyo">Tokyo (JST)</option>
                            </select>
                        </div>

                        <div class="pt-2">
                            <button type="submit"
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </section>

                <!-- Account Section -->
                <section id="account"
                    class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Account Settings</h2>

                    <div class="mb-6">
                        <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-3">Account Type</h3>
                        <div class="p-4 rounded-lg border"
                            :class="isPremium ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800' : 'border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800'">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="flex items-center">
                                        <svg class="h-5 w-5 mr-2"
                                            :class="isPremium ? 'text-green-500 dark:text-green-400' : 'text-amber-500 dark:text-amber-400'"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path v-if="isPremium" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span class="font-medium"
                                            :class="isPremium ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'">
                                            {{ isPremium ? 'PRO Account' : 'Free Account' }}
                                        </span>
                                    </div>
                                    <p class="mt-1 text-sm"
                                        :class="isPremium ? 'text-green-600 dark:text-green-300' : 'text-amber-600 dark:text-amber-300'">
                                        {{ isPremium ? 'You have access to all premium features' : 'Limited access to features and functionality' }}
                                    </p>
                                </div>
                                <div v-if="!isPremium">
                                    <NuxtLink to="/pricing"
                                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Upgrade to PRO
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="!isPremium" class="mb-6">
                        <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-3">Usage Limits</h3>
                        <div class="space-y-4">
                            <div>
                                <div class="flex justify-between mb-1">
                                    <p class="text-sm font-medium text-slate-700 dark:text-slate-300">Links</p>
                                    <p class="text-sm font-medium text-slate-700 dark:text-slate-300">{{
                                        usageStats.links }} /
                                        {{ FREE_LIMITS.maxLinks }}</p>
                                </div>
                                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                                    <div class="bg-indigo-600 h-2.5 rounded-full"
                                        :style="{ width: `${(usageStats.links / FREE_LIMITS.maxLinks) * 100}%` }"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <p class="text-sm font-medium text-slate-700 dark:text-slate-300">API Requests</p>
                                    <p class="text-sm font-medium text-slate-700 dark:text-slate-300">{{
                                        usageStats.apiRequests
                                    }} / {{ FREE_LIMITS.maxApiRequests }}</p>
                                </div>
                                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                                    <div class="bg-indigo-600 h-2.5 rounded-full"
                                        :style="{ width: `${(usageStats.apiRequests / FREE_LIMITS.maxApiRequests) * 100}%` }">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <div class="flex items-center justify-between">
                                <h3 class="text-lg font-medium text-slate-900 dark:text-white">Language Preferences</h3>
                            </div>
                            <div class="mt-2">
                                <select id="language" v-model="language"
                                    class="block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white sm:text-sm">
                                    <option value="en">English</option>
                                    <option value="fr">Français</option>
                                    <option value="de">Deutsch</option>
                                    <option value="es">Español</option>
                                    <option value="ru">Русский</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">Theme Preferences</h3>
                            <div class="flex items-center space-x-4">
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="theme" value="light"
                                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300">
                                    <span class="ml-2 text-sm text-slate-700 dark:text-slate-300">Light</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="theme" value="dark"
                                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300">
                                    <span class="ml-2 text-sm text-slate-700 dark:text-slate-300">Dark</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="theme" value="system"
                                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300">
                                    <span class="ml-2 text-sm text-slate-700 dark:text-slate-300">System Default</span>
                                </label>
                            </div>
                        </div>

                        <div class="pt-2">
                            <button @click="saveAccountSettings"
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Save Preferences
                            </button>
                        </div>
                    </div>
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
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useToastStore } from '~/stores/toast';
import { useAuthService } from '~/composables/useAuth';
import PageHeader from '~/components/common/PageHeader.vue';

// Хук для проверки аутентификации
const { isAuthenticated, isPremium } = useAuthService();
const toastStore = useToastStore();

// Константы для ограничений бесплатного аккаунта
const FREE_LIMITS = {
    maxLinks: 10,
    maxApiRequests: 100,
    historyDays: 7
};

// Данные пользователя
const firstName = ref('');
const lastName = ref('');
const email = ref('john.doe@example.com');
const company = ref('');
const timezone = ref('UTC');
const language = ref('en');
const theme = ref('system');

// Статистика использования
const usageStats = ref({
    links: 5,
    apiRequests: 38
});

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
    // В реальном приложении здесь был бы запрос к API
    try {
        // Имитация получения данных
        await new Promise(resolve => setTimeout(resolve, 500));

        firstName.value = 'John';
        lastName.value = 'Doe';
        email.value = 'john.doe@example.com';
        company.value = 'Acme Inc.';

        // Получение статистики использования
        usageStats.value = {
            links: 5,
            apiRequests: 38
        };

    } catch (error) {
        console.error('Error fetching user data:', error);
        toastStore.error('Failed to load user data');
    }
};

const saveProfileInfo = async () => {
    // В реальном приложении здесь был бы запрос к API
    try {
        // Имитация сохранения данных
        await new Promise(resolve => setTimeout(resolve, 500));
        toastStore.success('Profile information saved successfully');
    } catch (error) {
        console.error('Error saving profile:', error);
        toastStore.error('Failed to save profile information');
    }
};

const saveAccountSettings = async () => {
    // В реальном приложении здесь был бы запрос к API
    try {
        // Имитация сохранения настроек
        await new Promise(resolve => setTimeout(resolve, 500));
        toastStore.success('Account settings saved successfully');
    } catch (error) {
        console.error('Error saving settings:', error);
        toastStore.error('Failed to save account settings');
    }
};

const confirmDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        deleteAccount();
    }
};

const deleteAccount = async () => {
    // В реальном приложении здесь был бы запрос к API
    try {
        // Имитация удаления аккаунта
        await new Promise(resolve => setTimeout(resolve, 500));
        toastStore.success('Account deleted successfully');
        // Редирект на главную страницу
        window.location.href = '/';
    } catch (error) {
        console.error('Error deleting account:', error);
        toastStore.error('Failed to delete account');
    }
};

// Загрузка данных при монтировании компонента
onMounted(() => {
    fetchUserData();
});
</script>

<style scoped>
/* Дополнительные стили, если необходимо */
</style>