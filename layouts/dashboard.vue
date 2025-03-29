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
                    <NuxtPage />
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
import FloatingThemeToggle from '~/components/FloatingThemeToggle.vue';
import AppHeaderDashboard from '~/components/layout/AppHeaderDashboard.vue';
import { useTheme } from '~/composables/useTheme';

const { isDark, toggleDarkMode, ready } = useTheme();
const isMounted = ref(false)

onMounted(() => {
    isMounted.value = true
})
</script>