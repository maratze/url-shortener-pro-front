<template>
	<div
		class="glass-card p-5 shadow-sm relative overflow-hidden flex flex-col transition-all duration-200"
		:class="{
			'bg-indigo-50/30 dark:bg-indigo-900/10': color === 'indigo',
			'bg-green-50/30 dark:bg-green-900/10': color === 'green',
			'bg-blue-50/30 dark:bg-blue-900/10': color === 'blue',
			'bg-purple-50/30 dark:bg-purple-900/10': color === 'purple'
		}">

		<div class="flex items-center gap-2 mb-2">
			<div class="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center">
				<slot name="icon"></slot>
			</div>
			<h3 class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ title }}</h3>
		</div>

		<div class="flex items-baseline h-10">
			<template 
				v-if="loading"
			>
				<Preloader
					:active="true"
					type="skeleton"
					skeleton-width="80px"
					skeleton-height="2rem"
					:spinner-base-color="color" />
			</template>
			<template v-else>
				<span class="text-3xl font-bold text-slate-800 dark:text-white">{{ formattedValue }}</span>
				<span v-if="unit" class="ml-1 text-sm text-slate-500 dark:text-slate-400">{{ unit }}</span>
			</template>
		</div>

		<div v-if="trend !== undefined" class="text-sm mt-2 flex items-center h-5">
			<template 
				v-if="loading"
			>
				<Preloader
					:active="true"
					type="skeleton"
					skeleton-width="60px"
					skeleton-height="1rem"
					:spinner-base-color="color" />
			</template>
			<template v-else>
				<span
					:class="{
						'text-green-600 dark:text-green-400': trend > 0,
						'text-red-600 dark:text-red-400': trend < 0,
						'text-slate-500 dark:text-slate-400': trend === 0
					}"
					class="flex items-center font-medium">
					<svg v-if="trend > 0" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
					</svg>
					<svg v-else-if="trend < 0" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
					</svg>
					<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
					</svg>
					{{ trend > 0 ? '+' : '' }}{{ trend }}%
				</span>
				<span class="text-slate-500 dark:text-slate-400 ml-1">vs previous period</span>
			</template>
		</div>
		
		<div v-if="sparklineData && sparklineData.length" class="flex items-start mt-4 h-8">
			<template 
				v-if="loading"
			>
				<Preloader
					:active="true"
					type="skeleton"
					skeleton-width="150px"
					skeleton-height="2rem"
					:spinner-base-color="color"/>
			</template>
			<template v-else>
				<SparklineChart
					:data="sparklineData"
					:color="getSparklineColor()"
					:line-width="1.5"
					:fill-opacity="0.2" />
			</template>
		</div>

		<p v-if="description" class="text-xs text-slate-500 dark:text-slate-400 mt-2">{{ description }}</p>
	</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import SparklineChart from './charts/SparklineChart.vue';
import Preloader from '~/components/common/Preloader.vue';

interface Props {
	title: string;
	value: string | number;
	subtitle?: string;
	color?: 'indigo' | 'green' | 'blue' | 'purple';
	trend?: number;
	sparklineData?: number[];
	description?: string;
	unit?: string;
	loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	color: 'indigo',
	subtitle: undefined,
	trend: undefined,
	sparklineData: undefined,
	description: undefined,
	unit: undefined,
	loading: false
});

const formattedValue = computed(() => {
	if (typeof props.value === 'number') {
		return new Intl.NumberFormat('fr-CH', { useGrouping: true }).format(props.value);
	}
	return props.value;
});

const getSparklineColor = () => {
	const colors = {
		indigo: '#6366F1',
		green: '#10B981',
		blue: '#3B82F6',
		purple: '#8B5CF6'
	};
	return colors[props.color];
};
</script>

<style scoped>
.glass-card {
	backdrop-filter: blur(8px);
	border: 1px solid var(--card-border);
}

.dark .glass-card {
	border-color: rgba(255, 255, 255, 0.05);
}
</style>