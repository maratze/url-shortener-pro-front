<template>
	<div
		class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-300">

		<AppHeader />

		<main class="pt-24">
			<NuxtPage/>
		</main>

		<AppFooter />
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import AppHeader from "~/components/layout/AppHeader.vue";
import AppFooter from "~/components/layout/AppFooter.vue";

onMounted(() => {
	document.title = 'TinyLink - Shorten Your URLs';

	const metaDescription = document.querySelector('meta[name="description"]');
	if (metaDescription) {
		metaDescription.setAttribute('content', 'TinyLink - fast, simple and secure URL shortener service.');
	} else {
		const meta = document.createElement('meta');
		meta.name = 'description';
		meta.content = 'TinyLink - fast, simple and secure URL shortener service.';
		document.head.appendChild(meta);
	}

	const ogTitle = document.querySelector('meta[property="og:title"]');
	if (ogTitle) {
		ogTitle.setAttribute('content', 'TinyLink - Shorten Your URLs');
	} else {
		const meta = document.createElement('meta');
		meta.setAttribute('property', 'og:title');
		meta.content = 'TinyLink - Shorten Your URLs';
		document.head.appendChild(meta);
	}

	const ogDescription = document.querySelector('meta[property="og:description"]');
	if (ogDescription) {
		ogDescription.setAttribute('content', 'Create short, memorable links with TinyLink URL shortener.');
	} else {
		const meta = document.createElement('meta');
		meta.setAttribute('property', 'og:description');
		meta.content = 'Create short, memorable links with TinyLink URL shortener.';
		document.head.appendChild(meta);
	}
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
	font-family: 'Inter', sans-serif;
}

body {
	@apply bg-slate-50 dark:bg-slate-900;
	font-family: 'Inter', sans-serif;
}
</style>