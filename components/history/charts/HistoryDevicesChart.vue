<template>
    <div>
        <div class="space-y-2.5">
            <div v-for="(device, index) in data" :key="index"
                class="flex items-center py-2 px-3 rounded-md transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                <div class="w-6 flex-shrink-0 flex justify-center">
                    <!-- Иконки для разных типов устройств -->
                    <svg v-if="device.type === 'Desktop'" class="h-4 w-4 text-blue-600 dark:text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <svg v-else-if="device.type === 'Mobile'" class="h-4 w-4 text-green-600 dark:text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <svg v-else-if="device.type === 'Tablet'" class="h-4 w-4 text-purple-600 dark:text-purple-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <svg v-else class="h-4 w-4 text-orange-600 dark:text-orange-400" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <div class="w-24 ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                    {{ device.type }}
                </div>
                <div class="flex-grow ml-3">
                    <div class="bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden shadow-inner">
                        <div
                            class="rounded-full h-2 progress-bar"
                            :class="getProgressClass(device.type)"
                            :style="{ width: `${device.percentage}%` }"></div>
                    </div>
                </div>
                <div class="ml-3 w-20 text-right flex flex-col items-end">
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ formatNumber(device.count)
                    }}</span>
                    <span class="text-xs text-slate-500 dark:text-slate-400">{{ device.percentage }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface DeviceData {
    type: string;
    count: number;
    percentage: number;
}

const props = defineProps<{
    data: DeviceData[]
}>();

// Определяем классы для прогресс-баров
const getProgressClass = (deviceType: string): string => {
    switch (deviceType) {
        case 'Desktop':
            return 'bg-blue-500 dark:bg-blue-400';
        case 'Mobile':
            return 'bg-green-500 dark:bg-green-400';
        case 'Tablet':
            return 'bg-purple-500 dark:bg-purple-400';
        default:
            return 'bg-orange-500 dark:bg-orange-400';
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