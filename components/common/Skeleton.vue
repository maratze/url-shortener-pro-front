<template>
	<div
		class="animate-pulse bg-slate-300 dark:bg-slate-700 rounded"
		:style="{ 
      width: width || '100%',
      height: height || '1rem'
    }"
	></div>
</template>

<script setup lang="ts">
defineProps({
	width: String,
	height: String
});
</script>