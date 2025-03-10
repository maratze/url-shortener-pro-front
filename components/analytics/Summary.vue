<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
		<SummaryCard
			title="Total Links"
			color="indigo"
			:value="summary.totalLinks"
			:trend="summary.linksTrend"
			:sparkline-data="summary.linksSparkline">
			<template #icon>
				<svg class="h-4 w-4 mr-1 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
				</svg>
				Created over all time
			</template>
		</SummaryCard>

		<SummaryCard
			title="Total Clicks"
			color="green"
			:value="summary.totalClicks"
			:trend="summary.clicksTrend"
			:sparkline-data="summary.clicksSparkline">
			<template #icon>
				<svg class="h-4 w-4 mr-1 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
				</svg>
				Across all links
			</template>
		</SummaryCard>

		<SummaryCard
			title="Average CTR"
			color="blue"
			:value="`${summary.averageCtr}%`"
			:trend="summary.ctrTrend"
			:sparkline-data="summary.ctrSparkline">
			<template #icon>
				<svg class="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
				</svg>
				Click-through rate
			</template>
		</SummaryCard>

		<SummaryCard
			title="Active Links"
			color="purple"
			:value="summary.activeLinks"
			:subtitle="`${summary.activeLinksPercentage}% of total`" 
			:trend="summary.activeLinksTrend"
			:sparkline-data="summary.activeLinksSparkline">
			<template #icon>
				<svg class="h-4 w-4 mr-1 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				Ready to receive traffic
			</template>
		</SummaryCard>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { SummaryData } from '~/types/link';
import SummaryCard from './SummaryCard.vue';

defineProps<{
	summary: SummaryData;
}>();
</script>

<style scoped>
.glass-card {
	@apply bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 backdrop-blur-md;
}
</style>