<template>
	<div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
		<h1 class="text-3xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-0">
			{{ title }}
		</h1>

		<slot name="button"></slot>
	</div>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		required: true,
	},
});
</script>