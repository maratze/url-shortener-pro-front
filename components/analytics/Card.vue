<template>
	<div
		class="history-card bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
		<!-- Card Header - Title and Actions -->
		<div class="px-4 pt-4 pb-2 flex justify-between items-start">
			<h3 class="font-medium text-slate-900 dark:text-white truncate" :title="link?.title || link?.originalUrl">
				{{ link?.title || extractDomain(link?.originalUrl || '') }}
			</h3>
			<div class="flex space-x-1">
				<!-- Status Badge -->
				<span
					v-if="link"
					:class="statusBadgeClasses"
					class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
					{{ link.isActive ? 'Active' : 'Inactive' }}
				</span>
			</div>
		</div>

		<!-- Card Content -->
		<div class="px-4 py-2">
			<!-- Original URL -->
			<div class="mb-2">
				<div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Original URL</div>
				<div class="text-sm text-slate-700 dark:text-slate-300 truncate" :title="link?.originalUrl">
					{{ link?.originalUrl }}
				</div>
			</div>

			<!-- Short URL -->
			<div class="mb-2">
				<div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Short URL</div>
				<div class="flex items-center">
					<div class="text-sm text-indigo-600 dark:text-indigo-400 truncate font-medium mr-2"
						:title="link?.shortUrl">
						{{ link?.shortUrl }}
					</div>
					<button
						type="button"
						@click="copyShortUrl"
						class="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
						title="Copy short URL">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
							</path>
						</svg>
					</button>
				</div>
			</div>

			<!-- Stats -->
			<div class="flex items-center justify-between mb-2">
				<div>
					<div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Clicks</div>
					<div class="flex items-center">
						<span class="text-sm font-medium">{{ link?.clicks || 0 }}</span>
						<!-- Click trend indicator -->
						<span
							v-if="link?.clickTrend && link.clickTrend > 0"
							class="ml-1 text-green-600"
							:title="`+${link.clickTrend} since last week`">
							<svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
							</svg>
						</span>
						<span
							v-else-if="link?.clickTrend && link.clickTrend < 0"
							class="ml-1 text-red-600"
							:title="`${link.clickTrend} since last week`">
							<svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
							</svg>
						</span>
					</div>
				</div>
				<div>
					<div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Created</div>
					<div class="text-sm text-slate-700 dark:text-slate-300" :title="formatDate(link?.createdAt || '')">
						{{ formatTimeAgo(link?.createdAt || '') }}
					</div>
				</div>
			</div>
		</div>

		<!-- Card Actions -->
		<div class="px-4 py-3 bg-slate-50 dark:bg-slate-700/30 flex justify-between">
			<div class="flex space-x-2">
				<button
					@click="onEdit"
					class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
					title="Edit link">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
						</path>
					</svg>
				</button>
				<button
					@click="onStats"
					class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
					title="View statistics">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
						</path>
					</svg>
				</button>
				<button
					@click="onDelete"
					class="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
					title="Delete link">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
						</path>
					</svg>
				</button>
			</div>
			<label class="inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					:checked="link?.isActive"
					@change="onToggleActive"
					class="sr-only peer" />
				<div
					class="relative w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500">
				</div>
			</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { format, formatDistanceToNow } from 'date-fns';
import type { LinkData } from "~/types/link";

// Define props
const props = defineProps<{
	link: LinkData;
}>();

// Define emits with proper types
const emit = defineEmits<{
	(e: 'edit', link: LinkData): void;
	(e: 'delete', link: LinkData): void;
	(e: 'view-stats', link: LinkData): void;
	(e: 'copy', url: string): void;
	(e: 'toggle-active', link: LinkData): void;
}>();

// Extract domain from URL
const extractDomain = (url: string): string => {
	try {
		const urlObj = new URL(url);
		return urlObj.hostname;
	} catch (e) {
		return url;
	}
};

// Format date for display
const formatDate = (dateString: string): string => {
	if (!dateString) return '';
	return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
};

// Format time ago (relative time)
const formatTimeAgo = (dateString: string): string => {
	if (!dateString) return '';
	return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

// Status badge classes based on link status
const statusBadgeClasses = computed(() => {
	return props.link.isActive
		? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
		: 'bg-slate-100 text-slate-800 dark:bg-slate-700/30 dark:text-slate-400';
});

// Event handlers
const onEdit = () => {
	emit('edit', props.link);
};

const onDelete = () => {
	emit('delete', props.link);
};

const onStats = () => {
	emit('view-stats', props.link);
};

const copyShortUrl = () => {
	emit('copy', props.link.shortUrl);
};

const onToggleActive = () => {
	emit('toggle-active', props.link);
};
</script>

<style scoped>
.history-card {
	border: 1px solid var(--card-border);
}

.dark .history-card {
	border-color: var(--card-border-dark);
}
</style>