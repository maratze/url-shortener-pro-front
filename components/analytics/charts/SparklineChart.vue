<template>
    <div ref="chartContainer" class="sparkline-chart w-full h-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';

interface Props {
    data: number[];
    color?: string;
    lineWidth?: number;
    fillOpacity?: number;
}

const props = withDefaults(defineProps<Props>(), {
    color: '#3B82F6',
    lineWidth: 1.5,
    fillOpacity: 0.2
});

const chartContainer = ref<HTMLElement | null>(null);

// Функция отрисовки графика
const drawChart = () => {
    if (!chartContainer.value || props.data.length < 2) return;

    // Очищаем контейнер перед отрисовкой
    chartContainer.value.innerHTML = '';

    const container = chartContainer.value;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Находим минимальное и максимальное значения для маштабирования
    const minValue = Math.min(...props.data);
    const maxValue = Math.max(...props.data);
    const valueRange = maxValue - minValue;

    // Создаем SVG элемент
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('preserveAspectRatio', 'none');

    // Вычисляем точки для линии
    const points = props.data.map((value, index) => {
        const x = (index / (props.data.length - 1)) * width;
        const normalizedValue = valueRange === 0
            ? height / 2
            : height - ((value - minValue) / valueRange) * height;
        return `${x},${normalizedValue}`;
    }).join(' ');

    // Создаем линию
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', points);
    polyline.setAttribute('fill', 'none');
    polyline.setAttribute('stroke', props.color);
    polyline.setAttribute('stroke-width', props.lineWidth.toString());
    polyline.setAttribute('stroke-linecap', 'round');
    polyline.setAttribute('stroke-linejoin', 'round');

    // Добавляем линию в SVG
    svg.appendChild(polyline);

    // Если нужно, добавляем заливку под линией
    if (props.fillOpacity > 0) {
        const areaPoints = points + ` ${width},${height} 0,${height}`;
        const area = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        area.setAttribute('points', areaPoints);
        area.setAttribute('fill', props.color);
        area.setAttribute('fill-opacity', props.fillOpacity.toString());

        // Вставляем область заполнения перед линией, чтобы линия была поверх
        svg.insertBefore(area, polyline);
    }

    // Добавляем SVG в контейнер
    container.appendChild(svg);
};

// Вызываем отрисовку при монтировании компонента
onMounted(() => {
    drawChart();

    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', drawChart);
});

// Перерисовываем при изменении данных или параметров
watch(() => [props.data, props.color, props.lineWidth, props.fillOpacity], drawChart);

// Удаляем слушатель при размонтировании компонента
onUnmounted(() => {
    window.removeEventListener('resize', drawChart);
});
</script>

<style scoped>
.sparkline-chart {
    min-height: 20px;
}
</style>