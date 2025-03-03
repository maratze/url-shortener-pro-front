<template>
	<header class="bg-white dark:bg-secondary-900 shadow-sm sticky top-0 z-10">
		<div class="container mx-auto px-4 py-4 flex items-center justify-between">
			<!-- Логотип -->
			<NuxtLink to="/" class="flex items-center space-x-2">
				<svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414L10.586 5A6 6 0 0 1 19 13.414l-1.343 1.414zM6.343 12A4 4 0 0 0 12 17.657l1.414-1.414 1.414 1.414-1.414 1.343A6 6 0 0 1 5 13.414L6.343 12zm2.829-8.486l1.414 1.414L8.172 7.343l-1.414-1.414 2.414-2.415zm6.486 12.728l1.414 1.414-2.414 2.414-1.414-1.414 2.414-2.414z"/>
				</svg>
				<span class="font-bold text-xl text-secondary-900 dark:text-white">URL Shortener Pro</span>
			</NuxtLink>

			<!-- Навигационное меню - видно только на десктопах -->
			<nav class="hidden md:flex items-center space-x-8">
				<NuxtLink to="/"
						  class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
					Главная
				</NuxtLink>
				<NuxtLink to="/features"
						  class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
					Возможности
				</NuxtLink>
				<NuxtLink to="/pricing"
						  class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
					Тарифы
				</NuxtLink>
			</nav>

			<!-- Кнопки авторизации/профиль - видны только на десктопах -->
			<div class="hidden md:flex items-center space-x-4">
				<button @click="toggleDarkMode"
						class="p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800">
					<span v-if="isDarkMode" class="material-icons text-yellow-400">light_mode</span>
					<span v-else class="material-icons text-secondary-600">dark_mode</span>
				</button>

				<template v-if="!isAuthenticated">
					<NuxtLink to="/login" class="btn btn-outline">
						Войти
					</NuxtLink>
					<NuxtLink to="/register" class="btn btn-primary">
						Регистрация
					</NuxtLink>
				</template>
				<template v-else>
					<div class="relative" ref="profileMenuContainer">
						<button
							@click="isProfileMenuOpen = !isProfileMenuOpen"
							class="flex items-center space-x-2 p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800"
						>
							<div
								class="bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 rounded-full w-8 h-8 flex items-center justify-center">
								<span class="font-medium">{{ userInitials }}</span>
							</div>
						</button>

						<div
							v-if="isProfileMenuOpen"
							class="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-lg shadow-lg py-2 z-20"
						>
							<div class="px-4 py-2 border-b border-secondary-200 dark:border-secondary-700">
								<p class="text-sm font-medium">{{ user?.email }}</p>
								<p v-if="user?.isPremium"
								   class="text-xs text-primary-600 dark:text-primary-400 flex items-center mt-1">
									<span class="material-icons text-sm mr-1">star</span>
									Премиум
								</p>
							</div>
							<NuxtLink to="/dashboard"
									  class="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-700">
								Панель управления
							</NuxtLink>
							<NuxtLink to="/dashboard/urls"
									  class="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-700">
								Мои ссылки
							</NuxtLink>
							<button
								@click="logout"
								class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-secondary-100 dark:text-red-400 dark:hover:bg-secondary-700"
							>
								Выйти
							</button>
						</div>
					</div>
				</template>
			</div>

			<!-- Мобильная кнопка меню -->
			<button
				@click="isMobileMenuOpen = !isMobileMenuOpen"
				class="md:hidden p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800"
			>
				<span v-if="!isMobileMenuOpen" class="material-icons">menu</span>
				<span v-else class="material-icons">close</span>
			</button>
		</div>

		<!-- Мобильное меню (продолжение) -->
		<div v-if="isMobileMenuOpen"
			 class="md:hidden bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800">
			<div class="container mx-auto px-4 py-4 space-y-3">
				<!-- (предыдущие ссылки) -->

				<button
					@click="logout"
					class="flex items-center w-full text-left py-2 text-red-600 dark:text-red-400"
				>
					<span class="material-icons mr-2 text-sm">logout</span>
					Выйти
				</button>

				<div
					class="flex items-center justify-between pt-2 border-t border-secondary-200 dark:border-secondary-800">
					<span class="text-sm text-secondary-600 dark:text-secondary-400">Тёмная тема</span>
					<button @click="toggleDarkMode"
							class="p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800">
						<span v-if="isDarkMode" class="material-icons text-yellow-400">light_mode</span>
						<span v-else class="material-icons text-secondary-600">dark_mode</span>
					</button>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

const userInitials = computed(() => {
	if (!user.value?.email) return '?';
	return user.value.email.charAt(0).toUpperCase();
});

const isMobileMenuOpen = ref(false);
const isProfileMenuOpen = ref(false);
const isDarkMode = ref(false);
const profileMenuContainer = ref(null);

const logout = () => {
	authStore.logout();
	isProfileMenuOpen.value = false;
	isMobileMenuOpen.value = false;
	navigateTo('/');
};

const toggleDarkMode = () => {
	isDarkMode.value = !isDarkMode.value;
	document.documentElement.classList.toggle('dark', isDarkMode.value);
	localStorage.setItem('dark-mode', isDarkMode.value ? 'true' : 'false');
};

// Закрытие выпадающего меню профиля при клике вне его
const handleClickOutside = (event: MouseEvent) => {
	if (profileMenuContainer.value && !profileMenuContainer.value.contains(event.target)) {
		isProfileMenuOpen.value = false;
	}
};

onMounted(() => {
	// Инициализация тёмного режима
	const darkMode = localStorage.getItem('dark-mode');
	if (darkMode === 'true' || (!darkMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		isDarkMode.value = true;
		document.documentElement.classList.add('dark');
	}

	document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside);
});
</script>