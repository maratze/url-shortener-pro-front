<template>
	<div class="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
		<div class="glass-card max-w-md w-full text-center">
			<h1 class="text-4xl font-bold mb-2 text-red-600 dark:text-red-400">
				{{ error?.statusCode }}
			</h1>
			<p class="text-lg mb-6 text-slate-700 dark:text-slate-300">
				{{ error?.message || "Something went wrong" }}
			</p>
			<button @click="handleError" class="btn-primary">
				Back to Home
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	error: Object
});

const handleError = () => {
	clearError({ redirect: '/' });
};
</script>