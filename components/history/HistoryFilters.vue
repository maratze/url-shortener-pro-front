<template>
	<div id="links-section" class="mb-6 glass-card p-4">
		<div class="flex flex-col lg:flex-row gap-4">
			<!-- Поиск -->
			<div class="flex-grow">
				<div class="relative">
					<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<svg class="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</div>
					<input
						type="text"
						v-model="searchQuery"
						@input="emitSearch"
						placeholder="Search links by URL or title..."
						class="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400 dark:placeholder-slate-500"
					/>
				</div>
			</div>

			<!-- Фильтры -->
			<div class="flex flex-wrap gap-3">
				<!-- Фильтр по дате -->
				<div class="filter-select-wrapper">
					<select
						v-model="filters.dateRange"
						@change="emitFilter"
						class="filter-select"
					>
						<option value="all">All Time</option>
						<option value="today">Today</option>
						<option value="week">Past Week</option>
						<option value="month">Past Month</option>
						<option value="year">Past Year</option>
					</select>
				</div>

				<!-- Фильтр по статусу -->
				<div class="filter-select-wrapper">
					<select
						v-model="filters.status"
						@change="emitFilter"
						class="filter-select"
					>
						<option value="all">All Status</option>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
					</select>
				</div>

				<!-- Сортировка -->
				<div class="filter-select-wrapper">
					<select
						v-model="filters.sortBy"
						@change="emitFilter"
						class="filter-select"
					>
						<option value="date-desc">Newest First</option>
						<option value="date-asc">Oldest First</option>
						<option value="clicks-desc">Most Clicks</option>
						<option value="clicks-asc">Least Clicks</option>
						<option value="title-asc">Title A-Z</option>
						<option value="title-desc">Title Z-A</option>
					</select>
				</div>

				<!-- Переключатель вида -->
				<div class="flex rounded-md shadow-sm">
					<button
						type="button"
						@click="switchView('table')"
						class="view-toggle-btn rounded-l-md"
						:class="{ 'view-toggle-btn-active': viewMode === 'table' }"
						title="Table view"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
					</button>
					<button
						type="button"
						@click="switchView('cards')"
						class="view-toggle-btn rounded-r-md"
						:class="{ 'view-toggle-btn-active': viewMode === 'cards' }"
						title="Card view"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';

const props = defineProps<{
	viewMode: 'table' | 'cards'
}>();

const emit = defineEmits<{
	(e: 'search', query: string): void;
	(e: 'filter', filters: object): void;
	(e: 'view-change', mode: 'table' | 'cards'): void;
}>();

// Local state
const searchQuery = ref('');
const filters = reactive({
	dateRange: 'all',
	status: 'all',
	sortBy: 'date-desc'
});

// Watch for enter key in search
watch(searchQuery, (newValue, oldValue) => {
	// Only emit if there's a meaningful change
	if (newValue.trim() !== oldValue.trim()) {
		// Add a small delay to avoid too many emissions during typing
		const debounceTimer = setTimeout(() => {
			emit('search', newValue);
		}, 300);

		return () => clearTimeout(debounceTimer);
	}
});

// Emit search event
const emitSearch = () => {
	emit('search', searchQuery.value);
};

// Emit filter changes
const emitFilter = () => {
	emit('filter', filters);
};

// Change view mode
const switchView = (mode: 'table' | 'cards') => {
	emit('view-change', mode);
};
</script>

<style scoped>
.glass-card {
	@apply bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 backdrop-blur-md;
}

.filter-select-wrapper {
	@apply relative;
}

.filter-select-wrapper::after {
	content: '';
	@apply absolute top-1/2 right-3 transform -translate-y-1/2 border-solid border-t-4 border-r-4 border-b-0 border-l-4 border-r-transparent border-l-transparent border-t-slate-400 dark:border-t-slate-500 pointer-events-none h-0 w-0;
}

.filter-select {
	@apply py-2 pl-3 pr-8 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer text-sm shadow-sm;
}

.view-toggle-btn {
	@apply relative inline-flex items-center px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/80 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500;
}

.view-toggle-btn-active {
	@apply bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-500 dark:border-indigo-600;
}
</style>