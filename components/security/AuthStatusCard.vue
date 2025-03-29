<template>
    <section class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div class="mb-4">
            <h2 class="text-lg font-medium text-slate-900 dark:text-white">Authentication Status</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">View your current authentication status and session
                information</p>
        </div>

        <div v-if="isLoading" class="flex justify-center py-6">
            <div class="spinner"></div>
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
                    <h3 class="text-base font-medium text-slate-900 dark:text-white">Login Method</h3>
                </div>
                <div class="mb-2">
                    <div v-if="user?.authProvider === 'Google'" class="flex items-center">
                        <svg class="w-5 h-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor"
                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
                            </path>
                        </svg>
                        <span class="text-sm text-slate-600 dark:text-slate-300">Google</span>
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
                        <NuxtLink to="/account/security" class="text-xs text-slate-500 dark:text-slate-400">
                            <span class="text-xs text-slate-500 dark:text-slate-400">
                                2FA:
                                <span v-if="user?.isTwoFactorEnabled"
                                    class="font-medium text-green-600 dark:text-green-400">Enabled</span>
                                <span v-else class="font-medium text-slate-500 dark:text-slate-400">Disabled</span>
                            </span>
                        </NuxtLink>
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
    if (!process.client) return 'Unknown';

    const loginTimeString = localStorage.getItem('loginTime');
    if (!loginTimeString) return 'Unknown';

    try {
        const loginTime = new Date(loginTimeString);
        const now = new Date();
        const diffMs = now.getTime() - loginTime.getTime();

        // Handle invalid date
        if (isNaN(diffMs)) return 'Unknown';

        // Convert to minutes, hours, days
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes} min ago`;

        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours} hr ago`;

        const diffDays = Math.floor(diffHours / 24);
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;

        // For longer periods, just show the date
        return loginTime.toLocaleDateString();
    } catch (e) {
        console.error('Error calculating login time:', e);
        return 'Unknown';
    }
});

onMounted(() => {
    // We're setting isLoading to false without any real data fetching
    // In a real app, this might fetch session data
    setTimeout(() => {
        isLoading.value = false;
    }, 500);
});
</script>

<style scoped>
.spinner {
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 3px solid #6366f1;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>