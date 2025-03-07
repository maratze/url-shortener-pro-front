<template>
	<tr class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-150 group">
		<!-- Original URL and title -->
		<td class="table-cell">
			<div class="flex flex-col">
				<div class="flex items-center">
					<img
						:src="`https://www.google.com/s2/favicons?domain=${extractDomain(link.originalUrl)}&sz=32`"
						class="h-5 w-5 rounded-sm mr-2"
						alt="Site Icon"
					/>
					<span v-if="link.title" class="font-medium text-slate-800 dark:text-white truncate">{{
							link.title
						}}</span>
					<span v-else class="font-medium text-slate-800 dark:text-white truncate">Untitled Link</span>
				</div>
				<span class="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5 flex items-center">
          {{ truncateUrl(link.originalUrl) }}
          <button
			  @click="openPreviewPopover"
			  class="ml-1 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
			  title="Preview webpage"
		  >
            <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
				 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </button>
        </span>
			</div>
		</td>

		<!-- Short URL with copy button -->
		<td class="table-cell">
			<div class="flex items-center">
				<span class="text-indigo-600 dark:text-indigo-400 truncate">{{ link.shortUrl }}</span>
				<button
					@click="$emit('copy', link.shortUrl)"
					class="ml-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
					title="Copy to clipboard"
				>
					<svg class="h-4 w-4 text-slate-500 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg"
						 fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
					</svg>
				</button>
			</div>
		</td>

		<!-- Click count with trend indicator -->
		<td class="table-cell text-center font-medium">
			<div class="flex items-center justify-center">
				{{ link.clicks }}
				<!-- FIX: Added null check for clickTrend property -->
				<span v-if="link.clickTrend !== undefined && link.clickTrend > 0" class="ml-1 text-green-600"
					  :title="`+${link.clickTrend} since last week`">
      <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
      </svg>
    </span>
				<span v-else-if="link.clickTrend !== undefined && link.clickTrend < 0" class="ml-1 text-red-600"
					  :title="`${link.clickTrend} since last week`">
      <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"/>
      </svg>
    </span>
				<span v-else class="ml-1 text-slate-400" title="No change since last week">
      <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
      </svg>
    </span>
			</div>
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
			<div
				class="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
				<button
					@click="$emit('view-stats', link)"
					class="action-button"
					title="View Statistics"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
						 stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
					</svg>
				</button>
				<button
					@click="$emit('edit', link)"
					class="action-button"
					title="Edit Link"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
						 stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
					</svg>
				</button>
				<button
					@click="$emit('delete', link)"
					class="action-button"
					title="Delete Link"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
						 stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
					</svg>
				</button>
				<button
					@click="$emit('toggle-active', link)"
					class="action-button"
					:title="link.isActive ? 'Deactivate Link' : 'Activate Link'"
				>
					<svg v-if="link.isActive" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
						 viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
						 stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
				</button>
			</div>
		</td>

		<!-- Превью сайта (появляется по клику) -->
		<div v-if="showPreview" class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center"
			 @click.self="showPreview = false">
			<div class="fixed inset-0 bg-black/50" @click="showPreview = false"></div>
			<div
				class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-11/12 max-w-2xl max-h-[80vh] overflow-hidden z-10">
				<div class="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
					<h3 class="font-medium text-slate-800 dark:text-white">
						{{ link.title || 'Page Preview' }}
					</h3>
					<button @click="showPreview = false"
							class="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
						<svg class="h-5 w-5 text-slate-500 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg"
							 fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								  d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</button>
				</div>
				<div class="h-[60vh] overflow-hidden">
					<iframe :src="link.originalUrl" class="w-full h-full"
							sandbox="allow-scripts allow-same-origin"></iframe>
				</div>
			</div>
		</div>
	</tr>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { LinkData } from '~/types/link';

const props = defineProps<{
	link: LinkData;
}>();

defineEmits<{
	(e: 'edit', link: LinkData): void;
	(e: 'delete', link: LinkData): void;
	(e: 'view-stats', link: LinkData): void;
	(e: 'copy', url: string): void;
	(e: 'toggle-active', link: LinkData): void;
}>();

// Состояние превью
const showPreview = ref(false);

// Открыть превью
const openPreviewPopover = () => {
	showPreview.value = true;
};

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
.action-button {
	@apply p-1.5 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-400 transition-colors;
}

iframe {
	border: none;
}
</style>