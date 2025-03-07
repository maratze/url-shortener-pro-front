<template>
	<header
		class="fixed top-0 left-0 right-0 z-40 py-4 transition-all duration-300"
		:class="{ 
      'backdrop-blur-md bg-white/80 dark:bg-slate-900/80 shadow-md': isScrolled,
      'bg-transparent': !isScrolled
    }"
	>
		<div class="container mx-auto px-6 max-w-7xl">
			<div class="flex items-center justify-between">
				<!-- Левая часть: Логотип -->
				<div class="flex items-center space-x-4">
					<NuxtLink to="/" class="flex items-center space-x-2">
						<div
							class="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
							TL
						</div>
						<span class="text-xl font-bold text-slate-900 dark:text-white hidden sm:inline-block">TinyLink</span>
					</NuxtLink>
				</div>

				<!-- Центральная часть: Навигация -->
				<nav class="hidden md:flex items-center justify-center space-x-6">
					<NuxtLink to="/history" class="nav-link" active-class="router-link-active">History</NuxtLink>
					<NuxtLink to="/analytics" class="nav-link" active-class="router-link-active">Analytics</NuxtLink>
					<NuxtLink to="/pricing" class="nav-link" active-class="router-link-active">Pricing</NuxtLink>
					<NuxtLink to="/about" class="nav-link" active-class="router-link-active">About</NuxtLink>
				</nav>

				<!-- Правая часть: Кнопки авторизации -->
				<div class="flex items-center space-x-3">
					<NuxtLink to="/register" class="register-btn hidden sm:flex">Register</NuxtLink>
					<NuxtLink to="/login" class="login-btn">Login</NuxtLink>
				</div>
			</div>
		</div>

		<!-- Mobile menu -->
		<Transition name="slide-down">
			<div v-if="mobileMenuOpen" class="md:hidden mobile-menu">
				<nav class="px-4 py-6 space-y-4">
					<div class="border-t dark:border-slate-700"></div>
					<!-- Мобильное меню -->
					<NuxtLink to="/history" class="mobile-nav-link" active-class="text-purple-600 dark:text-purple-400 font-semibold" @click="mobileMenuOpen = false">History</NuxtLink>
					<NuxtLink to="/analytics" class="mobile-nav-link" active-class="text-purple-600 dark:text-purple-400 font-semibold" @click="mobileMenuOpen = false">Analytics</NuxtLink>
					<NuxtLink to="/pricing" class="mobile-nav-link" active-class="text-purple-600 dark:text-purple-400 font-semibold" @click="mobileMenuOpen = false">Pricing</NuxtLink>
					<NuxtLink to="/about" class="mobile-nav-link" active-class="text-purple-600 dark:text-purple-400 font-semibold" @click="mobileMenuOpen = false">About</NuxtLink>
					<NuxtLink to="/register" class="mobile-nav-link text-purple-600 dark:text-purple-400 font-semibold" @click="mobileMenuOpen = false">Register</NuxtLink>
					<NuxtLink to="/login" class="mobile-nav-link" @click="mobileMenuOpen = false">Login</NuxtLink>
				</nav>
			</div>
		</Transition>
	</header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const mobileMenuOpen = ref(false);
const isScrolled = ref(false);

const checkScroll = () => {
	isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
	window.addEventListener('scroll', checkScroll);
	checkScroll();
});

onUnmounted(() => {
	window.removeEventListener('scroll', checkScroll);
});
</script>

<style scoped>
.nav-link {
	@apply text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors;
}

.router-link-active {
	@apply text-purple-600 dark:text-purple-400 font-semibold;
}

.login-btn {
	@apply px-4 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-lg border border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center font-medium;
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
}

.register-btn {
	@apply px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white dark:text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center font-medium;
}

.mobile-menu {
	@apply fixed top-16 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-lg;
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
}

.mobile-nav-link {
	@apply block py-3 px-4 text-slate-800 dark:text-white font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors;
}

/* Transitions */
.slide-down-enter-active,
.slide-down-leave-active {
	transition: all 0.3s ease-out;
	max-height: 300px;
}

.slide-down-enter-from,
.slide-down-leave-to {
	max-height: 0;
	opacity: 0;
}
</style>