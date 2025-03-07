<template>
	<button
		@click="toggleDarkMode"
		class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:transform hover:scale-110 theme-toggle-btn"
		:class="{'bg-slate-800 text-yellow-300': !isDark, 'bg-blue-100 text-slate-800': isDark}"
		aria-label="Toggle Dark Mode"
	>
    <span v-if="isDark" class="sun-icon">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
		<span v-else class="moon-icon">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </span>
	</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDark = ref(false);

// Переключение темы с сохранением в localStorage
const toggleDarkMode = () => {
	if (isDark.value) {
		document.documentElement.classList.remove('dark');
		localStorage.setItem('theme', 'light');
	} else {
		document.documentElement.classList.add('dark');
		localStorage.setItem('theme', 'dark');
	}
	isDark.value = !isDark.value;
};

onMounted(() => {
	// Проверяем текущую тему при монтировании компонента
	isDark.value = document.documentElement.classList.contains('dark');
});
</script>

<style scoped>
.theme-toggle-btn {
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
	border: 2px solid transparent;
}

.theme-toggle-btn:hover {
	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.dark .theme-toggle-btn {
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.dark .theme-toggle-btn:hover {
	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

.sun-icon, .moon-icon {
	display: flex;
	align-items: center;
	justify-content: center;
}

@keyframes spin-in {
	0% { transform: rotate(-180deg) scale(0.5); opacity: 0; }
	100% { transform: rotate(0deg) scale(1); opacity: 1; }
}

.sun-icon, .moon-icon {
	animation: spin-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>