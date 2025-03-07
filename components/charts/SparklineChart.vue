<template>
	<canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';
import type { ChartConfiguration, ChartDataset } from 'chart.js';

// Define explicit type for color keys
type ColorKey = 'indigo' | 'green' | 'red' | 'slate';

// Define interface for data point
interface SparklineDataPoint {
	value: number;
}

const props = defineProps({
	chartData: {
		type: Array as () => number[],
		required: true
	},
	color: {
		type: String as () => ColorKey,
		default: 'indigo'
	}
});

const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

// Type-safe color map with index signature
const colorMap: Record<ColorKey, { line: string; fill: string }> = {
	indigo: {
		line: 'rgba(99, 102, 241, 1)',
		fill: 'rgba(99, 102, 241, 0.2)'
	},
	green: {
		line: 'rgba(16, 185, 129, 1)',
		fill: 'rgba(16, 185, 129, 0.2)'
	},
	red: {
		line: 'rgba(239, 68, 68, 1)',
		fill: 'rgba(239, 68, 68, 0.2)'
	},
	slate: {
		line: 'rgba(148, 163, 184, 1)',
		fill: 'rgba(148, 163, 184, 0.2)'
	}
};

const createChart = () => {
	if (!canvas.value) return;

	// Get colors with type safety
	const colorKey = (props.color in colorMap) ? props.color as ColorKey : 'indigo';
	const colors = colorMap[colorKey];

	// Prepare data in the format Chart.js expects
	const data = props.chartData.map(value => value);

	// Create chart with proper typings
	const config: ChartConfiguration<'line'> = {
		type: 'line',
		data: {
			labels: new Array(props.chartData.length).fill(''),
			datasets: [{
				data: data,
				borderColor: colors.line,
				backgroundColor: colors.fill,
				borderWidth: 2,
				pointRadius: 0,
				pointHoverRadius: 0,
				fill: true,
				tension: 0.4,
			} as ChartDataset<'line'>]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					enabled: false
				}
			},
			scales: {
				x: {
					display: false
				},
				y: {
					display: false,
					beginAtZero: false
				}
			},
			elements: {
				line: {
					tension: 0.4
				}
			},
			animation: false
		}
	};

	chart = new Chart(canvas.value.getContext('2d')!, config);
};

watch(() => props.chartData, () => {
	if (chart && chart.data && chart.data.datasets && chart.data.datasets[0]) {
		chart.data.datasets[0].data = [...props.chartData];
		chart.update();
	}
}, { deep: true });

watch(() => props.color, () => {
	if (!chart || !chart.data || !chart.data.datasets || !chart.data.datasets[0]) return;

	const colorKey = (props.color in colorMap) ? props.color as ColorKey : 'indigo';
	const colors = colorMap[colorKey];

	chart.data.datasets[0].borderColor = colors.line;
	chart.data.datasets[0].backgroundColor = colors.fill;
	chart.update();
});

onMounted(() => {
	createChart();
});
</script>