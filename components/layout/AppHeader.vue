<template>
	<header
		class="fixed top-0 left-0 right-0 py-4 transition-all duration-300 z-[2000]"
		:class="{
			'backdrop-blur-md bg-white/80 dark:bg-slate-900/80 shadow-md': isScrolled,
			'bg-transparent': !isScrolled
		}">
		<div class="container mx-auto px-6 max-w-7xl">
			<div class="flex items-center justify-between">
				<!-- Left part: Logo -->
				<div class="flex items-center space-x-4 min-h-[42px]">
					<NuxtLink :to="layoutType === 'dashboard' ? '/dashboard' : '/'" class="flex items-center space-x-2">
						<div
							class="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
							TL
						</div>
						<span
							class="text-xl font-bold text-slate-900 dark:text-white hidden sm:inline-block">TinyLink</span>
					</NuxtLink>
				</div>

				<!-- Central part: Navigation -->
				<nav v-if="layoutType !== 'auth'" class="hidden md:flex items-center justify-center space-x-6">
					<NuxtLink v-if="authStore.isAuthenticated" to="/dashboard" class="nav-link"
						active-class="router-link-active">Dashboard</NuxtLink>
					<NuxtLink v-if="authStore.isAuthenticated" to="/analytics" class="nav-link"
						active-class="router-link-active">Analytics</NuxtLink>
					<NuxtLink v-if="authStore.isAuthenticated" to="/qr-codes" class="nav-link"
						active-class="router-link-active">QR Codes</NuxtLink>
					<NuxtLink v-if="!authStore.isAuthenticated && layoutType !== 'dashboard'" to="/pricing"
						class="nav-link" active-class="router-link-active">Pricing</NuxtLink>
					<NuxtLink v-if="!authStore.isAuthenticated && layoutType !== 'dashboard'" to="/about"
						class="nav-link" active-class="router-link-active">About</NuxtLink>
				</nav>

				<!-- Right part: Authorization buttons or User menu -->
				<div class="flex items-center space-x-3">
					<!-- Show registration and login buttons for non-authenticated users -->
					<template v-if="!authStore.isAuthenticated">
						<template v-if="layoutType !== 'auth'">
							<NuxtLink to="/register" class="register-btn hidden sm:flex">Register</NuxtLink>
							<NuxtLink to="/login" class="login-btn">Login</NuxtLink>
						</template>
					</template>

					<!-- Show user menu for authenticated users -->
					<UserMenu v-else />
				</div>
			</div>
		</div>

		<!-- Mobile menu -->
		<Transition name="slide-down">
			<div v-if="mobileMenuOpen && layoutType !== 'auth'" class="md:hidden mobile-menu">
				<nav class="px-4 py-6 space-y-4">
					<div class="border-t dark:border-slate-700"></div>
					<!-- Mobile menu -->
					<NuxtLink v-if="authStore.isAuthenticated" to="/dashboard" class="mobile-nav-link"
						active-class="text-purple-600 dark:text-purple-400 font-semibold"
						@click="mobileMenuOpen = false">
						Dashboard</NuxtLink>
					<NuxtLink v-if="authStore.isAuthenticated" to="/analytics" class="mobile-nav-link"
						active-class="text-purple-600 dark:text-purple-400 font-semibold"
						@click="mobileMenuOpen = false">
						Analytics</NuxtLink>
					<NuxtLink v-if="authStore.isAuthenticated" to="/qr-codes" class="mobile-nav-link"
						active-class="text-purple-600 dark:text-purple-400 font-semibold"
						@click="mobileMenuOpen = false">
						QR Codes</NuxtLink>
					<NuxtLink v-if="!authStore.isAuthenticated && layoutType !== 'dashboard'" to="/pricing"
						class="mobile-nav-link" active-class="text-purple-600 dark:text-purple-400 font-semibold"
						@click="mobileMenuOpen = false">
						Pricing
					</NuxtLink>
					<NuxtLink v-if="!authStore.isAuthenticated && layoutType !== 'dashboard'" to="/about"
						class="mobile-nav-link" active-class="text-purple-600 dark:text-purple-400 font-semibold"
						@click="mobileMenuOpen = false">About
					</NuxtLink>

					<!-- Show registration/login buttons or user profile -->
					<template v-if="!authStore.isAuthenticated">
						<NuxtLink
							to="/register"
							class="mobile-nav-link text-purple-600 dark:text-purple-400 font-semibold"
							@click="mobileMenuOpen = false">Register</NuxtLink>
						<NuxtLink to="/login" class="mobile-nav-link" @click="mobileMenuOpen = false">Login</NuxtLink>
					</template>
					<template v-else>
						<div class="mobile-nav-link">
							<div class="flex items-center space-x-2">
								<div
									class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
									{{ userInitials }}
								</div>
								<div class="font-medium text-slate-800 dark:text-white truncate">{{
									authStore.user?.email }}</div>
							</div>
						</div>
						<button @click="logout"
							class="mobile-nav-link w-full text-left text-red-600 dark:text-red-400">Log out</button>
					</template>
				</nav>
			</div>
		</Transition>
	</header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import UserMenu from './UserMenu.vue';
import { useRoute } from 'vue-router';

const props = defineProps({
	layoutType: {
		type: String,
		default: 'default', // Possible values: 'default', 'auth', 'dashboard'
		validator: (value) => ['default', 'auth', 'dashboard'].includes(value)
	}
});

const authStore = useAuthStore();
const route = useRoute();
const mobileMenuOpen = ref(false);
const isScrolled = ref(false);

// Calculate initials for avatar (for mobile menu)
const userInitials = computed(() => {
	if (!authStore.user?.email) return '?';
	return authStore.user.email.charAt(0).toUpperCase();
});

// Logout function for mobile menu
const logout = () => {
	// Redirect to home page
	authStore.logout();
	mobileMenuOpen.value = false;
	navigateTo('/');
};

const checkScroll = () => {
	isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
	window.addEventListener('scroll', checkScroll);
	checkScroll();

	// Get current user data when loading
	authStore.fetchCurrentUser();
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