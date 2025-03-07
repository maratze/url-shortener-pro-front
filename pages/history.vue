<template>
	<div class="container mx-auto px-4 py-6 max-w-7xl">
		<!-- Заголовок страницы с кнопкой создания новой ссылки -->
		<div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
			<h1 class="text-3xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-0">Link History</h1>
			<button
				@click="openCreateModal"
				class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg flex items-center justify-center"
			>
				<svg class="h-5 w-5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
				</svg>
				Create New Link
			</button>
		</div>

		<!-- Блоки статистики -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
			<history-summary-card
				title="Total Links"
				:value="summary.totalLinks"
				unit="links"
				:trend="5"
				color="indigo"
				:sparkline-data="[10, 15, 12, 18, 20, 25, 22]"
			>
				<template #icon>
					<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
					</svg>
				</template>
			</history-summary-card>

			<history-summary-card
				title="Total Clicks"
				:value="summary.totalClicks"
				unit="clicks"
				:trend="12"
				color="green"
				:sparkline-data="[150, 230, 180, 290, 340, 320, 410]"
			>
				<template #icon>
					<svg class="h-5 w-5 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
					</svg>
				</template>
			</history-summary-card>

			<history-summary-card
				title="Average CTR"
				:value="summary.averageCTR.toFixed(1)"
				unit="%"
				:trend="-2"
				color="orange"
				:sparkline-data="[3.2, 4.5, 4.2, 3.8, 3.5, 3.3, 3.7]"
			>
				<template #icon>
					<svg class="h-5 w-5 text-orange-600 dark:text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
					</svg>
				</template>
			</history-summary-card>

			<history-summary-card
				title="Active Links"
				:value="summary.activeLinks"
				unit="active"
				:trend="0"
				color="blue"
				:sparkline-data="[8, 12, 15, 14, 15, 18, 18]"
			>
				<template #icon>
					<svg class="h-5 w-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</template>
			</history-summary-card>
		</div>

		<!-- Панель управления, фильтры и переключатели вида -->
		<div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
			<!-- Поиск -->
			<div class="relative flex-grow max-w-md">
				<input
					type="text"
					v-model="searchQuery"
					placeholder="Search links..."
					class="pl-10 pr-4 py-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
				/>
				<svg class="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>

			<!-- Действия справа -->
			<div class="flex items-center space-x-2 sm:justify-end">
				<!-- Фильтры -->
				<div class="relative">
					<button
						@click="showFilters = !showFilters"
						class="p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center"
					>
						<svg class="h-5 w-5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
						</svg>
						Filter
					</button>

					<!-- Выпадающая панель фильтров -->
					<div v-if="showFilters" class="absolute right-0 mt-2 w-72 rounded-lg shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 z-10">
						<div class="p-4 space-y-4">
							<div>
								<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
								<div class="flex space-x-2">
									<button
										@click="setStatusFilter('all')"
										:class="[
                      'px-3 py-1.5 text-xs rounded-md',
                      filters.status === 'all' 
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    ]"
									>
										All
									</button>
									<button
										@click="setStatusFilter('active')"
										:class="[
                      'px-3 py-1.5 text-xs rounded-md',
                      filters.status === 'active' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    ]"
									>
										Active
									</button>
									<button
										@click="setStatusFilter('inactive')"
										:class="[
                      'px-3 py-1.5 text-xs rounded-md',
                      filters.status === 'inactive' 
                        ? 'bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    ]"
									>
										Inactive
									</button>
								</div>
							</div>

							<div>
								<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date range</label>
								<div class="flex space-x-2">
									<input
										type="date"
										v-model="filters.startDate"
										class="px-3 py-1.5 text-xs rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
									/>
									<span class="text-slate-500 self-center">to</span>
									<input
										type="date"
										v-model="filters.endDate"
										class="px-3 py-1.5 text-xs rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
									/>
								</div>
							</div>

							<div>
								<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort by</label>
								<select
									v-model="filters.sortBy"
									class="w-full px-3 py-1.5 text-xs rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
								>
									<option value="created-desc">Newest first</option>
									<option value="created-asc">Oldest first</option>
									<option value="clicks-desc">Most clicks</option>
									<option value="clicks-asc">Least clicks</option>
									<option value="title-asc">Title (A-Z)</option>
									<option value="title-desc">Title (Z-A)</option>
								</select>
							</div>

							<div>
								<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tags</label>
								<div class="flex flex-wrap gap-1">
									<button
										v-for="tag in availableTags"
										:key="tag"
										@click="toggleTagFilter(tag)"
										:class="[
                      'px-2 py-1 text-xs rounded-full',
                      filters.tags.includes(tag) 
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    ]"
									>
										{{ tag }}
									</button>
								</div>
							</div>

							<div class="flex justify-end pt-2">
								<button
									@click="clearFilters"
									class="px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
								>
									Clear filters
								</button>
								<button
									@click="applyFilters"
									class="ml-2 px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
								>
									Apply
								</button>
							</div>
						</div>
					</div>
				</div>

				<!-- Настройки таблицы -->
				<history-table-settings
					@columns-change="handleColumnsChange"
					@density-change="handleDensityChange"
				/>

				<!-- Переключатель режима отображения -->
				<div class="flex border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden">
					<button
						@click="viewType = 'table'"
						:class="[
              'p-2 flex items-center justify-center',
              viewType === 'table' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            ]"
						title="Table view"
					>
						<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
					</button>
					<button
						@click="viewType = 'grid'"
						:class="[
              'p-2 flex items-center justify-center',
              viewType === 'grid' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            ]"
						title="Grid view"
					>
						<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Индикаторы активных фильтров -->
		<div v-if="hasActiveFilters" class="flex flex-wrap items-center mb-4 space-x-2">
			<span class="text-xs text-slate-500 dark:text-slate-400">Active filters:</span>

			<div v-if="filters.status !== 'all'" class="active-filter">
				Status: {{ filters.status }}
				<button @click="setStatusFilter('all')" class="ml-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
					<svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div v-if="filters.startDate || filters.endDate" class="active-filter">
				Date: {{ formatDateFilter() }}
				<button @click="clearDateFilter" class="ml-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
					<svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div v-for="tag in filters.tags" :key="tag" class="active-filter">
				Tag: {{ tag }}
				<button @click="toggleTagFilter(tag)" class="ml-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
					<svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<button
				@click="clearFilters"
				class="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
			>
				Clear all
			</button>
		</div>

		<!-- Сообщение при отсутствии данных -->
		<div v-if="loading" class="my-12 flex flex-col items-center justify-center">
			<svg class="animate-spin h-12 w-12 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
			<p class="text-slate-600 dark:text-slate-400">Loading your links...</p>
		</div>

		<div v-else-if="filteredLinks.length === 0" class="my-12 flex flex-col items-center justify-center">
			<div class="bg-slate-100 dark:bg-slate-700 rounded-full p-6 mb-4">
				<svg class="h-12 w-12 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
			</div>
			<h3 class="text-xl font-medium text-slate-800 dark:text-white mb-2">No links found</h3>
			<p class="text-slate-600 dark:text-slate-400 text-center mb-4">
				{{ searchQuery ? 'Try adjusting your search or filter criteria.' : 'You have not created any links yet.' }}
			</p>
			<button
				@click="openCreateModal"
				class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center"
			>
				<svg class="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
				</svg>
				Create your first link
			</button>
		</div>

		<!-- Табличный вид -->
		<div v-else-if="viewType === 'table'">
			<history-table
				:links="filteredLinks"
				@edit="openEditModal"
				@delete="openDeleteModal"
				@view-stats="openStatsModal"
				@copy="copyToClipboard"
				@toggle-active="toggleLinkActive"
				@bulk-copy="bulkCopy"
				@bulk-activate="bulkActivate"
				@bulk-delete="bulkDelete"
				@bulk-export="bulkExport"
			/>
		</div>

		<!-- Вид карточками -->
		<div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			<history-card
				v-for="link in filteredLinks"
				:key="link.id"
				:link="link"
				@edit="openEditModal"
				@delete="openDeleteModal"
				@view-stats="openStatsModal"
				@copy="copyToClipboard"
				@toggle-active="toggleLinkActive"
			/>
		</div>

		<!-- Пагинация -->
		<div class="mt-6 flex justify-between items-center flex-wrap">
			<div class="text-sm text-slate-600 dark:text-slate-400">
				Showing {{ paginationStart }}-{{ paginationEnd }} of {{ totalLinks }} links
			</div>

			<pagination-controls
				:total-pages="totalPages"
				:current-page="currentPage"
				@page-change="setPage"
			/>
		</div>

		<!-- Модальные окна -->
		<create-link-modal
			v-if="showCreateModal"
			@close="showCreateModal = false"
			@create="createLink"
		/>

		<edit-link-modal
			v-if="showEditModal && selectedLink"
			:link="selectedLink"
			@close="showEditModal = false"
			@save="updateLink"
		/>

		<delete-link-modal
			v-if="showDeleteModal && selectedLink"
			:link="selectedLink"
			@close="showDeleteModal = false"
			@confirm="deleteLink"
		/>

		<stats-modal
			v-if="showStatsModal && selectedLink"
			:link="selectedLink"
			@close="showStatsModal = false"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import type { LinkData, SummaryData } from '~/types/link';
import { useDeviceFingerprint } from '~/composables/useDeviceFingerprint';
import { useToastStore } from '~/stores/toast';

// Импортируем компоненты
import HistorySummaryCard from '~/components/history/HistorySummaryCard.vue';
import HistoryInsights from '~/components/history/HistoryInsights.vue';
import HistoryTable from '~/components/history/HistoryTable.vue';
import HistoryCard from '~/components/history/HistoryCard.vue';
import HistoryTableSettings from '~/components/history/HistoryTableSettings.vue';
import PaginationControls from '~/components/common/PaginationControls.vue';
import CreateLinkModal from '~/components/history/modals/CreateLinkModal.vue';
import EditLinkModal from '~/components/history/modals/EditLinkModal.vue';
import DeleteLinkModal from '~/components/history/modals/DeleteLinkModal.vue';
import StatsModal from '~/components/history/modals/StatsModal.vue';

interface TableColumn {
	id: string;
	label: string;
	visible: boolean;
	required: boolean;
}

// Состояние загрузки данных
const loading = ref(true);

// Модальные окна
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showStatsModal = ref(false);
const selectedLink = ref<LinkData | null>(null);

// Состояние панели фильтров
const showFilters = ref(false);

// Фильтры
const filters = reactive({
	status: 'all',
	startDate: '',
	endDate: '',
	sortBy: 'created-desc',
	tags: [] as string[]
});

// Тип отображения (таблица или сетка)
const viewType = ref('table');

// Поиск
const searchQuery = ref('');

// Пагинация
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Сводные данные
const summary = reactive<SummaryData>({
	totalLinks: 0,
	totalClicks: 0,
	averageCTR: 0,
	activeLinks: 0,
	weeklyClicksData: []
});

// Массив ссылок
const links = ref<LinkData[]>([]);
const availableTags = ref<string[]>([]);

// Хук для получения fingerprint
const { generateFingerprint } = useDeviceFingerprint();
const toastStore = useToastStore();

// Вычисляемые свойства
const hasActiveFilters = computed(() => {
	return filters.status !== 'all' || filters.startDate || filters.endDate || filters.tags.length > 0;
});

// Фильтрация ссылок
const filteredLinks = computed(() => {
	let result = [...links.value];

	// Фильтр по поисковому запросу
	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase();
		result = result.filter(link =>
			(link.title?.toLowerCase().includes(query)) ||
			link.originalUrl.toLowerCase().includes(query) ||
			link.shortUrl.toLowerCase().includes(query) ||
			(link.tags?.some(tag => tag.toLowerCase().includes(query)))
		);
	}

	// Фильтр по статусу
	if (filters.status !== 'all') {
		const isActive = filters.status === 'active';
		result = result.filter(link => link.isActive === isActive);
	}

	// Фильтр по датам
	if (filters.startDate) {
		const startDate = new Date(filters.startDate);
		startDate.setHours(0, 0, 0, 0);
		result = result.filter(link => {
			const createdDate = new Date(link.createdAt);
			return createdDate >= startDate;
		});
	}

	if (filters.endDate) {
		const endDate = new Date(filters.endDate);
		endDate.setHours(23, 59, 59, 999);
		result = result.filter(link => {
			const createdDate = new Date(link.createdAt);
			return createdDate <= endDate;
		});
	}

	// Фильтр по тегам
	if (filters.tags.length > 0) {
		result = result.filter(link => {
			if (!link.tags || link.tags.length === 0) return false;
			return filters.tags.some(tag => link.tags!.includes(tag));
		});
	}

	// Сортировка
	result.sort((a, b) => {
		const [field, direction] = filters.sortBy.split('-');
		let compareResult = 0;

		switch (field) {
			case 'created':
				compareResult = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
				break;
			case 'clicks':
				compareResult = a.clicks - b.clicks;
				break;
			case 'title':
				compareResult = (a.title || '').localeCompare(b.title || '');
				break;
			default:
				compareResult = 0;
		}

		return direction === 'asc' ? compareResult : -compareResult;
	});

	return result;
});

// Пагинация
const paginationStart = computed(() => {
	return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const paginationEnd = computed(() => {
	const end = currentPage.value * itemsPerPage.value;
	return Math.min(end, totalLinks.value);
});

const totalLinks = computed(() => filteredLinks.value.length);

const totalPages = computed(() => Math.ceil(totalLinks.value / itemsPerPage.value));

const paginatedLinks = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value;
	const end = start + itemsPerPage.value;
	return filteredLinks.value.slice(start, end);
});

// Функции для работы с фильтрами
const setStatusFilter = (status: string) => {
	filters.status = status;
};

const toggleTagFilter = (tag: string) => {
	const index = filters.tags.indexOf(tag);
	if (index === -1) {
		filters.tags.push(tag);
	} else {
		filters.tags.splice(index, 1);
	}
};

const clearDateFilter = () => {
	filters.startDate = '';
	filters.endDate = '';
};

const formatDateFilter = () => {
	if (filters.startDate && filters.endDate) {
		return `${formatShortDate(filters.startDate)} to ${formatShortDate(filters.endDate)}`;
	} else if (filters.startDate) {
		return `After ${formatShortDate(filters.startDate)}`;
	} else {
		return `Before ${formatShortDate(filters.endDate)}`;
	}
};

const formatShortDate = (dateStr: string) => {
	const date = new Date(dateStr);
	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const clearFilters = () => {
	filters.status = 'all';
	filters.startDate = '';
	filters.endDate = '';
	filters.tags = [];
	showFilters.value = false;
};

const applyFilters = () => {
	showFilters.value = false;
};

// Функции для управления страницей
const setPage = (page: number) => {
	currentPage.value = page;
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Функции для элементов управления таблицей
const handleColumnsChange = (columns: Array<{
	id: string;
	label: string;
	visible: boolean;
	required: boolean;
}>) => {
	console.log('Columns changed:', columns);
	// Здесь логика обновления отображаемых колонок
};

const handleDensityChange = (density: string) => {
	console.log('Table density changed:', density);
	// Здесь логика изменения плотности таблицы
};

// Функции работы с ссылками
const openCreateModal = () => {
	showCreateModal.value = true;
};

const openEditModal = (link: LinkData) => {
	selectedLink.value = { ...link };
	showEditModal.value = true;
};

const openDeleteModal = (link: LinkData) => {
	selectedLink.value = link;
	showDeleteModal.value = true;
};

const openStatsModal = (link: LinkData) => {
	selectedLink.value = link;
	showStatsModal.value = true;
};

const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text)
		.then(() => {
			toastStore.success('Link copied to clipboard');
		})
		.catch((err) => {
			console.error('Could not copy text: ', err);
			toastStore.error('Failed to copy link');
		});
};

const toggleLinkActive = (link: LinkData) => {
	// В реальном приложении здесь был бы запрос к API
	const index = links.value.findIndex(l => l.id === link.id);
	if (index !== -1) {
		links.value[index].isActive = !links.value[index].isActive;
		toastStore.success(`Link ${links.value[index].isActive ? 'activated' : 'deactivated'} successfully`);
	}
};

// Функции для массовых действий
const bulkCopy = (urls: string[]) => {
	navigator.clipboard.writeText(urls.join('\n'))
		.then(() => {
			toastStore.success(`${urls.length} links copied to clipboard`);
		})
		.catch((err) => {
			console.error('Could not copy links: ', err);
			toastStore.error('Failed to copy links');
		});
};

const bulkActivate = (ids: string[], active: boolean) => {
	// В реальном приложении здесь был бы запрос к API
	ids.forEach(id => {
		const link = links.value.find(l => l.id === id);
		if (link) {
			link.isActive = active;
		}
	});

	toastStore.success(`${ids.length} links ${active ? 'activated' : 'deactivated'} successfully`);
};

const bulkDelete = async (ids: string[]) => {
	// В реальном приложении здесь был бы запрос к API
	if (confirm(`Are you sure you want to delete ${ids.length} links? This action cannot be undone.`)) {
		links.value = links.value.filter(link => !ids.includes(link.id));
		updateSummary();
		toastStore.success(`${ids.length} links deleted successfully`);
	}
};

const bulkExport = (ids: string[]) => {
	const selectedLinks = links.value.filter(link => ids.includes(link.id));
	const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedLinks, null, 2));
	const downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute("href", dataStr);
	downloadAnchorNode.setAttribute("download", `links_export_${new Date().toISOString().slice(0, 10)}.json`);
	document.body.appendChild(downloadAnchorNode);
	downloadAnchorNode.click();
	downloadAnchorNode.remove();

	toastStore.success(`${ids.length} links exported successfully`);
};

// Создание, обновление и удаление ссылок
const createLink = (link: LinkData) => {
	// Генерация уникального ID и короткой ссылки
	const newLink = {
		...link,
		id: `link_${Date.now()}`,
		createdAt: new Date().toISOString(),
		clicks: 0
	};

	links.value.unshift(newLink);
	updateSummary();
	toastStore.success('Link created successfully');
	showCreateModal.value = false;
};

const updateLink = (updatedLink: LinkData) => {
	const index = links.value.findIndex(link => link.id === updatedLink.id);
	if (index !== -1) {
		links.value[index] = { ...updatedLink };
		updateSummary();
		toastStore.success('Link updated successfully');
		showEditModal.value = false;
	}
};

const deleteLink = (id: string) => {
	links.value = links.value.filter(link => link.id !== id);
	updateSummary();
	toastStore.success('Link deleted successfully');
	showDeleteModal.value = false;
};

// Обновление сводных данных
const updateSummary = () => {
	summary.totalLinks = links.value.length;
	summary.totalClicks = links.value.reduce((acc, link) => acc + link.clicks, 0);
	summary.activeLinks = links.value.filter(link => link.isActive).length;

	// Вычисляем средний CTR (если есть данные)
	if (summary.totalLinks > 0) {
		summary.averageCTR = (summary.totalClicks / summary.totalLinks) * 100;
	} else {
		summary.averageCTR = 0;
	}

	// Обновляем список тегов
	const uniqueTags = new Set<string>();
	links.value.forEach(link => {
		if (link.tags) {
			link.tags.forEach(tag => uniqueTags.add(tag));
		}
	});
	availableTags.value = Array.from(uniqueTags);
};

// Получение данных
const fetchLinks = async () => {
	loading.value = true;

	try {
		// Генерируем fingerprint для анонимных пользователей
		const fingerprint = await generateFingerprint();
		console.log('Device fingerprint:', fingerprint);

		// Здесь в реальном приложении был бы запрос к API
		// Имитация получения данных с сервера
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Генерируем тестовые данные
		links.value = generateMockLinks(25);

		// Обновляем сводные данные
		updateSummary();
	} catch (error) {
		console.error('Error fetching links:', error);
		toastStore.error('Failed to load links');
	} finally {
		loading.value = false;
	}
};

// Генерация тестовых данных
const generateMockLinks = (count: number): LinkData[] => {
	const domains = [
		'example.com', 'yourdomain.com', 'test-site.org',
		'blog.company.co', 'acme.inc', 'shop.store'
	];

	const titles = [
		'Marketing Campaign', 'Product Launch', 'Blog Post',
		'Social Media Link', 'Newsletter', 'Documentation'
	];

	const tags = [
		'marketing', 'blog', 'social', 'product', 'internal', 'newsletter',
		'documentation', 'campaign', 'landing-page'
	];

	const mockLinks: LinkData[] = [];

	for (let i = 0; i < count; i++) {
		const domain = domains[Math.floor(Math.random() * domains.length)];
		const path = Math.random().toString(36).substring(2, 8);
		const originalUrl = `https://${domain}/${path}`;
		const shortUrl = `https://tiny.url/${Math.random().toString(36).substring(2, 7)}`;
		const title = Math.random() > 0.3 ? titles[Math.floor(Math.random() * titles.length)] + ` ${i + 1}` : '';

		// Случайные теги
		const linkTags: string[] = [];
		if (Math.random() > 0.3) {
			const numTags = Math.floor(Math.random() * 3) + 1;
			for (let j = 0; j < numTags; j++) {
				const tag = tags[Math.floor(Math.random() * tags.length)];
				if (!linkTags.includes(tag)) {
					linkTags.push(tag);
				}
			}
		}

		// Случайное количество кликов
		const clicks = Math.floor(Math.random() * 1000);

		// Тренд изменения кликов (для индикатора)
		const clickTrend = Math.floor(Math.random() * 41) - 20; // от -20 до +20

		// Случайная дата создания в пределах последнего года
		const daysAgo = Math.floor(Math.random() * 365);
		const createdDate = new Date();
		createdDate.setDate(createdDate.getDate() - daysAgo);

		mockLinks.push({
			id: `link_${i}`,
			originalUrl,
			shortUrl,
			title,
			clicks,
			clickTrend,
			isActive: Math.random() > 0.2,
			createdAt: createdDate.toISOString(),
			customSlug: Math.random() > 0.5 ? path : '',
			tags: linkTags,
			utmSource: Math.random() > 0.8 ? 'newsletter' : '',
			utmMedium: Math.random() > 0.8 ? 'email' : '',
			utmCampaign: Math.random() > 0.8 ? 'spring_sale' : ''
		});
	}

	// Сортировка по дате создания (новые сверху)
	mockLinks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	return mockLinks;
};

// Начальная загрузка данных
onMounted(() => {
	fetchLinks();
});

// Сброс страницы пагинации при изменении фильтров или поискового запроса
watch([() => filters.status, () => filters.startDate, () => filters.endDate, () => filters.tags, searchQuery], () => {
	currentPage.value = 1;
});
</script>

<style scoped>
.active-filter {
	@apply px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center;
}
</style>