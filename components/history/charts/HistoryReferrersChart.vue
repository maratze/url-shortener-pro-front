<template>
    <div>
        <div class="space-y-3">
            <div v-for="(source, index) in data" :key="index" class="flex flex-col">
                <div class="flex justify-between items-center mb-1">
                    <div class="flex items-center">
                        <div
                            :class="[
                                'w-3 h-3 rounded-full mr-2',
                                getColorClass(index)
                            ]"></div>
                        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ source.source }}</span>
                    </div>
                    <span class="text-sm text-slate-600 dark:text-slate-400">{{ source.count }} ({{ source.percentage
                        }}%)</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                        class="h-2 rounded-full"
                        :class="getColorClass(index)"
                        :style="{ width: `${source.percentage}%` }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface ReferrerData {
    source: string;
    count: number;
    percentage: number;
}

const props = defineProps<{
    data: ReferrerData[]
}>();

// Функция для получения класса цвета на основе индекса
const getColorClass = (index: number) => {
    const colors = [
        'bg-indigo-500 dark:bg-indigo-600',
        'bg-blue-500 dark:bg-blue-600',
        'bg-emerald-500 dark:bg-emerald-600',
        'bg-orange-500 dark:bg-orange-600',
        'bg-purple-500 dark:bg-purple-600',
        'bg-rose-500 dark:bg-rose-600',
    ];

    return colors[index % colors.length];
};
</script>