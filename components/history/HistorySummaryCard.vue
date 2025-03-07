<template>
	<div class="glass-card p-6 flex flex-col">
		<div class="flex items-center mb-1">
			<div :class="`p-2 bg-${color}-100 dark:bg-${color}-900/30 rounded-lg mr-3`">
				<slot name="icon" />
			</div>
			<h3 class="text-sm font-medium text-slate-600 dark:text-slate-400">{{ title }}</h3>
		</div>
		<div class="flex items-baseline mt-2 mb-1">
			<span class="text-3xl font-bold text-slate-800 dark:text-white">{{ value }}</span>
			<span class="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">{{ unit }}</span>
		</div>
		<div v-if="trend !== null" class="flex items-center mt-1">
      <span
		  :class="`flex items-center text-xs font-medium ${getTrendColor()}`"
	  >
        <svg v-if="trend > 0" class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <svg v-else-if="trend < 0" class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
        </svg>
        <svg v-else class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
        </svg>
        {{ formatTrend(trend) }} {{ trendPeriod }}
      </span>
			<div class="ml-auto">
				<div v-if="sparklineData.length" class="h-8 w-16">
					<sparkline-chart :chart-data="sparklineData" :color="getSparklineColor()" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	title: {
		type: String,
		required: true
	},
	value: {
		type: [Number, String],
		required: true
	},
	unit: {
		type: String,
		default: ''
	},
	trend: {
		type: Number,
		default: null
	},
	trendPeriod: {
		type: String,
		default: 'vs last week'
	},
	color: {
		type: String,
		default: 'indigo'
	},
	sparklineData: {
		type: Array,
		default: () => []
	}
});

const getTrendColor = () => {
	if (props.trend === null) return '';
	if (props.trend > 0) return 'text-green-600 dark:text-green-400';
	if (props.trend < 0) return 'text-red-600 dark:text-red-400';
	return 'text-slate-500 dark:text-slate-400';
};

const getSparklineColor = () => {
	if (props.trend === null) return 'indigo';
	if (props.trend > 0) return 'green';
	if (props.trend < 0) return 'red';
	return 'slate';
};

const formatTrend = (trend: number) => {
	const sign = trend > 0 ? '+' : '';
	return `${sign}${trend}%`;
};
</script>

<style scoped>
.glass-card {
	@apply bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 backdrop-blur-md;
}
</style>