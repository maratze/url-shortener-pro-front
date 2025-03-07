<template>
	<div class="relative h-full w-full">
		<canvas ref="chartCanvas" class="h-full w-full"></canvas>

		<!-- Date range controls -->
		<div class="absolute top-0 right-0 flex space-x-1">
			<button
				v-for="period in periods"
				:key="period.value"
				@click="setPeriod(period.value)"
				:class="[
          'px-2 py-1 text-xs rounded-md transition-colors',
          activePeriod === period.value 
            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
        ]"
			>
				{{ period.label }}
			</button>
		</div>

		<!-- Tooltip information -->
		<div
			v-if="tooltip.show"
			class="absolute pointer-events-none bg-white dark:bg-slate-800 p-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 text-xs"
			:style="{
        left: `${tooltip.x}px`,
        top: `${tooltip.y}px`,
        transform: 'translate(-50%, -110%)'
      }"
		>
			<div class="font-medium text-slate-800 dark:text-white">
				{{ tooltip.date }}
			</div>
			<div class="flex items-center space-x-2 mt-1">
				<div class="h-2 w-2 rounded-full bg-indigo-500"></div>
				<div class="text-slate-600 dark:text-slate-300">
					{{ tooltip.label }}: <span class="font-medium">{{ tooltip.value }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue';
// Import Chart.js with specific types
import Chart from 'chart.js/auto';
import type {
	ChartTypeRegistry,
	ScatterDataPoint,
	ChartDataset,
	TooltipModel,
	Chart as ChartType
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format, subDays } from 'date-fns';

// Define our data structures
interface DataItem {
	[key: string]: any;
}

interface ChartDataPoint {
	x: Date;
	y: number;
}

// Use a more specific type for our chart
type LineChart = ChartType<'line', ChartDataPoint[]>;

const props = defineProps({
	data: {
		type: Array as () => DataItem[],
		required: true
	},
	label: {
		type: String,
		default: 'Clicks'
	},
	dateKey: {
		type: String,
		default: 'date'
	},
	valueKey: {
		type: String,
		default: 'count'
	},
});

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chart: LineChart | null = null;
const activePeriod = ref('7d');

const periods = [
	{ label: '7D', value: '7d' },
	{ label: '30D', value: '30d' },
	{ label: '90D', value: '90d' },
	{ label: 'ALL', value: 'all' },
];

const tooltip = reactive({
	show: false,
	x: 0,
	y: 0,
	date: '',
	label: '',
	value: ''
});

const setPeriod = (period: string) => {
	activePeriod.value = period;
	updateChart();
};

// Filter data by selected period
const filterDataByPeriod = (): DataItem[] => {
	if (activePeriod.value === 'all') {
		return [...props.data];
	}

	const today = new Date();
	let daysToSubtract = 7;

	if (activePeriod.value === '30d') daysToSubtract = 30;
	if (activePeriod.value === '90d') daysToSubtract = 90;

	const startDate = subDays(today, daysToSubtract);

	return props.data.filter(item => {
		const itemDate = new Date(item[props.dateKey]);
		return itemDate >= startDate;
	});
};

// Convert our data to the format Chart.js expects
const prepareChartData = (data: DataItem[]): ChartDataPoint[] => {
	return data.map(item => ({
		x: new Date(item[props.dateKey]),
		y: Number(item[props.valueKey]) || 0
	}));
};

const createChart = () => {
	if (!chartCanvas.value) return;

	const ctx = chartCanvas.value.getContext('2d');
	if (!ctx) return;

	const filteredData = filterDataByPeriod();
	const chartData = prepareChartData(filteredData);

	// Create the chart with specific type annotations
	chart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				label: props.label,
				data: chartData,
				borderColor: 'rgba(99, 102, 241, 1)',
				backgroundColor: 'rgba(99, 102, 241, 0.1)',
				borderWidth: 2,
				fill: true,
				tension: 0.3
			} as ChartDataset<'line', ChartDataPoint[]>]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			interaction: {
				mode: 'index',
				intersect: false,
			},
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					enabled: false,
					external: (context) => {
						// Show custom tooltip on hover
						const tooltipModel = context.tooltip;

						if (tooltipModel.opacity === 0) {
							tooltip.show = false;
							return;
						}

						// Get data with proper type checking
						if (tooltipModel.dataPoints && tooltipModel.dataPoints.length > 0) {
							const dataPoint = tooltipModel.dataPoints[0];

							// Type assertion for the raw data
							const rawData = dataPoint.raw as ChartDataPoint;

							tooltip.show = true;
							tooltip.x = tooltipModel.caretX;
							tooltip.y = tooltipModel.caretY;
							tooltip.date = format(rawData.x, 'MMM d, yyyy');
							tooltip.label = props.label;
							tooltip.value = String(rawData.y);
						}
					}
				}
			},
			scales: {
				x: {
					type: 'time',
					time: {
						unit: 'day',
						tooltipFormat: 'MMM d, yyyy',
						displayFormats: {
							day: 'MMM d'
						}
					},
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
			}
		}
	}) as LineChart;

	// Add hover effect for cursor
	if (chartCanvas.value) {
		chartCanvas.value.onmousemove = (e) => {
			if (!chart) return;

			const elements = chart.getElementsAtEventForMode(
				e,
				'nearest',
				{ intersect: true },
				false
			);

			if (chartCanvas.value) {
				chartCanvas.value.style.cursor = elements?.length ? 'pointer' : 'default';
			}
		};
	}
};

// Update chart data
const updateChart = () => {
	if (!chart || !chart.data.datasets || !chart.data.datasets[0]) return;

	const filteredData = filterDataByPeriod();
	const chartData = prepareChartData(filteredData);

	chart.data.datasets[0].data = chartData;
	chart.update();
};

// Watch for data changes
watch(() => props.data, () => {
	if (chart) {
		updateChart();
	}
}, { deep: true });

// Initialize chart on component mount
onMounted(() => {
	createChart();
});
</script>