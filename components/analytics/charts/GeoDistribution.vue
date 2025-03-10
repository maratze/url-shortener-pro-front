<template>
    <div>
        <div class="space-y-2.5">
            <div v-for="(item, index) in data" :key="index"
                class="flex items-center py-2 px-3 rounded-md transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                <div class="w-6 flex-shrink-0 flex justify-center">
                    <!-- Показываем флаг для стран или иконку для Geography/Others -->
                    <template v-if="item.country === 'Geography' || item.country === 'Others'">
                        <svg v-if="item.country === 'Geography'" class="h-4 w-4 text-indigo-600 dark:text-indigo-400"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else class="h-4 w-4 text-slate-600 dark:text-slate-400"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </template>
                    <img v-else :src="`https://flagcdn.com/20x15/${getCountryCode(item.country).toLowerCase()}.png`"
                        :alt="item.country"
                        class="h-3.5 w-auto rounded-sm shadow-sm" />
                </div>
                <div class="w-24 ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                    {{ item.country }}
                </div>
                <div class="flex-grow ml-3">
                    <div class="bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden shadow-inner">
                        <div class="rounded-full h-2 progress-bar" :class="getColorClass(index)"
                            :style="{ width: `${item.percentage}%` }"></div>
                    </div>
                </div>
                <div class="ml-3 w-20 text-right flex flex-col items-end">
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ formatNumber(item.clicks)
                        }}</span>
                    <span class="text-xs text-slate-500 dark:text-slate-400">{{ item.percentage }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface GeoData {
    country: string;
    clicks: number;
    percentage: number;
}

const props = defineProps<{
    data: GeoData[]
}>();

// Функция для получения класса цвета на основе индекса (для разноцветных полосок)
const getColorClass = (index: number) => {
    const colors = [
        'bg-indigo-500 dark:bg-indigo-400',
        'bg-blue-500 dark:bg-blue-400',
        'bg-emerald-500 dark:bg-emerald-400',
        'bg-orange-500 dark:bg-orange-400',
        'bg-purple-500 dark:bg-purple-400',
        'bg-rose-500 dark:bg-rose-400',
    ];

    return colors[index % colors.length];
};

// Функция для преобразования названия страны в код для получения флага
const getCountryCode = (country: string): string => {
    const countryMap: Record<string, string> = {
        'USA': 'us',
        'Russia': 'ru',
        'Germany': 'de',
        'UK': 'gb',
        'France': 'fr',
        'China': 'cn',
        'Japan': 'jp',
        'India': 'in',
        'Brazil': 'br',
        'Canada': 'ca',
        'Australia': 'au',
        'Italy': 'it',
        'Spain': 'es',
        'Others': 'xx' // Используем заглушку для "Others"
    };

    return countryMap[country] || 'xx';
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