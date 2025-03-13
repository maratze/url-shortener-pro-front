<template>
	<div class="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-300">
		<div :class="{ 'opacity-0': isLoading }">
			<NuxtLayout>
				<div
					class="from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-300">
					<main class="pt-[74px]">
						<NuxtPage />
					</main>
				</div>
			</NuxtLayout>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';

useHead({
	style: [{
		children: `
		html.not-ready body {
			opacity: 0;
      	}
      	body {
        	transition: opacity 0.2s ease;
      	}`
	}]
});

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

html {
	visibility: visible;
}

body {
	@apply bg-slate-50 dark:bg-slate-900;
	font-family: 'Inter', sans-serif;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.animate-spin-slow {
	animation: spin 1.5s linear infinite;
}
</style>