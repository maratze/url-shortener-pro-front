<template>
	<button
		:class="[
      'flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-60 disabled:cursor-not-allowed',
      rounded ? 'rounded-full' : 'rounded-lg',
      sizeClasses,
      variantClasses,
    ]"
		:disabled="loading || disabled"
		:type="type"
		v-bind="$attrs"
	>
		<div v-if="loading" class="mr-2">
			<svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		</div>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
	variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	loading?: boolean;
	disabled?: boolean;
	rounded?: boolean;
	type?: 'button' | 'submit' | 'reset';
}>(), {
	variant: 'primary',
	size: 'md',
	loading: false,
	disabled: false,
	rounded: false,
	type: 'button'
});

const sizeClasses = computed(() => {
	switch (props.size) {
		case 'sm': return 'py-1 px-3 text-sm';
		case 'lg': return 'py-3 px-6 text-lg';
		default: return 'py-2 px-4 text-base';
	}
});

const variantClasses = computed(() => {
	switch (props.variant) {
		case 'primary': return 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white';
		case 'secondary': return 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 focus:ring-slate-500 text-slate-900 dark:text-white';
		case 'danger': return 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white';
		case 'success': return 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white';
		case 'warning': return 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-400 text-white';
		case 'info': return 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 text-white';
		case 'ghost': return 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-500 text-slate-700 dark:text-slate-300';
		default: return 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white';
	}
});
</script>