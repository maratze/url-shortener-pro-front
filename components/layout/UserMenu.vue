<template>
	<div class="relative">
		<!-- Avatar and button for dropdown menu -->
		<button
			@click="toggleMenu"
			class="flex items-center space-x-2 relative focus:outline-none"
			ref="menuButton">
			<span
				class="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold overflow-hidden">
				{{ userInitials }}
			</span>
			<span class="flex items-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500 dark:text-slate-400"
					viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd" />
				</svg>
			</span>
		</button>

		<!-- Dropdown menu -->
		<Transition name="fade">
			<div v-if="isMenuOpen"
				class="absolute right-0 mt-2 min-w-[240px] rounded-lg shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-50 py-2">
				<!-- User information -->
				<div class="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
					<div class="font-medium text-slate-800 dark:text-white truncate">{{ getFullName(user) }}</div>
					<div v-if="user?.isPremium" class="text-xs text-purple-600 dark:text-purple-400 font-medium">PRO
						account
					</div>
					<div v-else class="text-xs text-slate-500 dark:text-slate-400">Free account</div>
				</div>

				<!-- Menu links -->
				<div class="py-1">
					<NuxtLink to="/account"
						class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
						<span>Account Settings</span>
					</NuxtLink>
					<button @click="logout"
						class="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700">
						Log out
					</button>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const user = computed(() => authStore.user);
const isMenuOpen = ref(false);
const menuButton = ref(null);

// Calculate initials for avatar
const userInitials = computed(() => {
	if (!user.value) return '?';

	let result = '';

	if (user.value?.firstName) {
		result += user.value.firstName.charAt(0);
	}

	if (user.value?.lastName) {
		result += user.value.lastName.charAt(0);
	}

	if (result === '' && user.value?.email) {
		result += user.value.email.charAt(0)
	}

	return result ? result.toUpperCase() : '?';
});

const getFullName = (user) => {
	if (!user) return 'Гость';

	let result = '';

	if (user.firstName) {
		result += user.firstName;
	}

	if (user.lastName) {
		result += ' ' + user.lastName;
	}

	if (result.trim() === '' && user.email) {
		result = user.email;
	} else if (result.trim() === '') {
		result = 'Гость';
	}

	return result;
};

// Toggle menu visibility
const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
};

// Close menu when clicking outside
const handleClickOutside = (event) => {
	if (menuButton.value && !menuButton.value.contains(event.target) && isMenuOpen.value) {
		isMenuOpen.value = false;
	}
};

// Logout
const logout = async () => {
	isMenuOpen.value = false;

	try {
		await authStore.logout();
		setTimeout(() => {
			navigateTo('/login');
		}, 100);
	} catch (error) {
		console.error('Ошибка при выходе из системы:', error);
		navigateTo('/login');
	}
};

onMounted(() => {
	document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
</style>