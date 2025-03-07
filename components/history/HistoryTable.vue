<template>
	<div class="overflow-hidden glass-card">
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
				<thead class="bg-slate-50 dark:bg-slate-800/80">
				<tr>
					<!-- Чекбокс для выделения всех -->
					<th scope="col" class="table-head-cell w-10">
						<div class="flex items-center">
							<input
								type="checkbox"
								:checked="allSelected"
								:indeterminate.prop="someSelected && !allSelected"
								@change="toggleSelectAll"
								class="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600 dark:bg-slate-800"
							/>
						</div>
					</th>
					<th scope="col" class="table-head-cell w-1/3">Link</th>
					<th scope="col" class="table-head-cell w-1/4">Short URL</th>
					<th scope="col" class="table-head-cell text-center w-24">Clicks</th>
					<th scope="col" class="table-head-cell w-40">Created</th>
					<th scope="col" class="table-head-cell text-center w-24">Status</th>
					<th scope="col" class="table-head-cell w-28 text-right">Actions</th>
				</tr>
				</thead>
				<tbody class="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
				<tr v-for="link in links" :key="link.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-150 group">
					<!-- Чекбокс для выделения строки -->
					<td class="table-cell">
						<div class="flex items-center">
							<input
								type="checkbox"
								v-model="selectedItems"
								:value="link.id"
								class="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600 dark:bg-slate-800"
							/>
						</div>
					</td>

					<!-- Остальные ячейки таблицы -->
					<history-table-row
						:link="link"
						@edit="$emit('edit', link)"
						@delete="$emit('delete', link)"
						@view-stats="$emit('view-stats', link)"
						@copy="$emit('copy', $event)"
						@toggle-active="$emit('toggle-active', link)"
					/>
				</tr>
				</tbody>
			</table>
		</div>

		<!-- Панель массовых действий (появляется при выборе) -->
		<div
			v-if="selectedItems.length"
			class="bg-indigo-50 dark:bg-indigo-900/20 border-t border-indigo-100 dark:border-indigo-900/30 px-4 py-2 flex items-center justify-between"
		>
			<div class="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
				{{ selectedItems.length }} {{ selectedItems.length === 1 ? 'item' : 'items' }} selected
			</div>
			<div class="flex space-x-2">
				<button
					@click="$emit('bulk-copy', getSelectedLinks())"
					class="bulk-action-btn"
				>
					<svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
					</svg>
					Copy
				</button>
				<button
					@click="$emit('bulk-activate', selectedItems, true)"
					class="bulk-action-btn"
				>
					<svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					Activate
				</button>
				<button
					@click="$emit('bulk-activate', selectedItems, false)"
					class="bulk-action-btn"
				>
					<svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					Deactivate
				</button>
				<button
					@click="$emit('bulk-export', selectedItems)"
					class="bulk-action-btn"
				>
					<svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
					</svg>
					Export
				</button>
				<button
					@click="$emit('bulk-delete', selectedItems)"
					class="bulk-action-btn bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
				>
					<svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
					Delete
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { LinkData } from '~/types/link';
import HistoryTableRow from './HistoryTableRow.vue';

const props = defineProps<{
	links: LinkData[];
}>();

const emit = defineEmits<{
	(e: 'edit', link: LinkData): void;
	(e: 'delete', link: LinkData): void;
	(e: 'view-stats', link: LinkData): void;
	(e: 'copy', url: string): void;
	(e: 'toggle-active', link: LinkData): void;
	(e: 'bulk-copy', links: string[]): void;
	(e: 'bulk-activate', ids: string[], active: boolean): void;
	(e: 'bulk-delete', ids: string[]): void;
	(e: 'bulk-export', ids: string[]): void;
}>();

// Выбранные элементы
const selectedItems = ref<string[]>([]);

// Вычисляемые свойства для чекбокса "выбрать все"
const allSelected = computed(() => {
	return props.links.length > 0 && selectedItems.value.length === props.links.length;
});

const someSelected = computed(() => {
	return selectedItems.value.length > 0 && selectedItems.value.length < props.links.length;
});

// Сбрасываем выбор при изменении ссылок
watch(() => props.links, () => {
	selectedItems.value = [];
}, { deep: true });

// Выбрать/снять все
const toggleSelectAll = () => {
	if (allSelected.value) {
		selectedItems.value = [];
	} else {
		selectedItems.value = props.links.map(link => link.id);
	}
};

// Получить URL выбранных ссылок для копирования
const getSelectedLinks = (): string[] => {
	return props.links
		.filter(link => selectedItems.value.includes(link.id))
		.map(link => link.shortUrl);
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

.bulk-action-btn {
	@apply px-3 py-1.5 rounded-md bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium flex items-center transition-colors;
}
</style>