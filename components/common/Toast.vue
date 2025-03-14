<template>
	<div
		v-if="isVisible"
		class="glass-card py-3 px-4 flex items-center shadow-lg transform transition-all duration-300 rounded-md border-l-4 relative overflow-hidden"
		:class="[
			isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
			type === 'success' ? 'bg-green-500/10 border-green-500 text-green-800 dark:text-green-200' :
				type === 'error' ? 'bg-red-500/10 border-red-500 text-red-800 dark:text-red-200' :
					type === 'info' ? 'bg-blue-500/10 border-blue-500 text-blue-800 dark:text-blue-200' :
						'bg-amber-500/10 border-amber-500 text-amber-800 dark:text-amber-200'
		]">
		<!-- Полоса индикатора времени -->
		<div class="absolute bottom-0 left-0 h-0.5"
			:class="[
				type === 'success' ? 'bg-green-500' :
					type === 'error' ? 'bg-red-500' :
						type === 'info' ? 'bg-blue-500' : 'bg-amber-500'
			]"
			:style="{ width: `${progressWidth}%`, transition: `width ${duration}ms linear` }">
		</div>

		<span class="mr-3 flex-shrink-0">
			<!-- Success Icon -->
			<svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
				viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>

			<!-- Error Icon -->
			<svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
				viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>

			<!-- Info Icon -->
			<svg v-else-if="type === 'info'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
				viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>

			<!-- Warning Icon -->
			<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
				stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
			</svg>
		</span>

		<span class="flex-grow text-sm font-medium">{{ message }}</span>

		<button @click="hide"
			class="ml-3 text-current opacity-70 hover:opacity-100 flex-shrink-0 transition-opacity rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/10">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
				stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
</template>

<script setup lang="ts">
type ToastType = 'success' | 'error' | 'info' | 'warning';

const props = defineProps<{
	message: string;
	type: ToastType;
	duration?: number;
}>();

const isVisible = ref(false);
const progressWidth = ref(100);
const duration = computed(() => props.duration || 3000);

let hideTimeout: ReturnType<typeof setTimeout> | null = null;

const show = () => {
	isVisible.value = true;
	progressWidth.value = 100;

	// Устанавливаем таймаут для прогресс-бара и скрытия
	nextTick(() => {
		// Сначала сбрасываем ширину прогресс-бара до 0
		// CSS transition будет анимировать это изменение
		progressWidth.value = 0;

		// Настраиваем таймер для скрытия, который запустится после завершения анимации
		if (hideTimeout) {
			clearTimeout(hideTimeout);
		}

		hideTimeout = setTimeout(() => {
			hide();
		}, duration.value);
	});
};

const hide = () => {
	isVisible.value = false;

	if (hideTimeout) {
		clearTimeout(hideTimeout);
		hideTimeout = null;
	}
};

onMounted(() => {
	show();
});

onBeforeUnmount(() => {
	if (hideTimeout) {
		clearTimeout(hideTimeout);
		hideTimeout = null;
	}
});
</script>

<style scoped>
.glass-card {
	background: var(--glass-bg, rgba(255, 255, 255, 0.9));
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	box-shadow: var(--glass-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
	width: 100%;
}

.dark .glass-card {
	background: var(--glass-bg-dark, rgba(15, 23, 42, 0.9));
	box-shadow: var(--glass-shadow-dark, 0 4px 6px rgba(0, 0, 0, 0.2));
}
</style>