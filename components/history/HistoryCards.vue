<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		<div
			v-for="link in links"
			:key="link.id"
			class="glass-card overflow-hidden hover:shadow-md transition-shadow duration-300"
		>
			<!-- Карточка ссылки -->
			<div class="p-5">
				<!-- Заголовок и действия -->
				<div class="flex justify-between mb-3">
					<div class="flex items-center">
						<img
							:src="`https://www.google.com/s2/favicons?domain=${extractDomain(link.originalUrl)}&sz=32`"
							class="h-6 w-6 rounded-sm mr-2"
							alt="Site Icon"
						/>
						<h3 class="font-medium text-slate-800 dark:text-white truncate">
							{{ link.title || 'Untitled Link' }}
						</h3>
					</div>
					<span :class="statusBadgeClasses(link.isActive)" class="flex-shrink-0">
            {{ link.isActive ? 'Active' : 'Inactive' }}
          </span>
				</div>

				<!-- Оригинальный URL -->
				<p class="text-xs text-slate-600 dark:text-slate-400 truncate mb-3">
					{{ link.originalUrl }}
				</p>

				<!-- Сокращенный URL и кнопка копирования -->
				<div class="flex items-center bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-2 mb-4">
					<span class="text-indigo-600 dark:text-indigo-400 text-sm truncate">{{ link.shortUrl }}</span>
					<button
						@click="$emit('copy', link.shortUrl)"
						class="ml-auto p-1.5 rounded-full bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 transition-colors shadow-sm"
						title="Copy to clipboard"
					>
						<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
					</button>
				</div>

				<!-- Статистика и дата -->
				<div class="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
					<span>Created: {{ formatDate(link.createdAt) }}</span>
					<span class="flex items-center">
            <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            {{ link.clicks }} clicks
          </span>
				</div>

				<!-- Кнопки действий -->
				<div class="flex divide-x divide-slate-200 dark:divide-slate-700 -mx-5 -mb-5 border-t border-slate-200 dark:border-slate-700">
					<button
						@click="$emit('view-stats', link)"
						class="card-action-button"
					>
						<svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
						Stats
					</button>
					<button
						@click="$emit('edit', link)"
						class="card-action-button"
					>
						<svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
						</svg>
						Edit
					</button>
					<button
						@click="$emit('delete', link)"
						class="card-action-button text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
					>
						<svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
						Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { LinkData } from '~/types/link';

defineProps<{
	links: LinkData[];
}>();

defineEmits<{
	(e: 'edit', link: LinkData): void;
	(e: 'delete', link: LinkData): void;
	(e: 'view-stats', link: LinkData): void;
	(e: 'copy', url: string): void;
}>();

// Helper function to extract domain from URL
const extractDomain = (url: string): string => {
	try {
		const urlObj = new URL(url);
		return urlObj.hostname;
	} catch (e) {
		// Handle invalid URLs
		return url.split('/')[0];
	}
};

// Format date to readable string
const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});
};

// Status badge classes based on active state
const statusBadgeClasses = (isActive: boolean) => {
	return isActive
		? 'inline-flex px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
		: 'inline-flex px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300';
};
</script>

<style scoped>
.glass-card {
	@apply bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 backdrop-blur-md;
}

.card-action-button {
	@apply flex-1 py-2.5 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors;
}
</style>