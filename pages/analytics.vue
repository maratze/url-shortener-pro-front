<template>
	<div class="container mx-auto px-6 py-6 max-w-7xl">
		<PageHeader title="Analytics">
			<template #button>
				<button
					@click="openCreateModal"
					class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg flex items-center justify-center">
					<svg class="h-5 w-5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						 stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
					</svg>
					Create New Link
				</button>
			</template>
			<template #subtitle v-if="!isAuthenticated">
				<div class="mt-2 text-sm text-slate-500 dark:text-slate-400 flex items-center">
					<svg class="h-4 w-4 mr-1.5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none"
						 viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>You are using the basic version. <NuxtLink to="/login"
																	 class="text-indigo-600 dark:text-indigo-400 hover:underline">Log in</NuxtLink> for access to
						advanced analytics.</span>
				</div>
			</template>
		</PageHeader>

		<!-- Блоки статистики -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
			<history-summary-card title="Total Links" :value="summary.totalLinks" unit="links"
								  :trend="summary.linksTrend"
								  color="indigo" :sparkline-data="summary.linksSparkline">
				<template #icon>
					<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
						 fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
					</svg>
				</template>
			</history-summary-card>

			<history-summary-card title="Total Clicks" :value="summary.totalClicks" unit="clicks"
								  :trend="summary.clicksTrend"
								  color="green" :sparkline-data="summary.clicksSparkline">
				<template #icon>
					<svg class="h-5 w-5 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg"
						 fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
					</svg>
				</template>
			</history-summary-card>

			<history-summary-card title="Average CTR" :value="summary.averageCtr.toFixed(1)" unit="%"
								  :trend="summary.ctrTrend"
								  color="blue" :sparkline-data="summary.ctrSparkline">
				<template #icon>
					<svg class="h-5 w-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg"
						 fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
					</svg>
				</template>
			</history-summary-card>

			<history-summary-card title="Active Links" :value="summary.activeLinks" unit="active"
								  :trend="summary.activeLinksTrend" color="blue" :sparkline-data="summary.activeLinksSparkline">
				<template #icon>
					<svg class="h-5 w-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none"
						 viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</template>
			</history-summary-card>
		</div>

		<!-- Графики и расширенная аналитика (только для авторизованных пользователей) -->
		<div v-if="isAuthenticated" class="mb-4">
			<div
				class="graph-container bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden mb-4 border border-slate-200 dark:border-slate-700">
				<div class="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
					<h3 class="text-lg font-medium text-slate-900 dark:text-white">Clicks Analytics</h3>
					<div class="flex space-x-2">
						<button v-for="(period, index) in timePeriods" :key="index"
								@click="activeTimePeriod = period.value"
								:class="[
								'px-2 py-1 text-xs rounded-md',
								activeTimePeriod === period.value
									? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
									: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
							]">
							{{ period.label }}
						</button>
					</div>
				</div>
				<div class="p-4">
					<div class="h-64">
						<!-- Здесь будет внедрен график кликов -->
						<history-clicks-chart :data="chartData[activeTimePeriod as keyof ChartDataTypes]"
											  :period="activeTimePeriod" />
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
				<!-- Географическое распределение -->
				<div
					class="graph-container bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
					<div class="p-4 border-b border-slate-200 dark:border-slate-700">
						<h3 class="text-lg font-medium text-slate-900 dark:text-white">Geography</h3>
					</div>
					<div class="p-4">
						<history-geo-distribution :data="geoData" />
					</div>
				</div>

				<!-- Рефереры (Traffic Sources) -->
				<div
					class="graph-container bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
					<div class="p-4 border-b border-slate-200 dark:border-slate-700">
						<h3 class="text-lg font-medium text-slate-900 dark:text-white">Traffic Sources</h3>
					</div>
					<div class="p-4">
						<history-referrers-chart :data="referrersData" />
					</div>
				</div>

				<!-- Устройства (Devices) -->
				<div
					class="graph-container bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
					<div class="p-4 border-b border-slate-200 dark:border-slate-700">
						<h3 class="text-lg font-medium text-slate-900 dark:text-white">Devices</h3>
					</div>
					<div class="p-4">
						<history-devices-chart :data="devicesData" />
					</div>
				</div>
			</div>
		</div>

		<div class="glass-card glass-card-border glass-card-prevent-transform flex flex-col bg-white p-4">
			<!-- Панель управления, фильтры и переключатели вида -->
			<div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
				<!-- Поиск -->
				<div class="relative flex-grow max-w-md">
					<input type="text" v-model="searchQuery" placeholder="Search links..."
						   class="glass-card-border glass-card-prevent-transform shadow-sm pl-10 pr-4 py-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white" />
					<svg class="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2"
						 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>

				<div class="flex items-center space-x-2 sm:justify-end">
					<!-- Переключатель режима отображения -->
					<div class="flex border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden">
						<button @click="viewType = 'table'" :class="[
							'p-2 flex items-center justify-center',
							viewType === 'table'
								? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
								: 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
						]" title="Table view">
							<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
								 stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									  d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
							</svg>
						</button>
						<button @click="viewType = 'grid'" :class="[
							'p-2 flex items-center justify-center',
							viewType === 'grid'
								? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
								: 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
						]" title="Grid view">
							<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
								 stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
							</svg>
						</button>
					</div>

					<!-- Фильтры -->
					<div class="relative" style="display: none;">
						<button @click="toggleFilters"
								class="filters-button p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center"
								:class="{ 'filter-active': hasActiveFilters }" title="Filters">
							<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
								 stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
							</svg>
						</button>

						<!-- Выпадающая панель фильтров -->
						<div v-if="showFilters"
							 class="filters-menu absolute right-0 mt-2 w-72 rounded-lg shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 z-10">
							<div class="p-4 space-y-4">
								<div>
									<label
										class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
									<div class="flex space-x-2">
										<button @click="setStatusFilter('all')" :class="[
											'px-3 py-1.5 text-xs rounded-md',
											filters.status === 'all'
												? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
												: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
										]">
											All
										</button>
										<button @click="setStatusFilter('active')" :class="[
											'px-3 py-1.5 text-xs rounded-md',
											filters.status === 'active'
												? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
												: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
										]">
											Active
										</button>
										<button @click="setStatusFilter('inactive')" :class="[
											'px-3 py-1.5 text-xs rounded-md',
											filters.status === 'inactive'
												? 'bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200'
												: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
										]">
											Inactive
										</button>
									</div>
								</div>

								<!-- Фильтр по дате -->
								<div class="mb-4">
									<label class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">
										Date Range
									</label>

									<div class="flex flex-col space-y-3">
										<div class="flex items-center">
											<span class="text-sm text-slate-600 dark:text-slate-400 w-16">From:</span>
											<input type="date" v-model="filters.startDate"
												   class="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:text-white">
										</div>

										<div class="flex items-center">
											<span class="text-sm text-slate-600 dark:text-slate-400 w-16">To:</span>
											<input type="date" v-model="filters.endDate"
												   class="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:text-white">
										</div>
									</div>
								</div>

								<div>
									<label
										class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort
										by</label>
									<select v-model="filters.sortBy"
											class="w-full px-3 py-1.5 text-xs rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
										<option value="created-desc">Newest first</option>
										<option value="created-asc">Oldest first</option>
										<option value="clicks-desc">Most clicks</option>
										<option value="clicks-asc">Least clicks</option>
										<option value="title-asc">Title (A-Z)</option>
										<option value="title-desc">Title (Z-A)</option>
									</select>
								</div>

								<div v-if="isAuthenticated">
									<label
										class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Projects</label>
									<select v-model="filters.project"
											class="w-full px-3 py-1.5 text-xs rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
										<option value="">All projects</option>
										<option v-for="project in availableProjects" :key="project.id"
												:value="project.id">
											{{ project.name }}
										</option>
									</select>
								</div>

								<div>
									<label
										class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tags</label>
									<div class="max-h-40 overflow-y-auto flex flex-wrap gap-1">
										<button v-for="tag in availableTags" :key="tag" @click="toggleTagFilter(tag)"
												:class="[
												'px-2 py-1 text-xs rounded-full',
												filters.tags.includes(tag)
													? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
													: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
											]">
											{{ tag }}
										</button>
									</div>
								</div>

								<div class="flex justify-end pt-2">
									<button @click="clearFilters"
											class="px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
										Clear filters
									</button>
								</div>
							</div>
						</div>
					</div>

					<!-- Настройки таблицы -->
					<div style="display: none;">
						<HistoryTableSettings
							ref="settingsMenuRef"
							:columns="tableColumns"
							:is-compact="isCompactTable"
							:show-borders="showTableBorders"
							:show-stripes="showTableStripes"
							@toggle-column="toggleColumn"
							@toggle-compact="toggleCompact"
							@toggle-borders="toggleBorders"
							@toggle-stripes="toggleStripes"
							@reset-settings="resetTableSettings"
							@items-per-page-change="handleItemsPerPageChange"/>
					</div>

					<!-- Импорт/Экспорт (для авторизованных) -->
					<div v-if="isAuthenticated" class="relative" style="display: none;">
						<button @click="toggleImportExport"
								class="import-export-button p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center"
								title="Import/Export">
							<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
								 stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									  d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
							</svg>
						</button>

						<!-- Выпадающая панель импорта/экспорта -->
						<div v-if="showImportExport"
							 class="import-export-menu absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 z-10">
							<div class="p-2">
								<button @click="openImportModal"
										class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
									Import from CSV/JSON
								</button>
								<button @click="exportLinks"
										class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
									Export selected
								</button>
								<button @click="exportAllLinks"
										class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
									Export all links
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Индикаторы активных фильтров -->
			<div v-if="hasActiveFilters" class="flex flex-wrap items-center mb-4 space-x-2">
				<span class="text-xs text-slate-500 dark:text-slate-400">Active filters:</span>

				<div v-if="filters.status !== 'all'" class="active-filter">
					Status: {{ filters.status }}
					<button @click="setStatusFilter('all')"
							class="ml-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
						<svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							 stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								  d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div v-if="filters.startDate || filters.endDate" class="active-filter">
					Date: {{ formatDateFilter() }}
					<button @click="clearDateFilter"
							class="ml-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
						<svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							 stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								  d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div v-if="filters.project" class="active-filter">
					Project: {{ getProjectName(filters.project) }}
					<button @click="filters.project = ''"
							class="ml-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
						<svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							 stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								  d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div v-for="tag in filters.tags" :key="tag" class="active-filter">
					Tag: {{ tag }}
					<button @click="toggleTagFilter(tag)"
							class="ml-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
						<svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							 stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								  d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<button @click="clearFilters"
						class="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
					Clear all
				</button>
			</div>

			<!-- Сообщение при отсутствии данных -->
			<div v-if="loading" class="my-12 flex flex-col items-center justify-center">
				<svg class="animate-spin h-12 w-12 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
					 viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor"
						  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
					</path>
				</svg>
				<p class="text-slate-600 dark:text-slate-400">Loading your links...</p>
			</div>

			<div v-else-if="filteredLinks.length === 0" class="my-12 flex flex-col items-center justify-center">
				<div class="bg-slate-100 dark:bg-slate-700 rounded-full p-6 mb-4">
					<svg class="h-12 w-12 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg"
						 fill="none"
						 viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
				</div>
				<h3 class="text-xl font-medium text-slate-800 dark:text-white mb-2">No links found</h3>
				<p class="text-slate-600 dark:text-slate-400 text-center mb-4">
					{{ searchQuery ? 'Try adjusting your search or filter criteria.' : 'You have not created any links yet.' }}
				</p>
				<button @click="openCreateModal"
						class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center">
					<svg class="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						 stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							  d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
					</svg>
					Create your first link
				</button>
			</div>

			<!-- Основная часть страницы - список ссылок -->
			<div class="mt-4">
				<!-- Таблица с историей ссылок -->
				<div v-if="viewType === 'table'">
					<history-table :links="paginatedLinks" @edit="openEditModal" @delete="openDeleteModal"
								   @view-stats="openStatsModal" @copy="copyToClipboard" @toggle-active="toggleLinkActive"
								   @bulk-copy="bulkCopy" @bulk-activate="bulkActivate" @bulk-delete="bulkDelete"
								   @bulk-export="bulkExport"
								   @items-per-page-change="handleItemsPerPageChange" />
				</div>

				<!-- Вид карточками -->
				<div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					<history-card v-for="link in filteredLinks" :key="link.id" :link="link" @edit="openEditModal"
								  @delete="openDeleteModal" @view-stats="openStatsModal" @copy="copyToClipboard"
								  @toggle-active="toggleLinkActive" />
				</div>
			</div>

			<!-- Пагинация -->
			<div class="mt-6 flex justify-between items-center flex-wrap">
				<div class="text-sm text-slate-600 dark:text-slate-400">
					Showing {{ paginationStart }}-{{ paginationEnd }} of {{ totalLinks }} links
				</div>

				<pagination-controls :total-pages="totalPages" :current-page="currentPage" @page-change="setPage" />
			</div>
		</div>

		<!-- Модальные окна -->
		<CreateLinkModal v-if="showCreateModal" @close="showCreateModal = false" @create="createLink" />

		<EditLinkModal v-if="showEditModal && selectedLink" :link="selectedLink" @close="showEditModal = false"
					   @save="updateLink" />

		<DeleteLinkModal v-if="showDeleteModal && selectedLink" :link="selectedLink" @close="showDeleteModal = false"
						 @confirm="deleteLink" />

		<StatsModal v-if="showStatsModal && selectedLink" :link="selectedLink" @close="showStatsModal = false" />

		<import-links-modal v-if="showImportModal" @close="showImportModal = false" @import="importLinks" />
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import type { LinkData, SummaryData } from '~/types/link';
import { useDeviceFingerprint } from '~/composables/useDeviceFingerprint';
import { useToastStore } from '~/stores/toast';
import { useAuth } from '~/composables/useAuth';
import { useLocalStorage } from '@vueuse/core';

// Импортируем компоненты
import HistorySummaryCard from '~/components/history/HistorySummaryCard.vue';
import HistoryInsights from '~/components/history/HistoryInsights.vue';
import HistoryTable from '~/components/history/HistoryTable.vue';
import HistoryCard from '~/components/history/HistoryCard.vue';
import HistoryTableSettings from '~/components/history/HistoryTableSettings.vue';
import HistoryClicksChart from '~/components/history/charts/HistoryClicksChart.vue';
import HistoryGeoDistribution from '~/components/history/charts/HistoryGeoDistribution.vue';
import HistoryDevicesChart from '~/components/history/charts/HistoryDevicesChart.vue';
import HistoryReferrersChart from '~/components/history/charts/HistoryReferrersChart.vue';
import PaginationControls from '~/components/common/PaginationControls.vue';
import CreateLinkModal from '~/components/history/modals/CreateLinkModal.vue';
import EditLinkModal from '~/components/history/modals/EditLinkModal.vue';
import DeleteLinkModal from '~/components/history/modals/DeleteLinkModal.vue';
import StatsModal from '~/components/history/modals/StatsModal.vue';
import ImportLinksModal from '~/components/history/modals/ImportLinksModal.vue';
import PageHeader from '~/components/common/PageHeader.vue';

interface TableColumn {
	id: string;
	label: string;
	visible: boolean;
	required: boolean;
}

interface Project {
	id: string;
	name: string;
}

interface TimePeriod {
	value: string;
	label: string;
}

// Хук для проверки аутентификации
const { isAuthenticated } = useAuth();

// Состояние загрузки данных
const loading = ref(true);

// Модальные окна
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showStatsModal = ref(false);
const showImportModal = ref(false);
const showImportExport = ref(false);
const selectedLink = ref<LinkData | null>(null);

// Состояние панели фильтров
const showFilters = ref(false);

// Фильтры
const filters = reactive({
	status: 'all',
	startDate: '',
	endDate: '',
	sortBy: 'created-desc',
	tags: [] as string[],
	project: ''
});

// Тип отображения (таблица или сетка)
const viewType = ref('table');

// Поиск
const searchQuery = ref('');

// Пагинация
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Временные периоды для графиков
const timePeriods = ref<TimePeriod[]>([
	{ value: 'day', label: 'Day' },
	{ value: 'week', label: 'Week' },
	{ value: 'month', label: 'Month' },
	{ value: 'year', label: 'Year' }
]);
const activeTimePeriod = ref('week');

// Типы данных для графиков
interface DayData {
	time: string;
	clicks: number;
}

interface DateData {
	date: string;
	clicks: number;
}

interface MonthData {
	month: string;
	clicks: number;
}

interface ChartDataTypes {
	day: DayData[];
	week: DateData[];
	month: DateData[];
	year: MonthData[];
}

interface GeoData {
	country: string;
	clicks: number;
	percentage: number;
}

interface DeviceData {
	type: string;
	count: number;
	percentage: number;
}

interface ReferrerData {
	source: string;
	count: number;
	percentage: number;
}

// Данные для графиков
const chartData = ref<ChartDataTypes>({
	day: [],
	week: [],
	month: [],
	year: []
});
const geoData = ref<GeoData[]>([]);
const devicesData = ref<DeviceData[]>([]);
const referrersData = ref<ReferrerData[]>([]);

// Проекты
const availableProjects = ref<Project[]>([]);

// Сводные данные
const summary = reactive<SummaryData>({
	totalLinks: 0,
	totalClicks: 0,
	averageCtr: 0,
	activeLinks: 0,
	activeLinksPercentage: 0,
	weeklyClicksData: [],
	linksTrend: 5,
	linksSparkline: [10, 15, 12, 18, 20, 25, 22],
	clicksTrend: 12,
	clicksSparkline: [150, 230, 180, 290, 340, 320, 410],
	ctrTrend: -2,
	ctrSparkline: [3.2, 4.5, 4.2, 3.8, 3.5, 3.3, 3.7],
	activeLinksTrend: 0,
	activeLinksSparkline: [8, 12, 15, 14, 15, 18, 18]
});

// Массив ссылок
const links = ref<LinkData[]>([]);
const availableTags = ref<string[]>([]);

// Хук для получения fingerprint
const { generateFingerprint } = useDeviceFingerprint();
const toastStore = useToastStore();

// Вычисляемые свойства
const hasActiveFilters = computed(() => {
	return filters.status !== 'all' || filters.startDate || filters.endDate || filters.tags.length > 0 || filters.project;
});

// Функция для получения названия проекта по ID
const getProjectName = (projectId: string): string => {
	const project = availableProjects.value.find(p => p.id === projectId);
	return project ? project.name : 'Неизвестный проект';
};

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

	// Фильтр по проекту
	if (filters.project) {
		result = result.filter(link => link.projectId === filters.project);
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
	filters.project = '';
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

const handleItemsPerPageChange = (count: number) => {
	itemsPerPage.value = count;
	currentPage.value = 1; // Сбрасываем на первую страницу при изменении количества элементов
};

// Функции работы с ссылками
const openCreateModal = () => {
	showCreateModal.value = true;
};

const openEditModal = (link: LinkData): void => {
	selectedLink.value = { ...link };
	showEditModal.value = true;
};

const openDeleteModal = (link: LinkData): void => {
	selectedLink.value = link;
	showDeleteModal.value = true;
};

const openStatsModal = (link: LinkData): void => {
	selectedLink.value = link;
	showStatsModal.value = true;
};

const copyToClipboard = (text: string): void => {
	navigator.clipboard.writeText(text)
		.then(() => {
			toastStore.success('Link copied to clipboard');
		})
		.catch((err) => {
			console.error('Could not copy text: ', err);
			toastStore.error('Failed to copy link');
		});
};

const toggleLinkActive = (link: LinkData): void => {
	// В реальном приложении здесь был бы запрос к API
	const index = links.value.findIndex(l => l.id === link.id);
	if (index !== -1) {
		links.value[index].isActive = !links.value[index].isActive;
		toastStore.success(`Link ${links.value[index].isActive ? 'activated' : 'deactivated'} successfully`);
	}
};

// Функции для массовых действий
const bulkCopy = (urls: string[]): void => {
	navigator.clipboard.writeText(urls.join('\n'))
		.then(() => {
			toastStore.success(`${urls.length} links copied to clipboard`);
		})
		.catch((err) => {
			console.error('Could not copy links: ', err);
			toastStore.error('Failed to copy links');
		});
};

const bulkActivate = (ids: string[], active: boolean): void => {
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

const bulkExport = (ids: string[]): void => {
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
const createLink = (link: LinkData): void => {
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

const updateLink = (updatedLink: LinkData): void => {
	const index = links.value.findIndex(link => link.id === updatedLink.id);
	if (index !== -1) {
		links.value[index] = { ...updatedLink };
		updateSummary();
		toastStore.success('Link updated successfully');
		showEditModal.value = false;
	}
};

const deleteLink = (id: string): void => {
	links.value = links.value.filter(link => link.id !== id);
	updateSummary();
	toastStore.success('Link deleted successfully');
	showDeleteModal.value = false;
};

// Обновление сводных данных
const updateSummary = (): void => {
	summary.totalLinks = links.value.length;
	summary.totalClicks = links.value.reduce((acc, link) => acc + link.clicks, 0);
	summary.activeLinks = links.value.filter(link => link.isActive).length;

	// Вычисляем средний CTR (если есть данные)
	if (summary.totalLinks > 0) {
		summary.averageCtr = (summary.totalClicks / summary.totalLinks) * 100;
	} else {
		summary.averageCtr = 0;
	}

	// Вычисляем процент активных ссылок
	if (summary.totalLinks > 0) {
		summary.activeLinksPercentage = Math.round((summary.activeLinks / summary.totalLinks) * 100);
	} else {
		summary.activeLinksPercentage = 0;
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

		// Генерируем проекты
		if (isAuthenticated.value) {
			availableProjects.value = generateMockProjects();

			// Генерируем данные для графиков
			generateChartData();
		}

		// Обновляем сводные данные
		updateSummary();
	} catch (error) {
		console.error('Error fetching links:', error);
		toastStore.error('Failed to load links');
	} finally {
		loading.value = false;
	}
};

// Генерация тестовых данных для графиков
const generateChartData = () => {
	// Данные для временных графиков
	chartData.value = {
		day: Array.from({ length: 24 }, (_, i) => ({
			time: `${i}:00`,
			clicks: Math.floor(Math.random() * 50)
		})),
		week: Array.from({ length: 7 }, (_, i) => {
			const date = new Date();
			date.setDate(date.getDate() - 6 + i);
			return {
				date: date.toISOString().split('T')[0],
				clicks: Math.floor(Math.random() * 200)
			};
		}),
		month: Array.from({ length: 30 }, (_, i) => {
			const date = new Date();
			date.setDate(date.getDate() - 29 + i);
			return {
				date: date.toISOString().split('T')[0],
				clicks: Math.floor(Math.random() * 500)
			};
		}),
		year: Array.from({ length: 12 }, (_, i) => {
			const date = new Date();
			date.setMonth(date.getMonth() - 11 + i);
			return {
				month: date.toLocaleString('default', { month: 'short' }),
				clicks: Math.floor(Math.random() * 2000)
			};
		})
	};

	// Географические данные
	geoData.value = [
		{ country: 'USA', clicks: 1245, percentage: 35 },
		{ country: 'Russia', clicks: 854, percentage: 24 },
		{ country: 'Germany', clicks: 432, percentage: 12 },
		{ country: 'UK', clicks: 321, percentage: 9 },
		{ country: 'France', clicks: 287, percentage: 8 },
		{ country: 'Others', clicks: 423, percentage: 12 }
	];

	// Данные по устройствам
	devicesData.value = [
		{ type: 'Desktop', count: 1854, percentage: 52 },
		{ type: 'Mobile', count: 1423, percentage: 40 },
		{ type: 'Tablet', count: 287, percentage: 8 }
	];

	// Данные по источникам трафика
	referrersData.value = [
		{ source: 'Direct', count: 952, percentage: 27 },
		{ source: 'Social Media', count: 1245, percentage: 35 },
		{ source: 'Email', count: 687, percentage: 19 },
		{ source: 'Search', count: 421, percentage: 12 },
		{ source: 'Other', count: 259, percentage: 7 }
	];
};

// Генерация тестовых проектов
const generateMockProjects = (): Project[] => {
	return [
		{ id: 'project_1', name: 'Marketing Campaign 2024' },
		{ id: 'project_2', name: 'Product Launch' },
		{ id: 'project_3', name: 'Company Blog' },
		{ id: 'project_4', name: 'Social Media' }
	];
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

	const projects = isAuthenticated.value ? ['project_1', 'project_2', 'project_3', 'project_4'] : [];

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

		// Проект (только для авторизованных пользователей)
		const projectId = isAuthenticated.value && Math.random() > 0.3
			? projects[Math.floor(Math.random() * projects.length)]
			: '';

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
			utmCampaign: Math.random() > 0.8 ? 'spring_sale' : '',
			projectId
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

// Импорт ссылок
const importLinks = (links: LinkData[]) => {
	// В реальном приложении здесь был бы запрос к API для импорта ссылок
	toastStore.success(`Imported ${links.length} links`);
	showImportModal.value = false;
	fetchLinks(); // Перезагружаем ссылки после импорта
};

// Импорт/экспорт ссылок
const toggleImportExport = () => {
	showImportExport.value = !showImportExport.value;
	if (showImportExport.value) {
		showFilters.value = false; // Закрываем другие меню при открытии текущего
		// Добавляем обработчик клика за пределами меню
		setTimeout(() => {
			document.addEventListener('click', closeImportExportOnClickOutside);
		}, 0);
	}
};

const openImportModal = () => {
	showImportModal.value = true;
	showImportExport.value = false;
};

const exportLinks = () => {
	// Экспорт выбранных ссылок
	toastStore.success('Выбранные ссылки успешно экспортированы');
	showImportExport.value = false;
};

const exportAllLinks = () => {
	// Экспорт всех ссылок
	const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(links.value, null, 2));
	const downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute("href", dataStr);
	downloadAnchorNode.setAttribute("download", `all_links_export_${new Date().toISOString().slice(0, 10)}.json`);
	document.body.appendChild(downloadAnchorNode);
	downloadAnchorNode.click();
	downloadAnchorNode.remove();

	toastStore.success('Все ссылки успешно экспортированы');
	showImportExport.value = false;
};

// Добавим функции для закрытия выпадающих меню при клике вне элемента
// Закрытие меню импорта/экспорта при клике вне элемента
const closeImportExportOnClickOutside = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	const importExportMenu = document.querySelector('.import-export-menu');
	const importExportButton = document.querySelector('.import-export-button');

	if (importExportMenu && importExportButton &&
		!importExportMenu.contains(target) &&
		!importExportButton.contains(target)) {
		showImportExport.value = false;
		document.removeEventListener('click', closeImportExportOnClickOutside);
	}
};

// Функция для переключения фильтров
const toggleFilters = () => {
	showFilters.value = !showFilters.value;
	if (showFilters.value) {
		showImportExport.value = false; // Закрываем другие меню при открытии текущего
		// Добавляем обработчик клика за пределами меню
		setTimeout(() => {
			document.addEventListener('click', closeFiltersOnClickOutside);
		}, 0);
	}
};

// Закрытие фильтров при клике вне элемента
const closeFiltersOnClickOutside = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	const filtersMenu = document.querySelector('.filters-menu');
	const filtersButton = document.querySelector('.filters-button');

	if (filtersMenu && filtersButton &&
		!filtersMenu.contains(target) &&
		!filtersButton.contains(target)) {
		showFilters.value = false;
		document.removeEventListener('click', closeFiltersOnClickOutside);
	}
};

// Обработчики для закрытия меню при размонтировании компонента
onBeforeUnmount(() => {
	document.removeEventListener('click', closeImportExportOnClickOutside);
	document.removeEventListener('click', closeFiltersOnClickOutside);
});

// Добавлю функцию-помощник для закрытия выпадающих меню при клике вне их
const useClickOutside = (elementRef: Ref<HTMLElement | null>, callback: () => void) => {
	const handleClickOutside = (event: MouseEvent) => {
		if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
			callback();
		}
	};

	onMounted(() => {
		document.addEventListener('mousedown', handleClickOutside);
	});

	onUnmounted(() => {
		document.removeEventListener('mousedown', handleClickOutside);
	});
};

// Добавлю ref для каждого выпадающего списка
const filterMenuRef = ref<HTMLElement | null>(null);
const settingsMenuRef = ref<HTMLElement | null>(null);
const userMenuRef = ref<HTMLElement | null>(null);

// Функции для закрытия выпадающих меню
const closeFilterMenu = () => {
	if (showFilters.value) {
		showFilters.value = false;
	}
};

const closeSettingsMenu = () => {
	if (showImportExport.value) {
		showImportExport.value = false;
	}
};

const closeUserMenu = () => {
	if (showCreateModal.value || showEditModal.value || showDeleteModal.value || showStatsModal.value || showImportModal.value) {
		showCreateModal.value = false;
		showEditModal.value = false;
		showDeleteModal.value = false;
		showStatsModal.value = false;
		showImportModal.value = false;
	}
};

// Используем функцию-помощник для каждого меню
useClickOutside(filterMenuRef, closeFilterMenu);
useClickOutside(settingsMenuRef, closeSettingsMenu);
useClickOutside(userMenuRef, closeUserMenu);

// Состояние настроек таблицы
const tableColumns = ref([
	{ key: 'link', label: 'Link', visible: true },
	{ key: 'shortUrl', label: 'Short URL', visible: true },
	{ key: 'clicks', label: 'Clicks', visible: true },
	{ key: 'created', label: 'Created Date', visible: true },
	{ key: 'status', label: 'Status', visible: true },
	{ key: 'tags', label: 'Tags', visible: true },
	{ key: 'lastClick', label: 'Last Click', visible: false }
]);

const isCompactTable = ref(false);
const showTableBorders = ref(true);
const showTableStripes = ref(true);

// Обработчики для настроек таблицы
const toggleColumn = (key: string) => {
	const column = tableColumns.value.find(col => col.key === key);
	if (column) {
		column.visible = !column.visible;
	}
};

const toggleCompact = () => {
	isCompactTable.value = !isCompactTable.value;
};

const toggleBorders = () => {
	showTableBorders.value = !showTableBorders.value;
};

const toggleStripes = () => {
	showTableStripes.value = !showTableStripes.value;
};

const resetTableSettings = () => {
	// Сброс настроек к значениям по умолчанию
	tableColumns.value.forEach(column => {
		if (['link', 'shortUrl', 'clicks', 'created', 'status'].includes(column.key)) {
			column.visible = true;
		} else {
			column.visible = false;
		}
	});
	isCompactTable.value = false;
	showTableBorders.value = true;
	showTableStripes.value = true;
};

// Состояние пользовательского меню
const isUserMenuOpen = ref(false);

// Переключение пользовательского меню
const toggleUserMenu = () => {
	isUserMenuOpen.value = !isUserMenuOpen.value;
};
</script>

<style scoped>
.graph-container {
	border: 1px solid var(--card-border);
}

/* Добавляем новый стиль для активной кнопки фильтра в конец секции стилей */
.filter-active {
	@apply border-indigo-500 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30;
}
</style>