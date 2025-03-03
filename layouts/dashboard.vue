<template>
	<div class="flex flex-col min-h-screen bg-secondary-100 dark:bg-secondary-950">
		<TheHeader/>
		<div class="flex-grow flex flex-col md:flex-row">
			<!-- Боковое меню для десктопов -->
			<div class="hidden md:block w-64 bg-white dark:bg-secondary-900 shadow-sm">
				<div class="p-4 h-full flex flex-col">
					<h2 class="text-xl font-semibold text-secondary-900 dark:text-white mb-6">Панель управления</h2>

					<nav class="space-y-1">
						<NuxtLink
							to="/dashboard"
							class="dashboard-nav-link group"
							exact-active-class="bg-primary-50 text-primary-600 dark:bg-secondary-800 dark:text-primary-400"
						>
              <span
				  class="material-icons mr-3 text-secondary-500 group-hover:text-primary-600 dark:text-secondary-400 dark:group-hover:text-primary-400">
                dashboard
              </span>
							Обзор
						</NuxtLink>
						<NuxtLink
							to="/dashboard/urls"
							class="dashboard-nav-link group"
							exact-active-class="bg-primary-50 text-primary-600 dark:bg-secondary-800 dark:text-primary-400"
						>
              <span
				  class="material-icons mr-3 text-secondary-500 group-hover:text-primary-600 dark:text-secondary-400 dark:group-hover:text-primary-400">
                link
              </span>
							Мои ссылки
						</NuxtLink>
						<NuxtLink
							to="/dashboard/analytics"
							class="dashboard-nav-link group"
							exact-active-class="bg-primary-50 text-primary-600 dark:bg-secondary-800 dark:text-primary-400"
						>
              <span
				  class="material-icons mr-3 text-secondary-500 group-hover:text-primary-600 dark:text-secondary-400 dark:group-hover:text-primary-400">
                analytics
              </span>
							Аналитика
						</NuxtLink>
						<NuxtLink
							to="/dashboard/settings"
							class="dashboard-nav-link group"
							exact-active-class="bg-primary-50 text-primary-600 dark:bg-secondary-800 dark:text-primary-400"
						>
              <span
				  class="material-icons mr-3 text-secondary-500 group-hover:text-primary-600 dark:text-secondary-400 dark:group-hover:text-primary-400">
                settings
              </span>
							Настройки
						</NuxtLink>
					</nav>

					<div class="mt-auto pt-4 border-t border-secondary-200 dark:border-secondary-700">
						<div v-if="user?.isPremium" class="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
							<div class="flex items-center">
								<span class="material-icons text-green-600 dark:text-green-400 mr-2">stars</span>
								<span
									class="text-sm font-medium text-green-800 dark:text-green-400">Премиум аккаунт</span>
							</div>
							<p class="text-xs text-green-600 dark:text-green-500 mt-1">
								Доступны все функции
							</p>
						</div>
						<div v-else class="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg">
							<div class="flex items-center">
								<span class="material-icons text-amber-600 dark:text-amber-400 mr-2">info</span>
								<span
									class="text-sm font-medium text-amber-800 dark:text-amber-400">Базовый аккаунт</span>
							</div>
							<p class="text-xs text-amber-600 dark:text-amber-500 mt-1 mb-2">
								Доступно ограниченное количество ссылок
							</p>
							<NuxtLink to="/pricing"
									  class="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center">
								<span class="material-icons text-xs mr-1">upgrade</span>
								Перейти на премиум
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>

			<!-- Основной контент -->
			<div class="flex-grow p-4 md:p-6">
				<slot/>
			</div>
		</div>

		<!-- Мобильная навигация (внизу) -->
		<div
			class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-secondary-900 shadow-lg border-t border-secondary-200 dark:border-secondary-700">
			<div class="flex justify-around">
				<NuxtLink
					to="/dashboard"
					class="flex flex-col items-center py-2 px-3 text-secondary-600 dark:text-secondary-400"
					active-class="text-primary-600 dark:text-primary-400"
				>
					<span class="material-icons text-base">dashboard</span>
					<span class="text-xs mt-1">Обзор</span>
				</NuxtLink>
				<NuxtLink
					to="/dashboard/urls"
					class="flex flex-col items-center py-2 px-3 text-secondary-600 dark:text-secondary-400"
					active-class="text-primary-600 dark:text-primary-400"
				>
					<span class="material-icons text-base">link</span>
					<span class="text-xs mt-1">Ссылки</span>
				</NuxtLink>
				<NuxtLink
					to="/dashboard/analytics"
					class="flex flex-col items-center py-2 px-3 text-secondary-600 dark:text-secondary-400"
					active-class="text-primary-600 dark:text-primary-400"
				>
					<span class="material-icons text-base">analytics</span>
					<span class="text-xs mt-1">Аналитика</span>
				</NuxtLink>
				<NuxtLink
					to="/dashboard/settings"
					class="flex flex-col items-center py-2 px-3 text-secondary-600 dark:text-secondary-400"
					active-class="text-primary-600 dark:text-primary-400"
				>
					<span class="material-icons text-base">settings</span>
					<span class="text-xs mt-1">Настройки</span>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import TheHeader from '~/components/common/TheHeader.vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

// Middleware для защиты страниц дашборда
definePageMeta({
	middleware: 'auth'
});
</script>

<style scoped>
.dashboard-nav-link {
	@apply flex items-center px-3 py-2 text-secondary-700 hover:bg-secondary-50 hover:text-primary-600 rounded-md transition-colors dark:text-secondary-300 dark:hover:bg-secondary-800 dark:hover:text-primary-400;
}
</style>