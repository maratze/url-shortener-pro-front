<template>
	<div class="container mx-auto px-4 py-20">
		<div class="max-w-4xl mx-auto">
			<h1 class="text-3xl font-bold mb-6 text-slate-800 dark:text-white">About TinyLink</h1>
			<div class="glass-card p-8">
				<p class="text-slate-600 dark:text-slate-300 mb-4">
					TinyLink is a modern URL shortening service designed to make sharing links easier and more efficient.
				</p>
				<p class="text-slate-600 dark:text-slate-300">
					Our mission is to provide simple, reliable, and feature-rich URL shortening services that help users
					track, manage, and optimize their links.
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'About TinyLink - URL Shortener',
	meta: [
		{ name: 'description', content: 'Learn about TinyLink, our mission, and what makes our URL shortening service special.' }
	]
})
</script>