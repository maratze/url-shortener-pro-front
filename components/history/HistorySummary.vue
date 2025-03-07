<template>
	<div class="mb-8">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<!-- Статистика по общему количеству ссылок -->
			<div class="glass-card p-6 flex flex-col">
				<div class="flex items-center mb-1">
					<div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-3">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
						</svg>
					</div>
					<h3 class="text-sm font-medium text-slate-600 dark:text-slate-400">Total Links</h3>
				</div>
				<div class="flex items-baseline mt-2">
					<span class="text-3xl font-bold text-slate-800 dark:text-white">{{ summaryData.totalLinks }}</span>
					<span class="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">links</span>
				</div>
			</div>

			<!-- Статистика по общему количеству кликов -->
			<div class="glass-card p-6 flex flex-col">
				<div class="flex items-center mb-1">
					<div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
						</svg>
					</div>
					<h3 class="text-sm font-medium text-slate-600 dark:text-slate-400">Total Clicks</h3>
				</div>
				<div class="flex items-baseline mt-2">
					<span class="text-3xl font-bold text-slate-800 dark:text-white">{{ summaryData.totalClicks }}</span>
					<span class="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">visits</span>
				</div>
			</div>

			<!-- Статистика по среднему CTR -->
			<div class="glass-card p-6 flex flex-col">
				<div class="flex items-center mb-1">
					<div class="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg mr-3">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
					</div>
					<h3 class="text-sm font-medium text-slate-600 dark:text-slate-400">Average CTR</h3>
				</div>
				<div class="flex items-baseline mt-2">
					<span class="text-3xl font-bold text-slate-800 dark:text-white">{{ summaryData.averageCTR || 0 }}</span>
					<span class="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">per link</span>
				</div>
			</div>

			<!-- Статистика по активным ссылкам -->
			<div class="glass-card p-6 flex flex-col">
				<div class="flex items-center mb-1">
					<div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 class="text-sm font-medium text-slate-600 dark:text-slate-400">Active Links</h3>
				</div>
				<div class="flex items-baseline mt-2">
					<span class="text-3xl font-bold text-slate-800 dark:text-white">{{ summaryData.activeLinks }}</span>
					<span class="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            of {{ summaryData.totalLinks }}
          </span>
				</div>
			</div>
		</div>

		<!-- График активности -->
		<div class="mt-6 glass-card p-6">
			<h3 class="text-md font-medium text-slate-800 dark:text-white mb-4">Weekly Clicks Activity</h3>
			<div class="h-48 w-full">
				<bar-chart v-if="summaryData.weeklyClicksData.length" :chart-data="chartData" :options="chartOptions" />
				<div v-else class="h-full w-full flex items-center justify-center">
					<p class="text-slate-500 dark:text-slate-400 text-sm">No click data available</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// Define prop interface
interface SummaryData {
	totalLinks: number;
	totalClicks: number;
	averageCTR: number;
	activeLinks: number;
	weeklyClicksData: Array<{day: string, clicks: number}>;
}

const props = defineProps<{
	summaryData: SummaryData;
}>();

// Prepare data for chart
const chartData = computed(() => {
	return {
		labels: props.summaryData.weeklyClicksData.map(item => item.day),
		datasets: [
			{
				label: 'Clicks',
				data: props.summaryData.weeklyClicksData.map(item => item.clicks),
				backgroundColor: 'rgba(99, 102, 241, 0.6)',
				borderColor: 'rgba(99, 102, 241, 1)',
				borderWidth: 1,
				borderRadius: 4,
				hoverBackgroundColor: 'rgba(99, 102, 241, 0.8)',
			}
		]
	};
});

// Chart options
const chartOptions = ref({
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			backgroundColor: 'rgba(17, 24, 39, 0.9)',
			titleColor: 'rgba(255, 255, 255, 1)',
			bodyColor: 'rgba(255, 255, 255, 0.8)',
			padding: 10,
			cornerRadius: 8,
			displayColors: false,
			callbacks: {
				title: function(tooltipItems: any) {
					return tooltipItems[0].label;
				},
				label: function(context: any) {
					return `${context.parsed.y} clicks`;
				}
			}
		},
	},
	scales: {
		x: {
			grid: {
				display: false,
			},
			ticks: {
				font: {
					size: 11,
				},
				color: 'rgba(107, 114, 128, 0.8)',
			}
		},
		y: {
			beginAtZero: true,
			grid: {
				color: 'rgba(243, 244, 246, 0.1)',
			},
			ticks: {
				precision: 0,
				font: {
					size: 11,
				},
				color: 'rgba(107, 114, 128, 0.8)',
			}
		}
	},
	animation: {
		duration: 1000,
	}
});

// Dark mode adjustments for chart
onMounted(() => {
	const isDark = document.documentElement.classList.contains('dark');

	if (isDark) {
		chartOptions.value.scales.x.ticks.color = 'rgba(156, 163, 175, 0.8)';
		chartOptions.value.scales.y.ticks.color = 'rgba(156, 163, 175, 0.8)';
		chartOptions.value.scales.y.grid.color = 'rgba(55, 65, 81, 0.1)';
	}

	// Watch for theme changes
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.attributeName === 'class') {
				const isDarkNow = document.documentElement.classList.contains('dark');

				if (isDarkNow) {
					chartOptions.value.scales.x.ticks.color = 'rgba(156, 163, 175, 0.8)';
					chartOptions.value.scales.y.ticks.color = 'rgba(156, 163, 175, 0.8)';
					chartOptions.value.scales.y.grid.color = 'rgba(55, 65, 81, 0.1)';
				} else {
					chartOptions.value.scales.x.ticks.color = 'rgba(107, 114, 128, 0.8)';
					chartOptions.value.scales.y.ticks.color = 'rgba(107, 114, 128, 0.8)';
					chartOptions.value.scales.y.grid.color = 'rgba(243, 244, 246, 0.1)';
				}
			}
		});
	});

	observer.observe(document.documentElement, { attributes: true });
});
</script>

<style scoped>
.glass-card {
	@apply bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 backdrop-blur-md;
}
</style>