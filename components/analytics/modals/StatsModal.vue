<template>
	<div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<!-- Фоновое затемнение -->
		<div
			class="fixed inset-0 bg-slate-500 bg-opacity-75 dark:bg-slate-900 dark:bg-opacity-75 transition-opacity backdrop-blur-sm">
		</div>

		<div class="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
			<div
				class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transform transition-all max-w-3xl w-full p-6"
				@click.stop>
				<!-- Заголовок модального окна -->
				<div class="flex justify-between items-center mb-5">
					<div>
						<h3 class="text-lg text-left font-medium text-slate-800 dark:text-white" id="modal-title">
							Link Analytics
						</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400 flex items-center">
							<span class="truncate max-w-md">{{ link?.title || 'Untitled Link' }}</span>
							<span class="inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-xs font-medium"
								:class="link?.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'">
								{{ link?.isActive ? 'Active' : 'Inactive' }}
							</span>
						</p>
					</div>
					<button
						@click="closeModal"
						type="button"
						class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
						data-tooltip="Close"
						data-tooltip-position="left">
						<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Загрузка данных статистики -->
				<div v-if="loading" class="py-12 flex flex-col items-center justify-center">
					<svg class="animate-spin mb-4 h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg"
						fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
						</circle>
						<path class="opacity-75" fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
						</path>
					</svg>
					<p class="text-slate-600 dark:text-slate-400">Loading analytics data...</p>
				</div>

				<div v-else>
					<!-- Основная информация о ссылке -->
					<div class="glass-card-border bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 mb-4">
						<div class="grid grid-cols-1 md:grid-cols-12 gap-4">
							<div class="md:col-span-7">
								<div class="flex items-center">
									<img
										:src="`https://www.google.com/s2/favicons?domain=${extractDomain(link?.originalUrl)}&sz=32`"
										class="h-5 w-5 rounded-sm mr-2"
										alt="Site Icon" />
									<a :href="link?.originalUrl" target="_blank"
										class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium truncate max-w-xs">
										{{ truncateUrl(link?.originalUrl, 50) }}
									</a>
								</div>
								<div
									class="glass-card-border flex items-center mt-2 bg-white dark:bg-slate-800/50 rounded-md px-3 py-2">
									<span class="text-sm text-slate-700 dark:text-slate-300 truncate max-w-xs">
										{{ link?.shortUrl }}
									</span>
									<button
										@click="copyShortUrl"
										class="ml-2 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 transition-colors"
										title="Copy to clipboard">
										<span v-if="isCopied" class="text-green-500">
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
								<div class="mt-2 text-xs text-slate-500 dark:text-slate-400 text-left">
									Created {{ formatDate(link?.createdAt) }} • Last visited {{
										formatDate(link?.lastClickedAt || link?.createdAt) }}
								</div>
							</div>
							<div class="md:col-span-5 flex flex-wrap gap-3 justify-end">
								<div
									class="glass-card-border flex-1 min-w-[100px] text-center px-4 py-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
									<div class="text-2xl font-bold text-slate-800 dark:text-white">
										{{ formatNumber(analytics.totalClicks) }}
									</div>
									<div class="text-xs text-slate-500 dark:text-slate-400">Total Clicks</div>
									<div class="text-xs mt-1" :class="getClickTrendClass(link?.clickTrend)">
										<span v-if="link?.clickTrend && link.clickTrend > 0">+{{ link.clickTrend
										}}%</span>
										<span v-else-if="link?.clickTrend && link.clickTrend < 0">{{ link.clickTrend
										}}%</span>
										<span v-else>—</span>
									</div>
								</div>
								<div
									class="glass-card-border flex-1 min-w-[100px] text-center px-4 py-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
									<div class="text-2xl font-bold text-slate-800 dark:text-white">
										{{ formatNumber(analytics.uniqueClicks) }}
									</div>
									<div class="text-xs text-slate-500 dark:text-slate-400">Unique Visitors</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Вкладки для различных метрик -->
					<div class="mb-4">
						<div class="border-b border-slate-200 dark:border-slate-700">
							<nav class="-mb-px flex space-x-6 overflow-x-auto">
								<button
									v-for="tab in tabs"
									:key="tab.id"
									@click="activeTab = tab.id"
									class="py-2 px-1 text-sm font-medium transition-colors whitespace-nowrap"
									:class="activeTab === tab.id
										? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
										: 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'">
									<span class="flex items-center">
										<!-- Иконки для табов -->
										<svg v-if="tab.id === 'daily'" class="h-4 w-4 mr-1.5"
											xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
											stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
										</svg>
										<svg v-else-if="tab.id === 'location'" class="h-4 w-4 mr-1.5"
											xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
											stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<svg v-else-if="tab.id === 'devices'" class="h-4 w-4 mr-1.5"
											xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
											stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
										</svg>
										<svg v-else-if="tab.id === 'referrers'" class="h-4 w-4 mr-1.5"
											xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
											stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
										</svg>
										<svg v-else-if="tab.id === 'time'" class="h-4 w-4 mr-1.5"
											xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
											stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										{{ tab.name }}
									</span>
								</button>
							</nav>
						</div>
					</div>

					<!-- Контент активной вкладки -->
					<div>
						<!-- График по дням -->
						<div v-if="activeTab === 'daily'"
							class="mb-4 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
							<h4 class="text-sm font-medium text-slate-800 dark:text-white mb-3">Daily Performance</h4>
							<div class="h-52">
								<line-chart :chart-data="dailyChartData" :options="chartOptions" class="max-h-full" />
							</div>
						</div>

						<!-- Геолокация -->
						<div v-else-if="activeTab === 'location'"
							class="mb-4 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
							<div class="flex justify-between items-center mb-3">
								<h4 class="text-sm font-medium text-slate-800 dark:text-white">Top Countries</h4>
								<span class="text-xs text-slate-500 dark:text-slate-400">Last 30 days</span>
							</div>
							<div class="space-y-2.5">
								<div v-for="(item, index) in analytics.clicksByCountry" :key="index"
									class="flex items-center py-2 px-3 rounded-md transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/30">
									<div class="w-6 flex-shrink-0 flex justify-center">
										<img :src="`https://flagcdn.com/20x15/${getCountryCode(item.country).toLowerCase()}.png`"
											:alt="item.country"
											class="h-3.5 w-auto rounded-sm shadow-sm" />
									</div>
									<div
										class="w-24 ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 truncate text-left">
										{{ item.country }}
									</div>
									<div class="flex-grow ml-3">
										<div
											class="bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden shadow-inner">
											<div
												class="rounded-full h-2 progress-bar"
												:class="getLocationColorClass(index)"
												:style="{ width: `${(item.count / analytics.totalClicks) * 100}%` }">
											</div>
										</div>
									</div>
									<div class="ml-3 w-20 text-right flex flex-col items-end">
										<span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{
											formatNumber(item.count) }}</span>
										<span class="text-xs text-slate-500 dark:text-slate-400">{{ ((item.count /
											analytics.totalClicks) * 100).toFixed(1) }}%</span>
									</div>
								</div>
							</div>
						</div>

						<!-- Устройства -->
						<div v-else-if="activeTab === 'devices'"
							class="mb-4 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
							<div class="flex justify-between items-center mb-3">
								<h4 class="text-sm font-medium text-slate-800 dark:text-white text-left">Device Types
								</h4>
								<span class="text-xs text-slate-500 dark:text-slate-400">Last 30 days</span>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<div class="h-48">
										<doughnut-chart :chart-data="deviceChartData" :options="pieChartOptions"
											class="max-h-full" />
									</div>
								</div>
								<div class="flex items-center">
									<div class="w-full">
										<div v-for="(item, index) in deviceChartData.datasets[0].data" :key="index"
											class="mb-2 flex items-center">
											<span class="h-3 w-3 rounded-full mr-2"
												:style="{ backgroundColor: deviceChartData.datasets[0].backgroundColor[index] }"></span>
											<span class="text-sm text-slate-700 dark:text-slate-300 w-20 text-left">
												{{ deviceChartData.labels[index] }}
											</span>
											<div
												class="flex-grow bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
												<div class="h-2 rounded-full"
													:style="{
														width: `${item}%`,
														backgroundColor: deviceChartData.datasets[0].backgroundColor[index]
													}">
												</div>
											</div>
											<span class="ml-2 text-xs font-medium text-slate-600 dark:text-slate-400">
												{{ item }}%
											</span>
										</div>
									</div>
								</div>
							</div>

							<div class="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
								<h4 class="text-sm font-medium text-slate-800 dark:text-white mb-3 text-left">Browsers
								</h4>
								<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<div class="h-48">
											<doughnut-chart :chart-data="browserChartData" :options="pieChartOptions"
												class="max-h-full" />
										</div>
									</div>
									<div class="flex items-center">
										<div class="w-full">
											<div v-for="(item, index) in browserChartData.datasets[0].data" :key="index"
												class="mb-2 flex items-center">
												<span class="h-3 w-3 rounded-full mr-2"
													:style="{ backgroundColor: browserChartData.datasets[0].backgroundColor[index] }"></span>
												<span class="text-sm text-slate-700 dark:text-slate-300 w-20 text-left">
													{{ browserChartData.labels[index] }}
												</span>
												<div
													class="flex-grow bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
													<div class="h-2 rounded-full"
														:style="{
															width: `${item}%`,
															backgroundColor: browserChartData.datasets[0].backgroundColor[index]
														}">
													</div>
												</div>
												<span
													class="ml-2 text-xs font-medium text-slate-600 dark:text-slate-400">
													{{ item }}%
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Рефереры -->
						<div v-else-if="activeTab === 'referrers'"
							class="mb-4 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
							<div class="flex justify-between items-center mb-3">
								<h4 class="text-sm font-medium text-slate-800 dark:text-white">Top Referrers</h4>
								<span class="text-xs text-slate-500 dark:text-slate-400">Last 30 days</span>
							</div>
							<div class="space-y-2.5">
								<div v-for="(item, index) in analytics.clicksByReferrer" :key="index"
									class="flex items-center py-2 px-3 rounded-md transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/30">
									<div class="w-6 flex-shrink-0 flex justify-center">
										<img v-if="item.referrer !== 'Direct'"
											:src="`https://www.google.com/s2/favicons?domain=${item.referrer}&sz=32`"
											class="h-4 w-4 rounded-sm"
											alt="Site Icon" />
										<svg v-else
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4 text-slate-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round"
												stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</div>
									<div
										class="w-24 ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 truncate text-left">
										{{ item.referrer }}
									</div>
									<div class="flex-grow ml-3">
										<div
											class="bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden shadow-inner">
											<div
												class="rounded-full h-2 progress-bar"
												:class="getReferrerColorClass(index)"
												:style="{ width: `${(item.count / analytics.totalClicks) * 100}%` }">
											</div>
										</div>
									</div>
									<div class="ml-3 w-20 text-right flex flex-col items-end">
										<span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{
											formatNumber(item.count) }}</span>
										<span class="text-xs text-slate-500 dark:text-slate-400">{{ ((item.count /
											analytics.totalClicks) * 100).toFixed(1) }}%</span>
									</div>
								</div>
							</div>
						</div>

						<!-- Почасовая статистика -->
						<div v-else-if="activeTab === 'time'"
							class="mb-4 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
							<div class="flex justify-between items-center mb-3">
								<h4 class="text-sm font-medium text-slate-800 dark:text-white">Hourly Distribution</h4>
								<span class="text-xs text-slate-500 dark:text-slate-400">Last 30 days</span>
							</div>
							<div class="h-52">
								<bar-chart :chart-data="hourlyChartData" :options="barChartOptions"
									class="max-h-full" />
							</div>
							<div class="mt-4 grid grid-cols-2 gap-4">
								<div class="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg glass-card-border">
									<div class="text-xs text-slate-500 dark:text-slate-400">Peak Traffic Hours</div>
									<div class="text-base font-medium text-slate-800 dark:text-white mt-1">14:00 - 18:00
									</div>
								</div>
								<div class="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg glass-card-border">
									<div class="text-xs text-slate-500 dark:text-slate-400">Best Performing Day</div>
									<div class="text-base font-medium text-slate-800 dark:text-white mt-1">Wednesday
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Дополнительные карточки сводной информации -->
					<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 my-4">
						<div class="glass-card bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
							<div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Avg. Session Duration</div>
							<div class="text-base font-medium text-slate-800 dark:text-white">2m 45s</div>
						</div>
						<div class="glass-card bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
							<div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Bounce Rate</div>
							<div class="text-base font-medium text-slate-800 dark:text-white">34.2%</div>
						</div>
						<div class="glass-card bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
							<div class="text-xs text-slate-500 dark:text-slate-400 mb-1">New vs. Returning</div>
							<div class="text-base font-medium text-slate-800 dark:text-white">78% / 22%</div>
						</div>
						<div class="glass-card bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
							<div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Conversion Rate</div>
							<div class="text-base font-medium text-slate-800 dark:text-white">3.5%</div>
						</div>
					</div>

					<!-- Кнопки экспорта и QR-кода -->
					<div class="flex justify-end items-center space-x-3 mt-6">
						<button
							@click="generateQRCode"
							class="px-3 py-1.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none flex items-center text-sm"
							title="Generate QR code for sharing">
							<svg class="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
							</svg>
							QR Code
						</button>
						<button
							v-if="false"
							@click="exportData"
							class="px-3 py-1.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none flex items-center text-sm"
							title="Export analytics data as CSV or JSON">
							<svg class="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
							</svg>
							Export Data
						</button>
						<button
							@click="generateReport"
							class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg focus:outline-none flex items-center text-sm"
							title="Generate PDF report">
							<svg class="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							Generate Report
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Модальное окно QR-кода -->
		<div
			v-if="showQRCode"
			class="fixed inset-0 z-50 flex items-center justify-center p-4"
			@click="showQRCode = false">
			<div class="fixed inset-0 bg-slate-900 bg-opacity-75 backdrop-blur-sm"></div>
			<div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl relative z-10 w-80" @click.stop>
				<div class="flex justify-between items-center mb-4">
					<h3 class="text-lg font-medium text-slate-800 dark:text-white">QR Code</h3>
					<button
						@click="showQRCode = false"
						class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none">
						<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div class="bg-white p-3 rounded-lg flex items-center justify-center">
					<!-- Здесь в реальном приложении будет генерироваться QR-код -->
					<div class="w-52 h-52 bg-slate-100 flex items-center justify-center">
						<p class="text-sm text-slate-500">QR Code Image</p>
					</div>
				</div>

				<div class="mt-4">
					<button
						class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg focus:outline-none text-sm">
						Download QR Code
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import type { LinkData, LinkAnalytics } from '~/types/link';
import { useToastStore } from '~/stores/toast';
import { LineChart, BarChart, DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// Расширяем тип LinkData для добавления lastClickedAt
interface ExtendedLinkData extends LinkData {
	lastClickedAt?: string;
}

const props = defineProps<{
	link: ExtendedLinkData | null;
}>();

const emit = defineEmits(['close']);
const toastStore = useToastStore();

// Состояние загрузки
const loading = ref(true);

// Состояние QR-кода
const showQRCode = ref(false);

// Состояние копирования
const isCopied = ref(false);

// Табы для разных типов статистики
const tabs = [
	{ id: 'daily', name: 'Daily Activity' },
	{ id: 'location', name: 'Locations' },
	{ id: 'devices', name: 'Devices' },
	{ id: 'referrers', name: 'Referrers' },
	{ id: 'time', name: 'Time Analysis' },
];

const activeTab = ref('daily');

// Данные аналитики
const analytics = ref<LinkAnalytics>({
	totalClicks: 0,
	uniqueClicks: 0,
	clicksByCountry: [],
	clicksByDevice: [],
	clicksByBrowser: [],
	clicksByDate: [],
	clicksByHour: [],
	clicksByReferrer: []
});

// Загрузка данных аналитики
onMounted(async () => {
	try {
		// Имитация запроса к API
		await new Promise(resolve => setTimeout(resolve, 1200));

		// Заполняем моковыми данными для демонстрации
		analytics.value = generateMockAnalytics();

	} catch (error) {
		console.error('Error loading analytics:', error);
		toastStore.error('Failed to load link statistics');
	} finally {
		loading.value = false;
	}
});

// Генерация моковых данных для статистики
const generateMockAnalytics = (): LinkAnalytics => {
	const totalClicks = props.link?.clicks || Math.floor(Math.random() * 5000) + 100;
	const uniqueClicks = Math.floor(totalClicks * (0.6 + Math.random() * 0.3));

	// Генерация данных по странам
	const countries = ['United States', 'Germany', 'United Kingdom', 'France', 'India', 'Canada', 'Australia'];
	const clicksByCountry = countries.map(country => {
		return {
			country,
			count: Math.floor(Math.random() * totalClicks * 0.5) + 1
		};
	}).sort((a, b) => b.count - a.count);

	// Генерация данных по устройствам
	const devices = ['Desktop', 'Mobile', 'Tablet'];
	const clicksByDevice = devices.map(device => {
		return {
			device,
			count: Math.floor(Math.random() * totalClicks * 0.6) + 1
		};
	}).sort((a, b) => b.count - a.count);

	// Генерация данных по браузерам
	const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];
	const clicksByBrowser = browsers.map(browser => {
		return {
			browser,
			count: Math.floor(Math.random() * totalClicks * 0.4) + 1
		};
	}).sort((a, b) => b.count - a.count);

	// Генерация данных по датам (за последние 14 дней)
	const clicksByDate = [];
	for (let i = 13; i >= 0; i--) {
		const date = new Date();
		date.setDate(date.getDate() - i);
		clicksByDate.push({
			date: date.toISOString().split('T')[0],
			count: Math.floor(Math.random() * totalClicks * 0.2)
		});
	}

	// Генерация данных по часам
	const clicksByHour = [];
	for (let i = 0; i < 24; i++) {
		clicksByHour.push({
			hour: i,
			count: Math.floor(Math.random() * totalClicks * 0.1)
		});
	}

	// Генерация данных по реферерам
	const referrers = ['Google', 'Facebook', 'Twitter', 'Instagram', 'Direct', 'LinkedIn', 'Email'];
	const clicksByReferrer = referrers.map(referrer => {
		return {
			referrer,
			count: Math.floor(Math.random() * totalClicks * 0.3) + 1
		};
	}).sort((a, b) => b.count - a.count);

	return {
		totalClicks,
		uniqueClicks,
		clicksByCountry,
		clicksByDevice,
		clicksByBrowser,
		clicksByDate,
		clicksByHour,
		clicksByReferrer
	};
};

// Данные для графиков
const dailyChartData = computed(() => {
	return {
		labels: analytics.value.clicksByDate.map(item => {
			const date = new Date(item.date);
			return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
		}),
		datasets: [
			{
				label: 'Clicks',
				data: analytics.value.clicksByDate.map(item => item.count),
				borderColor: 'rgba(99, 102, 241, 1)',
				backgroundColor: 'rgba(99, 102, 241, 0.1)',
				borderWidth: 2,
				fill: true,
				tension: 0.3
			}
		]
	};
});

const deviceChartData = computed(() => {
	return {
		labels: analytics.value.clicksByDevice.map(item => item.device),
		datasets: [
			{
				data: analytics.value.clicksByDevice.map(item => item.count),
				backgroundColor: [
					'rgba(99, 102, 241, 0.8)',
					'rgba(16, 185, 129, 0.8)',
					'rgba(245, 158, 11, 0.8)'
				],
				borderWidth: 0
			}
		]
	};
});

const browserChartData = computed(() => {
	return {
		labels: analytics.value.clicksByBrowser.map(item => item.browser),
		datasets: [
			{
				data: analytics.value.clicksByBrowser.map(item => item.count),
				backgroundColor: [
					'rgba(99, 102, 241, 0.8)',
					'rgba(245, 158, 11, 0.8)',
					'rgba(16, 185, 129, 0.8)',
					'rgba(239, 68, 68, 0.8)',
					'rgba(139, 92, 246, 0.8)'
				],
				borderWidth: 0
			}
		]
	};
});

const hourlyChartData = computed(() => {
	return {
		labels: analytics.value.clicksByHour.map(item => `${item.hour}:00`),
		datasets: [
			{
				label: 'Clicks',
				data: analytics.value.clicksByHour.map(item => item.count),
				backgroundColor: 'rgba(99, 102, 241, 0.6)',
				borderWidth: 0,
				borderRadius: 4
			}
		]
	};
});

// Опции для графиков
const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false
		},
		tooltip: {
			mode: 'index',
			intersect: false,
			backgroundColor: 'rgba(17, 24, 39, 0.9)',
			titleColor: 'rgba(255, 255, 255, 1)',
			bodyColor: 'rgba(255, 255, 255, 0.8)',
			padding: 10,
			cornerRadius: 8,
			displayColors: false
		}
	},
	scales: {
		x: {
			grid: {
				display: false
			}
		},
		y: {
			beginAtZero: true,
			grid: {
				color: 'rgba(243, 244, 246, 0.1)'
			},
			ticks: {
				precision: 0
			}
		}
	},
	interaction: {
		mode: 'index',
		intersect: false
	}
};

const barChartOptions = {
	...chartOptions,
	scales: {
		...chartOptions.scales,
		x: {
			...chartOptions.scales.x,
			ticks: {
				maxRotation: 90,
				minRotation: 45
			}
		}
	}
};

const pieChartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false
		},
		tooltip: {
			backgroundColor: 'rgba(17, 24, 39, 0.9)',
			titleColor: 'rgba(255, 255, 255, 1)',
			bodyColor: 'rgba(255, 255, 255, 0.8)',
			padding: 10,
			cornerRadius: 8,
			displayColors: true,
			callbacks: {
				label: function (context: any) {
					const label = context.label || '';
					const value = context.raw || 0;
					const total = context.dataset.data.reduce((acc: any, val: any) => acc + val, 0);
					const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
					return `${label}: ${value} (${percentage}%)`;
				}
			}
		}
	},
	cutout: '60%'
};

// Хелперы для работы с URL
const extractDomain = (url: string | undefined): string => {
	if (url) {
		try {
			const urlObj = new URL(url);
			return urlObj.hostname;
		} catch (e) {
			// Handle invalid URLs
			return url.split('/')[0];
		}
	}

	return '';
};

const truncateUrl = (url: string | undefined, maxLength = 50): string => {
	if (url) {
		if (url.length <= maxLength) return url;
		return url.substring(0, maxLength) + '...';
	}

	return '';
};

// Копирование короткой ссылки
const copyShortUrl = () => {
	if (props.link) {
		navigator.clipboard.writeText(props.link?.shortUrl)
			.then(() => {
				toastStore.success('Link copied to clipboard');
				isCopied.value = true;
				setTimeout(() => {
					isCopied.value = false;
				}, 2000);
			})
			.catch(() => {
				toastStore.error('Failed to copy link');
			});
	}
};

// Закрытие модального окна
const closeModal = () => {
	emit('close');
};

// Получение кода страны для флага
const getCountryCode = (countryName: string): string => {
	const countryCodes: { [key: string]: string } = {
		'United States': 'US',
		'United Kingdom': 'GB',
		'Germany': 'DE',
		'France': 'FR',
		'India': 'IN',
		'Canada': 'CA',
		'Australia': 'AU',
		'Japan': 'JP',
		'Brazil': 'BR',
		'Russia': 'RU',
		'China': 'CN',
		'Spain': 'ES',
		'Italy': 'IT',
		'Netherlands': 'NL',
		'Sweden': 'SE'
	};

	return countryCodes[countryName] || 'US';
};

// Генерация QR-кода
const generateQRCode = () => {
	showQRCode.value = true;
};

// Экспорт данных
const exportData = () => {
	// Формируем данные для экспорта
	const data = {
		linkInfo: {
			title: props.link?.title,
			originalUrl: props.link?.originalUrl,
			shortUrl: props.link?.shortUrl,
			createdAt: props.link?.createdAt
		},
		stats: {
			totalClicks: analytics.value.totalClicks,
			uniqueClicks: analytics.value.uniqueClicks,
			clicksByCountry: analytics.value.clicksByCountry,
			clicksByDevice: analytics.value.clicksByDevice,
			clicksByBrowser: analytics.value.clicksByBrowser,
			clicksByDate: analytics.value.clicksByDate,
			clicksByReferrer: analytics.value.clicksByReferrer
		}
	};

	// Преобразуем данные в JSON-строку
	const jsonData = JSON.stringify(data, null, 2);

	// Создаем Blob из данных
	const blob = new Blob([jsonData], { type: 'application/json' });

	// Создаем URL для Blob и скачиваем файл
	const url = window.URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `${props.link?.id || 'link'}_stats.json`);
	document.body.appendChild(link);
	link.click();

	// Освобождаем ресурсы
	window.URL.revokeObjectURL(url);
	link.remove();

	toastStore.success('Statistics exported successfully');
};

// Генерация отчета
const generateReport = () => {
	// Реализация функции генерации отчета
	toastStore.success('Report generation functionality not implemented yet');
};

// Получение класса для отображения тренда
const getClickTrendClass = (clickTrend: number | undefined): string => {
	if (clickTrend && clickTrend > 0) {
		return 'text-green-600';
	} else if (clickTrend && clickTrend < 0) {
		return 'text-red-600';
	} else {
		return 'text-slate-500';
	}
};

// Форматирование числа
const formatNumber = (value: number): string => {
	return value.toLocaleString();
};

// Форматирование даты
const formatDate = (date: string | undefined): string => {
	if (date) {
		const formattedDate = new Date(date).toLocaleDateString('en-US');
		return formattedDate;
	}
	return 'N/A';
};

// Функция для получения класса цвета для стран
const getLocationColorClass = (index: number) => {
	const colors = [
		'bg-indigo-500 dark:bg-indigo-400',
		'bg-blue-500 dark:bg-blue-400',
		'bg-emerald-500 dark:bg-emerald-400',
		'bg-orange-500 dark:bg-orange-400',
		'bg-purple-500 dark:bg-purple-400',
		'bg-rose-500 dark:bg-rose-400',
	];

	return colors[index % colors.length];
};

// Функция для получения класса цвета для рефереров
const getReferrerColorClass = (index: number) => {
	const colors = [
		'bg-indigo-500 dark:bg-indigo-400',
		'bg-emerald-500 dark:bg-emerald-400',
		'bg-blue-500 dark:bg-blue-400',
		'bg-purple-500 dark:bg-purple-400',
		'bg-orange-500 dark:bg-orange-400',
		'bg-rose-500 dark:bg-rose-400',
	];

	return colors[index % colors.length];
};
</script>

<style scoped>
.glass-card {
	@apply bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 backdrop-blur-md;
}

.glass-card-border {
	@apply border border-slate-200 dark:border-slate-700;
}

.progress-bar {
	transition: width 1s ease-in-out;
	background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
	background-size: 1rem 1rem;
	animation: progress-bar-stripes 1s linear infinite;
}

@keyframes progress-bar-stripes {
	from {
		background-position: 1rem 0;
	}

	to {
		background-position: 0 0;
	}
}

/* Стили для всплывающих подсказок */
[data-tooltip] {
	position: relative;
}

[data-tooltip]::after {
	content: attr(data-tooltip);
	position: absolute;
	bottom: -35px;
	left: 50%;
	transform: translateX(-50%);
	padding: 6px 10px;
	background-color: rgba(0, 0, 0, 0.8);
	color: white;
	border-radius: 6px;
	font-size: 14px;
	white-space: nowrap;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.15s, visibility 0.15s;
	z-index: 100;
}

[data-tooltip]:hover::after {
	opacity: 1;
	visibility: visible;
	transition-delay: 0.1s;
}

[data-tooltip-position="left"]::after {
	left: auto;
	right: 0;
	transform: translateX(0);
}

[data-tooltip-position="right"]::after {
	left: 100%;
	transform: translateX(0);
}

[data-tooltip-position="top"]::after {
	bottom: auto;
	top: -35px;
}
</style>