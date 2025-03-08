<template>
    <div>
        <div class="space-y-2">
            <div v-for="(item, index) in data" :key="index" class="flex items-center">
                <div class="w-32 text-sm text-slate-700 dark:text-slate-300 truncate">{{ item.country }}</div>
                <div class="flex-grow ml-2">
                    <div class="bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                        <div
                            class="bg-indigo-600 dark:bg-indigo-500 rounded-full h-2.5"
                            :style="{ width: `${item.percentage}%` }"></div>
                    </div>
                </div>
                <div class="ml-3 w-20 text-right text-sm text-slate-600 dark:text-slate-400">
                    {{ item.clicks }}
                    <span class="text-xs text-slate-500 dark:text-slate-500">({{ item.percentage }}%)</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface GeoData {
    country: string;
    clicks: number;
    percentage: number;
}

const props = defineProps<{
    data: GeoData[]
}>();
</script>