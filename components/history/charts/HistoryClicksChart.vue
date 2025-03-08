<template>
    <div class="relative h-full">
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
            <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
        </div>
        <canvas ref="chartCanvas" class="h-full w-full"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps<{
    data: Array<any>,
    period: string
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const isLoading = ref(true);
let chart: Chart | null = null;

// Создаем график
const createChart = () => {
    if (!chartCanvas.value) return;

    const ctx = chartCanvas.value.getContext('2d');
    if (!ctx) return;

    isLoading.value = true;

    // Форматирование данных в зависимости от периода
    const labels = [];
    const values = [];

    if (props.period === 'day') {
        for (const entry of props.data) {
            labels.push(entry.time);
            values.push(entry.clicks);
        }
    } else if (props.period === 'week' || props.period === 'month') {
        for (const entry of props.data) {
            // Форматируем дату
            const date = new Date(entry.date);
            const formattedDate = date.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short'
            });
            labels.push(formattedDate);
            values.push(entry.clicks);
        }
    } else if (props.period === 'year') {
        for (const entry of props.data) {
            labels.push(entry.month);
            values.push(entry.clicks);
        }
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Клики',
                data: values,
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
                borderColor: 'rgb(99, 102, 241)',
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: 'rgba(79, 70, 229, 0.7)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    bodyFont: {
                        size: 13
                    },
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 10,
                    cornerRadius: 6,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgb(107, 114, 128)'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(107, 114, 128, 0.1)'
                    },
                    ticks: {
                        color: 'rgb(107, 114, 128)',
                        precision: 0
                    }
                }
            }
        }
    });

    isLoading.value = false;
};

// Обновляем график при изменении данных или периода
watch(() => [props.data, props.period], () => {
    if (chart) {
        chart.destroy();
    }

    createChart();
}, { deep: true });

// Инициализация при монтировании
onMounted(() => {
    createChart();
});

// Уничтожаем график перед размонтированием
onBeforeUnmount(() => {
    if (chart) {
        chart.destroy();
    }
});
</script>