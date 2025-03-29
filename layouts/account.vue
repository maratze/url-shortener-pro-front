<template>
    <div
        v-if="isMounted && ready"
        class="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 transition-all duration-300">
        <FloatingThemeToggle
            :isDark="isDark"
            :toggleDarkMode="toggleDarkMode"
            :ready="ready" />

        <div class="flex flex-col min-h-screen">
            <AppHeaderDashboard />

            <main class="flex-grow bg-slate-50 dark:bg-slate-900 min-h-screen pt-[74px] pb-6">
                <div class="container mx-auto px-6 max-w-7xl">
                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <!-- Sidebar with navigation -->
                        <div class="lg:col-span-1">
                            <div class="sticky top-[74px]">
                                <div
                                    class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                                    <h2 class="text-lg font-medium text-slate-900 dark:text-white mb-4">Settings</h2>
                                    <nav class="space-y-1">
                                        <NuxtLink to="/account" class="flex items-center px-3 py-2 text-sm rounded-lg"
                                            :class="$route.path === '/account' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'">
                                            <svg class="h-4 w-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profile
                                        </NuxtLink>
                                        <NuxtLink to="/account/security"
                                            class="flex items-center px-3 py-2 text-sm rounded-lg"
                                            :class="$route.path === '/account/security' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'">
                                            <svg class="h-4 w-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Security
                                        </NuxtLink>
                                        <NuxtLink to="/account/notifications"
                                            class="flex items-center px-3 py-2 text-sm rounded-lg"
                                            :class="$route.path === '/account/notifications' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'">
                                            <svg class="h-4 w-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                            Notifications
                                        </NuxtLink>
                                        <NuxtLink to="/account/billing"
                                            class="flex items-center px-3 py-2 text-sm rounded-lg"
                                            :class="$route.path === '/account/billing' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'">
                                            <svg class="h-4 w-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            Billing
                                        </NuxtLink>
                                    </nav>
                                </div>
                            </div>
                        </div>

                        <!-- Main content -->
                        <div class="lg:col-span-3">
                            <slot />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
    <div v-else class="opacity-0 transition-all duration-200">
        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeaderDashboard from '~/components/layout/AppHeaderDashboard.vue';
import FloatingThemeToggle from '~/components/FloatingThemeToggle.vue';
import { useTheme } from '~/composables/useTheme';

const { isDark, toggleDarkMode, ready } = useTheme();
const isMounted = ref(false)

onMounted(() => {
    isMounted.value = true
})
</script>