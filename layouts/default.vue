<template>
	<div
		v-if="isMounted && ready"
		class="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 transition-all duration-300"
	>
		<FloatingThemeToggle
			:isDark="isDark"
			:toggleDarkMode="toggleDarkMode"
			:ready="ready"
		/>

		<div class="flex flex-col min-h-screen">
			<AppHeader/>
			<main class="flex-grow">
				<div
					class="from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-300">
					<main class="pt-[74px]">
						<NuxtPage/>
					</main>
				</div>
			</main>
			<AppFooter/>
			<ToastContainer/>
		</div>
	</div>
	<div v-else class="opacity-0 transition-all duration-200">
		<NuxtPage/>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeader from '~/components/layout/AppHeader.vue';
import AppFooter from '~/components/layout/AppFooter.vue';
import ToastContainer from '~/components/common/ToastContainer.vue';
import FloatingThemeToggle from '~/components/FloatingThemeToggle.vue';
import { useTheme } from '~/composables/useTheme';

const { isDark, toggleDarkMode, ready } = useTheme();
const isMounted = ref(false)

onMounted(() => {
	isMounted.value = true
})
</script>