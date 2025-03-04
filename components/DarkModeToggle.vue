<template>
	<button
		@click="toggleDarkMode"
		class="dark-toggle"
		aria-label="Toggle dark mode"
	>
		<!-- Sun icon -->
		<svg
			v-if="isDark"
			xmlns="http://www.w3.org/2000/svg"
			class="toggle-icon sun"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
		</svg>

		<!-- Moon icon -->
		<svg
			v-else
			xmlns="http://www.w3.org/2000/svg"
			class="toggle-icon moon"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
		</svg>
	</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDark = ref(false);

onMounted(() => {
	// Initialize based on system preference or stored setting
	checkDarkMode();

	// Watch for system preference changes
	const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	darkModeMediaQuery.addEventListener('change', checkDarkMode);
});

function checkDarkMode() {
	if (localStorage.theme === 'dark' ||
		(!('theme' in localStorage) &&
			window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		document.documentElement.classList.add('dark');
		isDark.value = true;
	} else {
		document.documentElement.classList.remove('dark');
		isDark.value = false;
	}
}

function toggleDarkMode() {
	isDark.value = !isDark.value;

	if (isDark.value) {
		document.documentElement.classList.add('dark');
		localStorage.theme = 'dark';
	} else {
		document.documentElement.classList.remove('dark');
		localStorage.theme = 'light';
	}

	// Smoothly transition the background color
	document.body.style.transition = 'background-color 0.3s ease';
}
</script>

<style scoped>
.dark-toggle {
	padding: 8px;
	border-radius: 9999px;
	background: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	border: 1px solid rgba(255, 255, 255, 0.5);
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	color: #64748b;
	transition: all 0.3s ease;
}

.dark .dark-toggle {
	background: rgba(30, 41, 59, 0.7);
	border: 1px solid rgba(255, 255, 255, 0.1);
	color: #e2e8f0;
}

.dark-toggle:hover {
	transform: rotate(15deg);
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.dark .dark-toggle:hover {
	background: rgba(30, 41, 59, 0.9);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.toggle-icon {
	width: 20px;
	height: 20px;
	transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.sun {
	color: #fbbf24;
}

.moon {
	color: #4f46e5;
}

.dark .moon {
	color: #818cf8;
}
</style>