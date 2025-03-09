<template>
	<div class="overflow-x-auto">
		<div class="mb-4 flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<div class="relative">
					<button
						@click="showBulkActions = !showBulkActions"
						:disabled="selectedLinks.length === 0"
						class="px-3 py-1.5 text-sm rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
						title="Show bulk actions">
						<span>Bulk Actions ({{ selectedLinks.length }})</span>
						<svg class="ml-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					<div v-if="showBulkActions && selectedLinks.length > 0"
						class="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 z-10">
						<div class="py-1">
							<button
								@click="handleBulkCopy"
								class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
								title="Copy all selected URLs to clipboard">
								Copy URLs
							</button>
							<button
								@click="handleBulkActivate(true)"
								class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
								title="Activate all selected links">
								Activate
							</button>
							<button
								@click="handleBulkActivate(false)"
								class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
								title="Deactivate all selected links">
								Deactivate
							</button>
							<button
								@click="handleBulkExport"
								class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
								title="Export selected links as JSON/CSV">
								Export
							</button>
							<button
								@click="handleBulkDelete"
								class="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
								title="Delete all selected links permanently">
								Delete
							</button>
						</div>
					</div>
				</div>

				<button
					v-if="selectedLinks.length > 0"
					@click="clearSelection"
					class="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
					title="Clear current selection">
					Clear selection
				</button>
			</div>

			<!-- Количество элементов на странице -->
			<div class="flex items-center">
				<span class="text-xs text-slate-500 dark:text-slate-400 mr-2">Rows per page:</span>
				<div class="flex space-x-1">
					<button
						v-for="count in itemsPerPageOptions"
						:key="count"
						@click="changeItemsPerPage(count)"
						class="px-2 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded"
						:class="{ 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium': count === itemsPerPage }"
						title="Show this many items per page">
						{{ count }}
					</button>
				</div>
			</div>
		</div>

		<table
			class="glass-card-border min-w-full divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
			<thead class="bg-slate-50 dark:bg-slate-800/60">
				<tr>
					<th scope="col"
						class="px-3 py-3.5 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-10">
						<input
							type="checkbox"
							class="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 dark:bg-slate-700 dark:checked:bg-indigo-600"
							:checked="isAllSelected"
							@change="toggleSelectAll">
					</th>
					<th scope="col"
						class="px-3 py-3.5 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
						Link
					</th>
					<th scope="col"
						class="px-3 py-3.5 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
						Clicks
					</th>
					<th scope="col"
						class="px-3 py-3.5 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
						Created
					</th>
					<th scope="col"
						class="px-3 py-3.5 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
						Status
					</th>
					<th scope="col"
						class="px-3 py-3.5 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
						Actions
					</th>
				</tr>
			</thead>
			<tbody class="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
				<tr v-for="link in links" :key="link.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/30">
					<td class="px-3 py-4 whitespace-nowrap">
						<input
							type="checkbox"
							class="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 dark:bg-slate-700 dark:checked:bg-indigo-600"
							:checked="isSelected(link.id)"
							@change="toggleSelect(link.id)">
					</td>
					<td class="px-3 py-4">
						<div class="flex flex-col">
							<div class="flex items-center">
								<span class="font-medium text-slate-900 dark:text-white">{{ link.title || 'Untitled Link' }}</span>
								<span v-if="link.tags && link.tags.length > 0" class="ml-2 flex space-x-1">
									<span
										v-for="tag in link.tags.slice(0, 2)"
										:key="tag"
										class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
										{{ tag }}
									</span>
									<span
										v-if="link.tags.length > 2"
										class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
										+{{ link.tags.length - 2 }}
									</span>
								</span>
							</div>
							<div class="mt-1 flex items-center">
								<a
									:href="link.originalUrl"
									target="_blank"
									class="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 truncate max-w-xs"
									:title="link.originalUrl">
									{{ link.originalUrl }}
								</a>
							</div>
							<div class="mt-1 flex items-center">
								<a
									:href="link.shortUrl"
									target="_blank"
									class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
									{{ link.shortUrl }}
								</a>
								<button
									@click="handleCopy(link.shortUrl, link.id)"
									class="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
									title="Copy short URL">
									<span v-if="copiedLinkId === link.id" class="text-green-500">
										<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
											fill="currentColor">
											<path fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd" />
										</svg>
									</span>
									<span v-else>
										<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
											viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
										</svg>
									</span>
								</button>
							</div>
						</div>
					</td>
					<td class="px-3 py-4 whitespace-nowrap">
						<div class="flex flex-col">
							<span class="text-lg font-semibold text-slate-900 dark:text-white">{{ link.clicks }}</span>
							<span class="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-0.5">
								<span
									:class="[
										link.clickTrend > 0 ? 'text-green-600 dark:text-green-400' :
											link.clickTrend < 0 ? 'text-red-600 dark:text-red-400' :
												'text-slate-500 dark:text-slate-400'
									]"
									class="flex items-center">
									<svg
										v-if="link.clickTrend > 0"
										class="h-3 w-3 mr-0.5"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 10l7-7m0 0l7 7m-7-7v18" />
									</svg>
									<svg
										v-else-if="link.clickTrend < 0"
										class="h-3 w-3 mr-0.5"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M19 14l-7 7m0 0l-7-7m7 7V3" />
									</svg>
									{{ Math.abs(link.clickTrend) }}%
								</span>
								<span class="ml-1">last 7 days</span>
							</span>
						</div>
					</td>
					<td class="px-3 py-4 whitespace-nowrap">
						<div class="text-sm text-slate-900 dark:text-white">
							{{ formatDate(link.createdAt) }}
						</div>
						<div class="text-xs text-slate-500 dark:text-slate-400">
							{{ formatTime(link.createdAt) }}
						</div>
					</td>
					<td class="px-3 py-4 whitespace-nowrap">
						<span
							:class="[
								link.isActive
									? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
									: 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300'
							]"
							class="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full">
							{{ link.isActive ? 'Active' : 'Inactive' }}
						</span>
					</td>
					<td class="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
						<div class="flex justify-end space-x-2">
							<button
								@click="$emit('view-stats', link)"
								class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
								title="View statistics">
								<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
								</svg>
							</button>
							<button
								@click="$emit('toggle-active', link)"
								:class="link.isActive ? 'text-amber-600 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300' : 'text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300'"
								:title="link.isActive ? 'Deactivate' : 'Activate'">
								<svg v-if="link.isActive" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
									viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
									viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</button>
							<button
								@click="$emit('edit', link)"
								class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
								title="Edit">
								<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
							</button>
							<button
								@click="$emit('delete', link)"
								class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
								title="Delete">
								<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { LinkData } from '~/types/link';

const props = defineProps<{
	links: LinkData[]
}>();

const emit = defineEmits([
	'edit',
	'delete',
	'view-stats',
	'copy',
	'toggle-active',
	'bulk-copy',
	'bulk-activate',
	'bulk-delete',
	'bulk-export',
	'items-per-page-change'
]);

// Bulk actions
const selectedLinks = ref<string[]>([]);
const showBulkActions = ref(false);

// Количество элементов на странице
const itemsPerPageOptions = [10, 20, 50, 100];
const itemsPerPage = ref(10);

// Изменение количества элементов на странице
const changeItemsPerPage = (count: number) => {
	itemsPerPage.value = count;
	emit('items-per-page-change', count);
};

// Format date
const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
};

// Format time
const formatTime = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit'
	});
};

// Check if link is selected
const isSelected = (id: string): boolean => {
	return selectedLinks.value.includes(id);
};

// Toggle selection of a link
const toggleSelect = (id: string): void => {
	const index = selectedLinks.value.indexOf(id);
	if (index === -1) {
		selectedLinks.value.push(id);
	} else {
		selectedLinks.value.splice(index, 1);
	}
};

// Check if all links are selected
const isAllSelected = computed(() => {
	return props.links.length > 0 && selectedLinks.value.length === props.links.length;
});

// Toggle selection of all links
const toggleSelectAll = (): void => {
	if (isAllSelected.value) {
		selectedLinks.value = [];
	} else {
		selectedLinks.value = props.links.map(link => link.id);
	}
};

// Clear selection
const clearSelection = (): void => {
	selectedLinks.value = [];
	showBulkActions.value = false;
};

// Handle bulk copy
const handleBulkCopy = (): void => {
	const urls = props.links
		.filter(link => selectedLinks.value.includes(link.id))
		.map(link => link.shortUrl);

	emit('bulk-copy', urls);
	showBulkActions.value = false;
};

// Handle bulk activate/deactivate
const handleBulkActivate = (active: boolean): void => {
	emit('bulk-activate', selectedLinks.value, active);
	showBulkActions.value = false;
};

// Handle bulk delete
const handleBulkDelete = (): void => {
	emit('bulk-delete', selectedLinks.value);
	showBulkActions.value = false;
};

// Handle bulk export
const handleBulkExport = (): void => {
	emit('bulk-export', selectedLinks.value);
	showBulkActions.value = false;
};

// Добавляем состояние для отслеживания скопированной ссылки
const copiedLinkId = ref<string | null>(null);

// Обновляем обработчик события копирования
const handleCopy = (url: string, id: string) => {
	emit('copy', url);
	copiedLinkId.value = id;
	setTimeout(() => {
		copiedLinkId.value = null;
	}, 2000);
};
</script>

<style scoped>
.glass-card {
	@apply bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 backdrop-blur-md;
}

.glass-card:hover {
	transform: translateY(0);
}

.table-head-cell {
	@apply px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider;
}

.table-cell {
	@apply px-4 py-3 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200;
}

.bulk-action-btn {
	@apply px-3 py-1.5 rounded-md bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium flex items-center transition-colors;
}
</style>