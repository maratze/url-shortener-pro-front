<template>
	<div class="container mx-auto px-4 py-20">
		<div class="max-w-4xl mx-auto">
			<h1 class="text-3xl font-bold mb-6 text-slate-800 dark:text-white">URL History</h1>
			<div class="glass-card p-8">
				<p class="text-slate-600 dark:text-slate-300">
					Your URL shortening history will appear here. This page is coming soon.
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'URL History - TinyLink',
	meta: [
		{ name: 'description', content: 'View your URL shortening history and statistics.' }
	]
})
</script>