<template>
    <div class="h-full">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
                v-for="(device, index) in data"
                :key="index"
                class="flex flex-col items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                <div class="mb-2">
                    <div v-if="device.type === 'Desktop'" class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div v-else-if="device.type === 'Mobile'"
                        class="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <svg class="h-6 w-6 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div v-else-if="device.type === 'Tablet'"
                        class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        <svg class="h-6 w-6 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div v-else class="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                        <svg class="h-6 w-6 text-orange-600 dark:text-orange-400" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
                <div class="font-medium text-slate-800 dark:text-white">{{ device.type }}</div>
                <div class="text-2xl font-bold text-slate-900 dark:text-white mt-1">{{ device.count }}</div>
                <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ device.percentage }}% от общего</div>
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
</script>