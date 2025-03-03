<template>
	<div class="w-full">
		<label v-if="label" :for="id" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
			{{ label }}
		</label>
		<div class="relative">
			<input
				:id="id"
				:type="type"
				:value="modelValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:required="required"
				:class="[
          'w-full px-4 py-2 rounded-lg border focus:ring-2 transition-colors',
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 
                 'border-slate-300 dark:border-slate-700 focus:border-primary-500 focus:ring-primary-500',
          'bg-white dark:bg-slate-800 text-slate-900 dark:text-white',
          disabled ? 'opacity-60 cursor-not-allowed' : ''
        ]"
				@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			/>
			<div v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
				{{ error }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: 'text'
	},
	error: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	},
	required: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['update:modelValue']);

// Generate unique ID for label-input connection
const id = ref(`input-${Math.random().toString(36).substr(2, 9)}`);
</script>