<template>
    <div class="w-full">
        <div class="space-y-4">
            <!-- Password Change Section -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Change Password</h2>
                <form @submit.prevent="changePassword" class="space-y-4">
                    <div>
                        <label for="currentPassword"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Current Password
                        </label>
                        <input type="password" id="currentPassword" v-model="currentPassword"
                            class="block w-full h-11 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base"
                            required>
                    </div>
                    <div>
                        <label for="newPassword"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            New Password
                        </label>
                        <input type="password" id="newPassword" v-model="newPassword"
                            class="block w-full h-11 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base"
                            required>
                    </div>
                    <div>
                        <label for="confirmPassword"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Confirm New Password
                        </label>
                        <input type="password" id="confirmPassword" v-model="confirmPassword"
                            class="block w-full h-11 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base"
                            required>
                    </div>
                    <div class="pt-2">
                        <button type="submit"
                            class="inline-flex justify-center items-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[120px] h-10"
                            :disabled="isChangingPassword">
                            <svg v-if="isChangingPassword" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span>{{ isChangingPassword ? 'Updating...' : 'Update Password' }}</span>
                        </button>
                    </div>
                </form>
            </section>

            <!-- Two-Factor Authentication -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Two-Factor Authentication</h2>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Add an extra layer of security to your account
                        </p>
                    </div>
                    <button @click="toggle2FA"
                        class="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white h-10 min-w-[100px]"
                        :class="is2FAEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'"
                        :disabled="isToggling2FA">
                        <svg v-if="isToggling2FA" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <span>{{ isToggling2FA
                            ? (is2FAEnabled ? 'Disabling...' : 'Enabling...')
                            : (is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA') }}</span>
                    </button>
                </div>
                <div v-if="is2FAEnabled" class="mt-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                    <p class="text-sm text-slate-600 dark:text-slate-300">
                        Two-factor authentication is currently enabled. You'll need to enter a verification code from
                        your
                        authenticator app when signing in.
                    </p>
                </div>
            </section>

            <!-- Active Sessions -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Active Sessions</h2>
                <div class="space-y-4">
                    <div v-for="session in activeSessions" :key="session.id"
                        class="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-0">
                        <div class="flex items-center space-x-3">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-slate-900 dark:text-white">{{ session.device }}</p>
                                <p class="text-xs text-slate-500 dark:text-slate-400">{{ session.location }} · Last
                                    active {{ session.lastActive }}</p>
                            </div>
                        </div>
                        <span v-if="session.current"
                            class="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                            Current
                        </span>
                        <button v-else @click="terminateSession(session.id)"
                            class="px-2.5 py-1 text-xs font-medium text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 h-6 min-w-[80px] inline-flex items-center justify-center"
                            :disabled="isTerminating && terminatingSessionId === session.id">
                            <svg v-if="isTerminating && terminatingSessionId === session.id"
                                class="animate-spin -ml-1 mr-1 h-3 w-3 text-red-700 dark:text-red-400"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span>{{ isTerminating && terminatingSessionId === session.id ? 'Terminating...' :
                                'Terminate' }}</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToastStore } from '~/stores/toast';

definePageMeta({
    layout: 'account',
    middleware: ['auth'],
});

const toastStore = useToastStore();

// Password change form
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const isChangingPassword = ref(false);

// 2FA state
const is2FAEnabled = ref(false);
const isToggling2FA = ref(false);

// Session management
const isTerminating = ref(false);
const terminatingSessionId = ref<number | null>(null);

// Active sessions mock data
const activeSessions = ref([
    {
        id: 1,
        device: 'MacBook Pro - Chrome',
        location: 'New York, US',
        lastActive: 'Now',
        current: true
    },
    {
        id: 2,
        device: 'iPhone 12 - Safari',
        location: 'New York, US',
        lastActive: '2 hours ago',
        current: false
    }
]);

// Functions
const changePassword = async () => {
    if (newPassword.value !== confirmPassword.value) {
        toastStore.error('New passwords do not match');
        return;
    }

    try {
        isChangingPassword.value = true;
        // Здесь будет API запрос для смены пароля
        await new Promise(resolve => setTimeout(resolve, 500));
        toastStore.success('Password updated successfully');

        // Очистка формы
        currentPassword.value = '';
        newPassword.value = '';
        confirmPassword.value = '';
    } catch (error) {
        toastStore.error('Failed to update password');
    } finally {
        isChangingPassword.value = false;
    }
};

const toggle2FA = async () => {
    try {
        isToggling2FA.value = true;
        // Здесь будет API запрос для включения/выключения 2FA
        await new Promise(resolve => setTimeout(resolve, 500));
        is2FAEnabled.value = !is2FAEnabled.value;
        toastStore.success(`Two-factor authentication ${is2FAEnabled.value ? 'enabled' : 'disabled'}`);
    } catch (error) {
        toastStore.error('Failed to update 2FA settings');
    } finally {
        isToggling2FA.value = false;
    }
};

const terminateSession = async (sessionId: number) => {
    try {
        isTerminating.value = true;
        terminatingSessionId.value = sessionId;
        // Здесь будет API запрос для завершения сессии
        await new Promise(resolve => setTimeout(resolve, 500));
        activeSessions.value = activeSessions.value.filter(session => session.id !== sessionId);
        toastStore.success('Session terminated successfully');
    } catch (error) {
        toastStore.error('Failed to terminate session');
    } finally {
        isTerminating.value = false;
        terminatingSessionId.value = null;
    }
};
</script>