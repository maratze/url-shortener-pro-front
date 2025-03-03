<template>
	<div class="flex flex-col items-center">
		<p class="text-sm text-slate-600 dark:text-slate-400 mb-2">
			{{ remainingRequests }} free requests remaining
		</p>
		<div class="w-64 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
			<div
				class="h-full bg-primary-500"
				:style="{ width: `${counterPercentage}%` }"
			></div>
		</div>
		<p v-if="remainingRequests <= 5" class="mt-2 text-sm text-amber-600 dark:text-amber-400">
			Running low on free requests! <button class="text-primary-600 dark:text-primary-400 underline">Sign up</button> for 30 more.
		</p>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	remainingRequests: number
}>();

// Assuming initial free limit is 30
const MAX_FREE_REQUESTS = 30;

const counterPercentage = computed(() => {
	return (props.remainingRequests / MAX_FREE_REQUESTS) * 100;
});
</script>