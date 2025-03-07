<template>
	<div class="overflow-hidden glass-card">
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
				<thead class="bg-slate-50 dark:bg-slate-800/80">
				<tr>
					<th scope="col" class="table-head-cell w-1/3">Link</th>
					<th scope="col" class="table-head-cell w-1/4">Short URL</th>
					<th scope="col" class="table-head-cell text-center w-24">Clicks</th>
					<th scope="col" class="table-head-cell w-40">Created</th>
					<th scope="col" class="table-head-cell text-center w-24">Status</th>
					<th scope="col" class="table-head-cell w-28 text-right">Actions</th>
				</tr>
				</thead>
				<tbody class="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
				<tr v-for="link in links" :key="link.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-150">
					<!-- Original URL and title -->
					<td class="table-cell">
						<div class="flex flex-col">
							<div class="flex items-center">
								<img
									:src="`https://www.google.com/s2/favicons?domain=${extractDomain(link.originalUrl)}&sz=32`"
									class="h-5 w-5 rounded-sm mr-2"
									alt="Site Icon"
								/>
								<span v-if="link.title" class="font-medium text-slate-800 dark:text-white truncate">{{ link.title }}</span>
								<span v-else class="font-medium text-slate-800 dark:text-white truncate">Untitled Link</span>
							</div>
							<span class="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">
                  {{ truncateUrl(link.originalUrl) }}
                </span>
						</div>
					</td>

					<!-- Short URL with copy button -->
					<td class="table-cell">
						<div class="flex items-center">
							<span class="text-indigo-600 dark:text-indigo-400 truncate">{{ link.shortUrl }}</span>
							<button
								@click="$emit('copy', link.shortUrl)"
								class="ml-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
								title="Copy to clipboard"
							>
								<svg class="h-4 w-4 text-slate-500 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
								</svg>
							</button>
						</div>
					</td>

					<!-- Click count -->
					<td class="table-cell text-center font-medium">
						{{ link.clicks }}
					</td>

					<!-- Creation date -->
					<td class="table-cell text-slate-600 dark:text-slate-400">
						{{ formatDate(link.createdAt) }}
					</td>

					<!-- Status -->
					<td class="table-cell text-center">
              <span :class="statusBadgeClasses(link.isActive)">
                {{ link.isActive ? 'Active' : 'Inactive' }}
              </span>
					</td>

					<!-- Actions -->
					<td class="table-cell text-right">
						<div class="flex justify-end space-x-1">
							<button
								@click="$emit('view-stats', link)"
								class="action-button"
								title="View Statistics"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
								</svg>
							</button>
							<button
								@click="$emit('edit', link)"
								class="action-button"
								title="Edit Link"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
							</button>
							<button
								@click="$emit('delete', link)"
								class="action-button"
								title="Delete Link"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
							</button>
						</div>
					</td>
				</tr>
				</tbody>
			</table>
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

// Helper function to truncate URL
const truncateUrl = (url: string, maxLength = 50): string => {
	if (url.length <= maxLength) return url;
	return url.substring(0, maxLength) + '...';
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

.table-head-cell {
	@apply px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider;
}

.table-cell {
	@apply px-4 py-3 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200;
}

.action-button {
	@apply p-1.5 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-400 transition-colors;
}
</style>