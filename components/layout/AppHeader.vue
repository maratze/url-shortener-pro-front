<template>
	<header class="fixed top-0 left-0 right-0 z-40 py-4">
		<div class="container mx-auto px-4 flex justify-between items-center">
			<NuxtLink to="/" class="flex items-center space-x-2">
				<div
					class="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
					TL
				</div>
				<span class="text-xl font-bold text-slate-900 dark:text-white hidden sm:inline-block">TinyLink</span>
			</NuxtLink>

			<div class="flex items-center space-x-4">
				<nav class="hidden md:flex items-center space-x-6">
					<NuxtLink to="/history" class="nav-link">History</NuxtLink>
					<NuxtLink to="/analytics" class="nav-link">Analytics</NuxtLink>
					<NuxtLink to="/pricing" class="nav-link">Pricing</NuxtLink>
					<NuxtLink to="/about" class="nav-link">About</NuxtLink>
				</nav>

				<div class="flex items-center space-x-3">
					<DarkModeToggle/>
					<NuxtLink to="/login" class="login-btn">
						<span class="hidden sm:inline">Login</span>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:hidden" viewBox="0 0 20 20"
							 fill="currentColor">
							<path fill-rule="evenodd"
								  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
								  clip-rule="evenodd"/>
						</svg>
					</NuxtLink>
					<button class="menu-btn md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
							 fill="currentColor">
							<path fill-rule="evenodd"
								  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								  clip-rule="evenodd"/>
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile menu -->
		<Transition name="slide-down">
			<div v-if="mobileMenuOpen" class="md:hidden mobile-menu">
				<nav class="px-4 py-6 space-y-4">
					<NuxtLink to="/history" class="mobile-nav-link" @click="mobileMenuOpen = false">History
					</NuxtLink>
					<NuxtLink to="/analytics" class="mobile-nav-link" @click="mobileMenuOpen = false">Analytics
					</NuxtLink>
					<NuxtLink to="/pricing" class="mobile-nav-link" @click="mobileMenuOpen = false">Pricing
					</NuxtLink>
					<NuxtLink to="/about" class="mobile-nav-link" @click="mobileMenuOpen = false">About</NuxtLink>
					<NuxtLink to="/login" class="mobile-nav-link" @click="mobileMenuOpen = false">Login</NuxtLink>
				</nav>
			</div>
		</Transition>
	</header>
</template>

<script setup>
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
</script>

<style scoped>
.nav-link {
	@apply text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors;
}

.nav-link.router-link-active {
	@apply text-blue-600 dark:text-blue-400 font-semibold;
}

.login-btn {
	@apply px-4 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center font-medium;
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
}

.menu-btn {
	@apply p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300;
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