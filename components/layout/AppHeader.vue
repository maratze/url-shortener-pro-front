<template>
	<header class="sticky top-0 z-10 glass shadow-sm">
		<div class="container mx-auto px-4 py-3 flex items-center justify-between">
			<NuxtLink to="/" class="flex items-center gap-2">
				<img src="/logo.svg" alt="URL Shortener Pro" class="h-8 w-auto" />
				<span class="font-bold text-xl text-primary-700 dark:text-primary-400">URL Shortener Pro</span>
			</NuxtLink>

			<div class="flex items-center gap-4">
				<button @click="toggleTheme" class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
					<span v-if="colorMode.value === 'dark'" class="sr-only">Switch to light mode</span>
					<span v-else class="sr-only">Switch to dark mode</span>
					<svg v-if="colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
					</svg>
					<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
					</svg>
				</button>

				<!-- Login/Register buttons (inactive for now) -->
				<button class="btn-secondary">
					Log In
				</button>
				<button class="btn-primary">
					Sign Up
				</button>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const toggleTheme = () => {
	colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	localStorage.setItem('theme-preference', colorMode.preference);
};

// Initialize theme from localStorage
onMounted(() => {
	const savedTheme = localStorage.getItem('theme-preference');
	if (savedTheme) {
		colorMode.preference = savedTheme;
	}
});
</script>