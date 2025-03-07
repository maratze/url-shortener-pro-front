<template>
	<div class="container mx-auto px-4 py-20">
		<div class="max-w-4xl mx-auto">
			<h1 class="text-3xl font-bold mb-6 text-slate-800 dark:text-white">TinyLink System Status</h1>
			<div class="glass-card p-8">
				<p class="text-slate-600 dark:text-slate-300 mb-4">
					Check the current status of TinyLink services and view incident history.
				</p>
				<p class="text-slate-600 dark:text-slate-300">
					The status dashboard is under development. All systems are currently operational.
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'System Status - TinyLink',
	meta: [
		{ name: 'description', content: 'View the current status of TinyLink services and systems. Check for any ongoing incidents or maintenance.' }
	]
})
</script>