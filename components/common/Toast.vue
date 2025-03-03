<template>
	<Teleport to="body">
		<div
			v-if="isVisible"
			class="fixed bottom-4 right-4 z-50 glass-card py-3 px-4 flex items-center shadow-lg transform transition-all duration-300"
			:class="[
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        type === 'success' ? 'bg-green-500/20 text-green-800 dark:text-green-200' :
        type === 'error' ? 'bg-red-500/20 text-red-800 dark:text-red-200' :
        type === 'info' ? 'bg-blue-500/20 text-blue-800 dark:text-blue-200' :
        'bg-amber-500/20 text-amber-800 dark:text-amber-200'
      ]"
		>
      <span class="mr-2">
        <!-- Success Icon -->
        <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>

		  <!-- Error Icon -->
        <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>

		  <!-- Info Icon -->
        <svg v-else-if="type === 'info'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

		  <!-- Warning Icon -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </span>

			<span>{{ message }}</span>

			<button @click="hide" class="ml-4 text-current hover:text-slate-900 dark:hover:text-white">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
type ToastType = 'success' | 'error' | 'info' | 'warning';

const props = defineProps<{
	message: string;
	type: ToastType;
	duration?: number;
}>();

const isVisible = ref(false);
let timeout: NodeJS.Timeout | null = null;

const show = () => {
	isVisible.value = true;

	if (timeout) {
		clearTimeout(timeout);
	}

	timeout = setTimeout(() => {
		hide();
	}, props.duration || 3000);
};

const hide = () => {
	isVisible.value = false;

	if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}
};

onMounted(() => {
	show();
});

onBeforeUnmount(() => {
	if (timeout) {
		clearTimeout(timeout);
	}
});
</script>