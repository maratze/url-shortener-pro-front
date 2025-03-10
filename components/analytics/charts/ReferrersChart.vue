<template>
    <div>
        <div class="space-y-2.5">
            <div v-for="(source, index) in data" :key="index"
                class="flex items-center py-2 px-3 rounded-md transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                <div class="w-6 flex-shrink-0 flex justify-center">
                    <!-- Иконки для разных источников -->
                    <svg v-if="source.source === 'Direct'" class="h-4 w-4 text-blue-600 dark:text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <svg v-else-if="source.source === 'Social Media'"
                        class="h-4 w-4 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <svg v-else-if="source.source === 'Email'" class="h-4 w-4 text-green-600 dark:text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <svg v-else-if="source.source === 'Search'" class="h-4 w-4 text-orange-600 dark:text-orange-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <svg v-else class="h-4 w-4 text-slate-600 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                </div>
                <div class="w-28 ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                    {{ source.source }}
                </div>
                <div class="flex-grow ml-3">
                    <div class="bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden shadow-inner">
                        <div
                            class="rounded-full h-2 progress-bar"
                            :class="getProgressColorClass(source.source)"
                            :style="{ width: `${source.percentage}%` }"></div>
                    </div>
                </div>
                <div class="ml-3 w-20 text-right flex flex-col items-end">
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ formatNumber(source.count)
                    }}</span>
                    <span class="text-xs text-slate-500 dark:text-slate-400">{{ source.percentage }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface ReferrerData {
    source: string;
    count: number;
    percentage: number;
}

const props = defineProps<{
    data: ReferrerData[]
}>();

// Функция для получения класса цвета прогресс-бара
const getProgressColorClass = (source: string): string => {
    switch (source) {
        case 'Direct':
            return 'bg-blue-500 dark:bg-blue-400';
        case 'Social Media':
            return 'bg-purple-500 dark:bg-purple-400';
        case 'Email':
            return 'bg-green-500 dark:bg-green-400';
        case 'Search':
            return 'bg-orange-500 dark:bg-orange-400';
        default:
            return 'bg-slate-500 dark:bg-slate-400';
    }
};

// Форматирование чисел (разделение разрядов)
const formatNumber = (value: number): string => {
    return new Intl.NumberFormat().format(value);
};
</script>

<style scoped>
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
</style>