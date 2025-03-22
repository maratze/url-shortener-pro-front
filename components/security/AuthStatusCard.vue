<template>
    <section class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Authentication Status</h2>
        </div>

        <div v-if="isLoading" class="flex items-center justify-center py-4">
            <svg class="animate-spin h-5 w-5 text-indigo-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
            <span class="text-slate-600 dark:text-slate-400">Loading authentication status...</span>
        </div>

        <div v-else class="grid gap-6 md:grid-cols-2">
            <!-- Auth Status -->
            <div class="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4">
                <div class="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 class="text-base font-medium text-slate-900 dark:text-white">Login Status</h3>
                </div>
                <p class="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    You are currently logged in as <span class="font-medium">{{ user?.email || 'Unknown User' }}</span>
                </p>
                <div class="flex items-center">
                    <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 mr-2">
                        <svg class="h-2 w-2 mr-1 fill-current" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                        </svg>
                        Active
                    </span>
                    <span class="text-xs text-slate-500 dark:text-slate-400">
                        {{ loginTimeAgo }}
                    </span>
                </div>
            </div>

            <!-- Auth Method -->
            <div class="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4">
                <div class="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <h3 class="text-base font-medium text-slate-900 dark:text-white">Authentication Method</h3>
                </div>
                <div class="flex items-center">
                    <div v-if="user?.authProvider === 'Google'" class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span class="text-sm text-slate-600 dark:text-slate-300">Google Account</span>
                    </div>
                    <div v-else class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-slate-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span class="text-sm text-slate-600 dark:text-slate-300">Email and Password</span>
                    </div>
                </div>
                <div class="mt-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 mr-2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                        <span class="text-xs text-slate-500 dark:text-slate-400">
                            2FA:
                            <span v-if="user?.isTwoFactorEnabled"
                                class="font-medium text-green-600 dark:text-green-400">Enabled</span>
                            <span v-else class="font-medium text-slate-500 dark:text-slate-400">Disabled</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthService } from '~/composables/useAuthService';

// Get auth service for user info
const { user } = useAuthService();
const isLoading = ref(true);

// Calculate time ago for login
const loginTimeAgo = computed(() => {
    // This would normally come from the session data
    // For now we'll use a placeholder or try to get it from localStorage
    try {
        const loginTime = localStorage.getItem('loginTime');
        if (loginTime) {
            const date = new Date(loginTime);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMinutes = Math.floor(diffMs / 60000);

            if (diffMinutes < 1) return 'Just now';
            if (diffMinutes < 60) return `${diffMinutes} min ago`;

            const hours = Math.floor(diffMinutes / 60);
            if (hours < 24) return `${hours} hr ago`;

            const days = Math.floor(diffMinutes / 1440);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    } catch (e) {
        console.log('Error getting login time:', e);
    }

    return 'Unknown';
});

onMounted(() => {
    // Simulate loading
    setTimeout(() => {
        isLoading.value = false;
    }, 300);
});
</script>