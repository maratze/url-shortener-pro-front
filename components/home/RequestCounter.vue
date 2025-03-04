<template>
	<div class="request-counter">
		<div v-if="loading" class="animate-pulse flex space-x-2">
			<div class="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
		</div>
		<template v-else-if="remainingRequests !== null">
			<div class="flex items-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" :class="limitClass" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
				</svg>
				<span class="text-sm" :class="limitClass">
          {{ remainingRequests }} free shortens remaining
        </span>

				<div class="tooltip-container">
					<button class="info-icon ml-1" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
						</svg>
					</button>

					<div v-show="showTooltip" class="tooltip-content glass-tooltip">
						<p class="text-xs">Free accounts are limited to 30 shortened URLs per day.</p>
						<p class="text-xs mt-1">Need more? <a href="/pricing" class="text-blue-500 hover:underline">Upgrade your account</a>.</p>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useUrlStore } from '~/stores/url';

const urlStore = useUrlStore();
const loading = ref(true);
const showTooltip = ref(false);
const remainingRequests = computed(() => urlStore.remainingFreeRequests);

const limitClass = computed(() => {
	if (remainingRequests.value === null) return '';
	if (remainingRequests.value <= 5) return 'text-red-600 dark:text-red-400';
	if (remainingRequests.value <= 10) return 'text-yellow-600 dark:text-yellow-400';
	return 'text-slate-600 dark:text-slate-400';
});

onMounted(async () => {
	loading.value = true;
	try {
		await urlStore.fetchRemainingRequests();
	} catch (error) {
		console.error('Failed to fetch remaining requests:', error);
	} finally {
		loading.value = false;
	}
});
</script>

<style scoped>
.request-counter {
	position: relative;
}

.tooltip-container {
	position: relative;
	display: inline-block;
}

.info-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.2s;
}

.info-icon:hover {
	background-color: rgba(148, 163, 184, 0.1);
}

.tooltip-content {
	position: absolute;
	bottom: calc(100% + 10px);
	left: 50%;
	transform: translateX(-50%);
	width: max-content;
	max-width: 250px;
	padding: 8px 12px;
	z-index: 10;
}

.glass-tooltip {
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	color: #334155;
}

.dark .glass-tooltip {
	background: rgba(30, 41, 59, 0.9);
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
	color: #e2e8f0;
}

.tooltip-content::after {
	content: '';
	position: absolute;
	top: 100%;
	left: 50%;
	transform: translateX(-50%);
	border-width: 5px;
	border-style: solid;
	border-color: rgba(255, 255, 255, 0.9) transparent transparent transparent;
}

.dark .tooltip-content::after {
	border-color: rgba(30, 41, 59, 0.9) transparent transparent transparent;
}
</style>