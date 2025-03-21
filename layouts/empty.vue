<template>
    <div
        v-if="isMounted && ready"
        class="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
        <slot />
        <FloatingThemeToggle
            :isDark="isDark"
            :toggleDarkMode="toggleDarkMode"
            :ready="ready" />
    </div>
    <div v-else class="min-h-screen bg-white dark:bg-slate-900 opacity-0 transition-opacity duration-200">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTheme } from '~/composables/useTheme';

const { isDark, toggleDarkMode, ready } = useTheme();
const isMounted = ref(false);

onMounted(() => {
    isMounted.value = true;
});
</script>